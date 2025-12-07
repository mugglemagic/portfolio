import { a4 as attr_class, a1 as clsx$1, a3 as ensure_array_like, _ as attr, a8 as stringify } from "./index.js";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function SocialLinks($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className } = $$props;
    const links = [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/mark-basford-78a43390/",
        icon: "linkedin"
      },
      {
        name: "GitHub",
        url: "https://github.com/mugglemagic",
        icon: "github"
      }
    ];
    $$renderer2.push(`<nav aria-label="Social links"${attr_class(clsx$1(cn("flex items-center gap-2", className)))}><!--[-->`);
    const each_array = ensure_array_like(links);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let link = each_array[$$index];
      $$renderer2.push(`<a${attr("href", link.url)} target="_blank" rel="noopener noreferrer" class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"${attr("aria-label", `${stringify(link.name)} (opens in new tab)`)}>`);
      if (link.icon === "linkedin") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (link.icon === "github") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></a>`);
    }
    $$renderer2.push(`<!--]--></nav>`);
  });
}
export {
  SocialLinks as S,
  cn as c
};
