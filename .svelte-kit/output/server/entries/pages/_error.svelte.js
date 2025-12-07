import { a5 as escape_html, a6 as store_get, a7 as unsubscribe_stores } from "../../chunks/index.js";
import { p as page } from "../../chunks/stores.js";
function _error($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    $$renderer2.push(`<div class="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center"><p class="label mb-4">Error</p> <h1 class="mb-6">${escape_html(store_get($$store_subs ??= {}, "$page", page).status)}</h1> <p class="mb-12 max-w-md text-xl text-muted-foreground">`);
    if (store_get($$store_subs ??= {}, "$page", page).status === 404) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`The page you're looking for doesn't exist.`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`Something went wrong. Please try again later.`);
    }
    $$renderer2.push(`<!--]--></p> <a href="/" class="label inline-flex min-h-[44px] items-center gap-2 border border-border px-6 py-3 transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg> Return home</a></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _error as default
};
