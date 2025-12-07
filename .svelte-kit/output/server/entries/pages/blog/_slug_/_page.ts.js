import { a as getPost } from "../../../../chunks/blog.js";
import { error } from "@sveltejs/kit";
const load = async ({ params }) => {
  const post = await getPost(params.slug);
  if (!post) {
    throw error(404, "Post not found");
  }
  return {
    content: post.content,
    ...post.metadata
  };
};
export {
  load
};
