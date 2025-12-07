import { g as getPosts } from "../../../chunks/blog.js";
const load = async () => {
  const posts = await getPosts();
  return { posts };
};
export {
  load
};
