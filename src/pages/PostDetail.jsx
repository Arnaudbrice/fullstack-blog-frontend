import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import PostContext from "../contexts/PostContext";
import { toast } from "react-toastify";
import NotFound from "./NotFound";

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    posts,
    setPosts,
    toastMessage,
    setToastMessage,
    toastShown,
    setToastShown,
    isLoading,
    setIsLoading,
  } = useContext(PostContext);
  console.log(id);
  console.log("posts", posts);
  //+id , parseInt(id), Number(id)
  const post = posts.find((post) => post.id === Number(id));
  console.log("post", post);

  //Delete the post:
  const handleDelete = () => {
    console.log("handleDelete");
  };

  if (isLoading) {
    return (
      <div role="status" class="max-w-sm animate-pulse">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span class="sr-only">Loading...</span>
      </div>
    );
  }
  if (!post) {
    return <NotFound />;
  }
  if (toastMessage) {
    toast.success(toastMessage);
    setToastMessage("");
    setToastShown(true);
  }
  return (
    <div className="max-w-3xl mx-4 sm:mx-auto mt-16 bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-2xl font-semibold text-center px-6 pt-6">
        {post?.title}
      </h2>
      <figure className="mt-4">
        <img
          className="w-full aspect-square object-cover"
          src={post?.cover}
          alt="cover"
        />
      </figure>

      <p className="px-6 py-8 text-[#333] whitespace-pre-line">
        {post?.content}
      </p>

      <div className="px-6 pb-8 flex gap-4 justify-between">
        <button
          onClick={() => navigate(`/posts/${id}/edit`)}
          className="px-6 py-2 rounded-full border border-black uppercase text-sm hover:bg-black hover:text-white transition-colors"
          type="button"
        >
          Edit
        </button>

        <button
          className="px-6 py-2 rounded-full bg-black text-white uppercase text-sm hover:opacity-50"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
