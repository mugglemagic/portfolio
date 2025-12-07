import "clsx";
import { S as SEO } from "../../../chunks/SEO.js";
import { S as SocialLinks } from "../../../chunks/SocialLinks.js";
function _page($$renderer) {
  SEO($$renderer, {
    title: "About | Mark Basford",
    description: "Learn about Mark Basford, a frontend architect specialising in accessibility-first development and inclusive design."
  });
  $$renderer.push(`<!----> <div class="mx-auto max-w-3xl px-6 py-16 md:py-24"><p class="label mb-4">About</p> <h1 class="mb-16">Building for Everyone</h1> <section class="mb-20"><blockquote class="border-l-2 border-foreground pl-8 text-xl font-light leading-relaxed italic md:text-2xl">"I believe the internet should be available to all. It's our responsibility as engineers
			to create journeys and experiences that are usable and enjoyable for everyone."</blockquote></section> <hr class="divider mb-20"/> <section class="mb-20"><p class="label mb-4">Background</p> <h2 class="mb-8">Professional Journey</h2> <div class="space-y-6 text-muted-foreground"><p>I'm a frontend architect with a deep passion for accessibility and inclusive design.
				With years of experience building web applications, I've developed a strong focus on
				creating digital experiences that work for everyone, regardless of their abilities
				or the devices they use.</p> <p>My journey in web development started with PHP and has evolved to encompass modern
				frontend frameworks like React, Vue, and SvelteKit. Throughout this evolution, one
				constant has remained: my commitment to building accessible, performant, and
				user-centred applications.</p></div></section> <hr class="divider mb-20"/> <section class="mb-20"><p class="label mb-4">Skills</p> <h2 class="mb-12">Technical Expertise</h2> <div class="grid gap-12 md:grid-cols-2"><div><h3 class="mb-4 text-lg">Frontend</h3> <ul class="space-y-2 text-muted-foreground"><li>React, Vue, SvelteKit</li> <li>TypeScript, JavaScript</li> <li>HTML5, CSS3, Tailwind CSS</li> <li>Design Systems &amp; Component Libraries</li></ul></div> <div><h3 class="mb-4 text-lg">Backend</h3> <ul class="space-y-2 text-muted-foreground"><li>PHP, Laravel</li> <li>Node.js</li> <li>RESTful APIs</li> <li>Database Design</li></ul></div> <div><h3 class="mb-4 text-lg">Accessibility</h3> <ul class="space-y-2 text-muted-foreground"><li>WCAG 2.2 (A, AA, AAA)</li> <li>Screen Reader Testing</li> <li>Semantic HTML &amp; ARIA</li> <li>Inclusive Design Patterns</li></ul></div> <div><h3 class="mb-4 text-lg">Tools &amp; Practices</h3> <ul class="space-y-2 text-muted-foreground"><li>Git, CI/CD</li> <li>Testing (Unit, Integration, E2E)</li> <li>Performance Optimisation</li> <li>Agile Methodologies</li></ul></div></div></section> <hr class="divider mb-20"/> <section class="mb-20"><p class="label mb-4">Philosophy</p> <h2 class="mb-8">My Approach</h2> <div class="space-y-6 text-muted-foreground"><p>I approach every project with the belief that accessibility isn't an afterthought—it's
				a fundamental requirement. When we build with accessibility in mind from the start,
				we create better experiences for everyone, not just those with disabilities.</p> <p>Good code is accessible code. It's semantic, it's performant, and it respects
				the user's preferences and needs. This philosophy guides every decision I make,
				from choosing the right HTML elements to designing complex interaction patterns.</p></div></section> <hr class="divider mb-20"/> <section><p class="label mb-4">Connect</p> <h2 class="mb-6">Get in Touch</h2> <p class="mb-8 text-muted-foreground">I'm always interested in discussing accessibility, frontend architecture, or potential
			collaborations. Find me on social media or reach out through LinkedIn.</p> `);
  SocialLinks($$renderer, {});
  $$renderer.push(`<!----></section></div>`);
}
export {
  _page as default
};
