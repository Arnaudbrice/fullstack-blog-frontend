import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import PostContext from "../contexts/postContext";
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
    setIsLoading
  } = useContext(PostContext);
  console.log(id);
  console.log("posts", posts);
  //+id , parseInt(id), Number(id)
  const post = posts.find(post => post.id === Number(id));
  console.log("post", post);

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
    <div className="grid grid-cols-1  max-w-3xl  mt-16 py-4 border-2 border-black   rounded-lg mx-4 sm:mx-auto space-y-4 text-center ">
      <h2 className="w-full text-xl font-bold truncate text-center p-4">
        {post?.title}
      </h2>
      <figure className="w-full">
        <img
          className="w-full aspect-square object-cover"
          src={post?.cover}
          alt="cover"
        />
      </figure>

      <p className="text-black">{post?.content}</p>

      <div className="px-4 flex justify-between gap-4">
        <button
          onClick={() => navigate(`/posts/${id}/edit`)}
          className="btn btn-warning btn-lg rounded-full"
          type="button"
        >
          Edit
        </button>

        <button
          className="btn btn-lg rounded-full  btn-secondary"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
