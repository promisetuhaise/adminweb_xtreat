// utils/slugify.js
export function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')       // spaces → hyphens
      .replace(/[^\w\-]+/g, '')   // remove non‑word chars
      .replace(/\-\-+/g, '-');    // collapse multiple hyphens
  }
  