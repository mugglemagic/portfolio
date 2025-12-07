import { a8 as stringify, a5 as escape_html, _ as attr, a3 as ensure_array_like } from "../../../../chunks/index.js";
import { S as SEO } from "../../../../chunks/SEO.js";
import { f as formatDate } from "../../../../chunks/blog.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    SEO($$renderer2, {
      title: `${stringify(data.title)} | Mark Basford`,
      description: data.description,
      type: "article",
      publishedTime: data.date,
      tags: data.tags
    });
    $$renderer2.push(`<!----> <article class="mx-auto max-w-3xl px-6 py-16 md:py-24"><header class="mb-16"><a href="/blog" class="label mb-8 inline-flex min-h-[44px] items-center gap-2 transition-transform hover:opacity-60"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg> Back to blog</a> <h1 class="mb-6">${escape_html(data.title)}</h1> <div class="flex flex-wrap items-center gap-3"><time${attr("datetime", data.date)} class="label">${escape_html(formatDate(data.date))}</time> `);
    if (data.tags && data.tags.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-border">|</span> <!--[-->`);
      const each_array = ensure_array_like(data.tags);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let tag = each_array[$$index];
        $$renderer2.push(`<span class="label">${escape_html(tag)}</span>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></header> <div class="prose">`);
    if (data.content) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!---->`);
      data.content($$renderer2, {});
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></article>`);
  });
}
export {
  _page as default
};
