import { a6 as store_get, $ as head, a7 as unsubscribe_stores, a5 as escape_html, _ as attr } from "./index.js";
import { p as page } from "./stores.js";
import { h as html } from "./html.js";
function SEO($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let {
      title = "Mark Basford | Frontend Architect & Accessibility Specialist",
      description = "Frontend architect specialising in accessibility-first development. Building inclusive web experiences with modern JavaScript frameworks.",
      image = "/headshot.jpg",
      type = "website",
      publishedTime,
      author = "Mark Basford",
      tags = []
    } = $$props;
    const siteUrl = "https://markbasford.com";
    const fullUrl = `${siteUrl}${store_get($$store_subs ??= {}, "$page", page).url.pathname}`;
    const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Mark Basford",
      url: siteUrl,
      jobTitle: "Frontend Architect",
      description: "Frontend architect specialising in accessibility-first development",
      sameAs: [
        "https://www.linkedin.com/in/mark-basford-78a43390/",
        "https://github.com/mugglemagic"
      ],
      knowsAbout: [
        "Web Accessibility",
        "Frontend Development",
        "React",
        "Vue",
        "SvelteKit",
        "TypeScript",
        "PHP",
        "Laravel"
      ]
    };
    const articleSchema = type === "article" && publishedTime ? {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description,
      datePublished: publishedTime,
      author: { "@type": "Person", name: author, url: siteUrl },
      publisher: { "@type": "Person", name: author }
    } : null;
    head("ojxrft", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(title)}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", description)}/> <link rel="canonical"${attr("href", fullUrl)}/> <meta property="og:type"${attr("content", type)}/> <meta property="og:url"${attr("content", fullUrl)}/> <meta property="og:title"${attr("content", title)}/> <meta property="og:description"${attr("content", description)}/> <meta property="og:image"${attr("content", fullImageUrl)}/> <meta property="og:image:width" content="1200"/> <meta property="og:image:height" content="630"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"${attr("content", title)}/> <meta name="twitter:description"${attr("content", description)}/> <meta name="twitter:image"${attr("content", fullImageUrl)}/> `);
      if (type === "article") {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<meta name="author"${attr("content", author)}/> `);
        if (publishedTime) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<meta property="article:published_time"${attr("content", publishedTime)}/>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> <meta property="article:author"${attr("content", author)}/> `);
        if (tags.length > 0) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<meta property="article:tag"${attr("content", tags.join(", "))}/>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> ${html(`<script type="application/ld+json">${JSON.stringify(personSchema)}<\/script>`)} `);
      if (articleSchema) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`${html(`<script type="application/ld+json">${JSON.stringify(articleSchema)}<\/script>`)}`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]-->`);
    });
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  SEO as S
};
