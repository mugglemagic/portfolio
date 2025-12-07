import { g as getPosts } from "../../../chunks/blog.js";
const prerender = true;
const siteUrl = "https://markbasford.com";
const GET = async () => {
  const posts = await getPosts();
  const staticPages = [
    { url: "/", priority: "1.0" },
    { url: "/about", priority: "0.8" },
    { url: "/blog", priority: "0.9" }
  ];
  const postUrls = posts.map((post) => ({
    url: `/blog/${post.slug}`,
    priority: "0.7",
    lastmod: post.date
  }));
  const allUrls = [...staticPages, ...postUrls];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(
    (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ""}
    <priority>${page.priority}</priority>
  </url>`
  ).join("\n")}
</urlset>`;
  return new Response(sitemap.trim(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=3600"
    }
  });
};
export {
  GET,
  prerender
};
