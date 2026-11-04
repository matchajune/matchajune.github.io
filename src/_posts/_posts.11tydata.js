const pad = (n) => String(n).padStart(2, "0");

// Keeps the Jekyll URLs: /YYYY/MM/DD/slug/, with the date taken from front matter.
export default {
  tags: ["posts"],
  eleventyComputed: {
    permalink: ({ page }) => {
      const d = page.date;
      return `/${d.getUTCFullYear()}/${pad(d.getUTCMonth() + 1)}/${pad(d.getUTCDate())}/${page.fileSlug}/`;
    },
  },
};
