import * as server from '../entries/pages/blog/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.CodHL_rT.js","_app/immutable/chunks/B-iva8rw.js","_app/immutable/chunks/BNPA_p_8.js","_app/immutable/chunks/DmT9Q6NN.js","_app/immutable/chunks/QRiZD35W.js","_app/immutable/chunks/B4GcWvgj.js","_app/immutable/chunks/IVcZ5moH.js","_app/immutable/chunks/XUMD-9Mr.js","_app/immutable/chunks/C8YSO-qe.js"];
export const stylesheets = [];
export const fonts = [];
