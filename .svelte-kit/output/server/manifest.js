export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","headshot.jpg","manifest.webmanifest","robots.txt"]),
	mimeTypes: {".svg":"image/svg+xml",".jpg":"image/jpeg",".webmanifest":"application/manifest+json",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.gJeQT9fj.js",app:"_app/immutable/entry/app.6Y1gGeRj.js",imports:["_app/immutable/entry/start.gJeQT9fj.js","_app/immutable/chunks/XUMD-9Mr.js","_app/immutable/chunks/BNPA_p_8.js","_app/immutable/entry/app.6Y1gGeRj.js","_app/immutable/chunks/DCf4JqPx.js","_app/immutable/chunks/BNPA_p_8.js","_app/immutable/chunks/B-iva8rw.js","_app/immutable/chunks/C8YSO-qe.js","_app/immutable/chunks/BqisEWkp.js","_app/immutable/chunks/B4GcWvgj.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/about","/blog","/blog/__data.json","/sitemap.xml","/blog/WP-001-three-layer-component-architecture","/blog/FR-0022-one-doc-site-to-rule-them-all","/blog/FR-0006-the-observability-iceberg","/blog/FR-0005-the-server-side-shield","/blog/FR-0004-the-compliance-trap","/blog/FR-0003-the-44px-illusion","/blog/FR-0002-why-react-aria-won","/blog/FR-0001-the-multizone-gambit","/blog/FR-0000-why-we-are-writing-this"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
