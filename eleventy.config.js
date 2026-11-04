import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import MarkdownIt from "markdown-it";
import * as sass from "sass";

const { pairedShortcode: highlightCode } = syntaxHighlight;

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const pad = (n) => String(n).padStart(2, "0");

// Post dates have no timezone in their front matter, so they are read as UTC and
// always shown exactly as written.
const dateFilters = {
  date_to_xmlschema: (d) => `${new Date(d).toISOString().slice(0, 19)}+00:00`,
  date_to_string: (d) => {
    d = new Date(d);
    return `${pad(d.getUTCDate())} ${MONTHS[d.getUTCMonth()].slice(0, 3)} ${d.getUTCFullYear()}`;
  },
  date_to_long_string: (d) => {
    d = new Date(d);
    return `${pad(d.getUTCDate())} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  },
};

const XML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export default function (eleventyConfig) {
  for (const [name, fn] of Object.entries(dateFilters)) {
    eleventyConfig.addFilter(name, fn);
  }
  eleventyConfig.addFilter("xml_escape", (s) => String(s ?? "").replace(/[&<>"']/g, (c) => XML_ESCAPES[c]));

  // Match kramdown, which the posts were written for: raw HTML, smart quotes, indented
  // code blocks, plain dash and ellipsis conversion, and automatic heading ids.
  const markdown = new MarkdownIt({ html: true, typographer: true }).disable("replacements");
  // Runs before text_join so that backslash-escaped or entity-encoded dashes stay as written.
  markdown.core.ruler.before("text_join", "kramdown_compat", (state) => {
    const usedIds = new Map();
    state.tokens.forEach((token, i) => {
      if (token.type !== "inline") return;
      for (const child of token.children) {
        if (child.type === "text") {
          child.content = child.content.replace(/---/g, "—").replace(/--/g, "–").replace(/\.\.\./g, "…");
        }
      }
      if (state.tokens[i - 1]?.type === "heading_open") {
        const text = token.children.map((child) => child.content).join("");
        const base =
          text
            .replace(/^[^a-zA-Z]+/, "")
            .replace(/[^\p{L}\p{M}\p{N}\p{Pc} -]/gu, "")
            .replace(/ /g, "-")
            .toLowerCase() || "section";
        const count = usedIds.get(base) ?? 0;
        usedIds.set(base, count + 1);
        state.tokens[i - 1].attrSet("id", count ? `${base}-${count}` : base);
      }
    });
  });
  // The site's styles depend on these .highlight wrappers.
  const { escapeHtml } = markdown.utils;
  markdown.renderer.rules.code_block = (tokens, idx) =>
    `<div class="highlight"><pre class="highlight"><code>${escapeHtml(tokens[idx].content)}</code></pre></div>\n`;
  // The figure is added here, not in the highlight tag: Markdown would end an HTML block
  // that starts with <figure> at the first blank line in the code.
  markdown.renderer.rules.html_block = (tokens, idx) => {
    const html = tokens[idx].content;
    if (!html.startsWith('<pre class="highlight">')) return html;
    return html
      .replace('<pre class="highlight">', '<figure class="highlight"><pre>')
      .replace(/<\/code><\/pre>(\s*)$/, "</code></pre></figure>$1");
  };
  eleventyConfig.setLibrary("md", markdown);
  eleventyConfig.amendLibrary("md", (md) => md.enable("code"));

  // Keeps the posts' {% highlight lang %} tags working. The plugin's own tag trims
  // spaces from the first line, which would break the indentation of code blocks.
  eleventyConfig.addLiquidTag("highlight", (liquid) => ({
    parse(tagToken, remainTokens) {
      this.language = tagToken.args.trim();
      this.tokens = [];
      const stream = liquid.parser.parseStream(remainTokens);
      stream
        .on("token", (token) => {
          if (token.name === "endhighlight") stream.stop();
          else this.tokens.push(token);
        })
        .on("end", () => {
          throw new Error(`tag ${tagToken.getText()} not closed`);
        });
      stream.start();
    },
    render() {
      const code = this.tokens
        .map((token) => token.raw ?? token.getText())
        .join("")
        .replace(/\r\n/g, "\n")
        .replace(/^[\r\n]+|[\r\n]+$/g, "");
      return highlightCode(code, this.language, "", {
        trim: false,
        lineSeparator: "\n",
        preAttributes: { class: "highlight" },
        codeAttributes: { class: `language-${this.language}`, "data-lang": this.language },
      });
    },
  }));

  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile(inputContent, inputPath) {
      const result = sass.compileString(inputContent, { loadPaths: ["src/_scss"], style: "compressed" });
      this.addDependencies(inputPath, result.loadedUrls);
      return () => result.css;
    },
  });
  eleventyConfig.ignores.add("src/_scss/**");
  eleventyConfig.addWatchTarget("src/_scss/");

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/CNAME");
}

export const config = {
  dir: { input: "src", output: "_site", layouts: "_layouts" },
  markdownTemplateEngine: "liquid",
  htmlTemplateEngine: "liquid",
};
