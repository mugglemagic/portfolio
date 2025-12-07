import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.B6H7cPzz.js","_app/immutable/chunks/B-iva8rw.js","_app/immutable/chunks/BNPA_p_8.js","_app/immutable/chunks/C8YSO-qe.js","_app/immutable/chunks/B4GcWvgj.js","_app/immutable/chunks/DmT9Q6NN.js","_app/immutable/chunks/D0ihxO46.js","_app/immutable/chunks/Dg5uvz-Z.js","_app/immutable/chunks/IVcZ5moH.js","_app/immutable/chunks/XUMD-9Mr.js","_app/immutable/chunks/Cw41v0MJ.js","_app/immutable/chunks/BqisEWkp.js"];
export const stylesheets = ["_app/immutable/assets/0.BF8zXpst.css"];
export const fonts = [];
