---
layout: post
title: "Goodbye Jekyll, Hello Eleventy"
date: 2026-11-03 19:25:00
---

What started as a dependency update turned into replacing Jekyll altogether with [Eleventy](https://www.11ty.dev/). Jekyll has carried this blog since 2014, but it was time for something new that gets more frequent updates. It was my first time using AI to help with the migration and turned out to be super useful for the move, especially for a static website like this one.

#### Changelogs

  * Migrate from Jekyll -> Eleventy 3.x
  * Deploy with GitHub Actions instead of the built-in Pages build
  * Switch code highlighting from Rouge -> Prism
  * Give each post its own page title
  * Fix broken feed links
  * Fix Sass deprecation warnings; `@import` -> `@use`
  * Allow pinch zoom on phones
  * Remove double code boxes && always-on scrollbars

Cheers!
