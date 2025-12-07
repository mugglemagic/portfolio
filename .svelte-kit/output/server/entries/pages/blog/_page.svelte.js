import { _ as attr, a5 as escape_html, a3 as ensure_array_like, a8 as stringify } from "../../../chunks/index.js";
import { S as SEO } from "../../../chunks/SEO.js";
function BlogCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { title, date, description, slug, tags = [] } = $$props;
    function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
    }
    $$renderer2.push(`<article class="group"><a${attr("href", `/blog/${stringify(slug)}`)} class="block border border-border rounded-xl p-8 transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"><div class="mb-4 flex flex-wrap items-center gap-3"><time${attr("datetime", date)} class="label">${escape_html(formatDate(date))}</time> `);
    if (tags.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-border">|</span> <!--[-->`);
      const each_array = ensure_array_like(tags);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let tag = each_array[$$index];
        $$renderer2.push(`<span class="label">${escape_html(tag)}</span>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <h2 class="mb-4 text-2xl font-normal transition-opacity group-hover:opacity-70">${escape_html(title)}</h2> <p class="mb-6 text-muted-foreground">${escape_html(description)}</p> <span class="label inline-flex items-center gap-2 transition-transform group-hover:translate-x-1">Read article <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></span></a></article>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    SEO($$renderer2, {
      title: "Blog | Mark Basford",
      description: "Thoughts on accessibility, frontend development, and building inclusive web experiences."
    });
    $$renderer2.push(`<!----> <div class="mx-auto max-w-3xl px-6 py-16 md:py-24"><p class="label mb-4">Blog</p> <h1 class="mb-8">Writing</h1> <p class="mb-16 max-w-xl text-xl text-muted-foreground">Thoughts on accessibility, frontend development, and building inclusive web experiences.</p> `);
    if (data.posts.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-8"><!--[-->`);
      const each_array = ensure_array_like(data.posts);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let post = each_array[$$index];
        BlogCard($$renderer2, {
          title: post.title,
          date: post.date,
          description: post.description,
          slug: post.slug,
          tags: post.tags
        });
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<p class="text-muted-foreground">No blog posts yet. Check back soon!</p>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
