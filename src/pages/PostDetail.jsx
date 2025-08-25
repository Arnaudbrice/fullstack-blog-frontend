import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import PostContext from "../contexts/PostContext";
import { toast } from "react-toastify";
import NotFound from "./NotFound";
import Dialog from "../components/Dialog";

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    posts,
    setPosts,
    toastMessage,
    setToastMessage,

    setToastShown,
    isLoading
  } = useContext(PostContext);
  console.log(id);
  console.log("posts", posts);
  //+id , parseInt(id), Number(id)
  const post = posts.find(post => post.id === Number(id));
  console.log("post", post);

  //Delete the post:
  /*   const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const updatedPosts = posts.filter(p => p.id !== post.id);
      setPosts(updatedPosts);

      setToastMessage("Post deleted successfully");
      setToastShown(false);

      navigate("/"); // return to homepage (/)
    }
  };
 */
  if (isLoading) {
    return (
      <div role="status" class="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
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
  const handleBack = () => {
    navigate("/"); //return to homepage (/)
  };

  return (
    <div className="mt-16 flex justify-center">
      <div className="max-w-3xl w-full rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 bg-white">
        {/* Title with gradient */}
        <div className="w-full p-6 text-center bg-gradient-to-r from-yellow-100 via-[#71565a] to-blue-200">
          <h2 className="text-3xl font-bold text-white">{post.title}</h2>
        </div>

        {/* Image */}
        <figure className="w-full">
          <img
            src={post.cover}
            alt="cover"
            className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
          />
        </figure>

        {/* Content */}
        <div className="p-6 text-gray-700 text-lg leading-relaxed">
          {post.content}
        </div>

        {/* Buttons */}
        <div className="px-6 pb-6 flex justify-between gap-4">
          <button
            onClick={() => navigate(`/posts/${id}/edit`)}
            className="flex-1 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-full shadow-md transition-colors duration-300"
          >
            Edit
          </button>
          <button
            // onClick={handleDelete}
            onClick={() => document.getElementById("my_modal").showModal()}
            className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow-md transition-colors duration-300"
          >
            Delete
          </button>

          <Dialog id={id} />
        </div>

        {/* Back Button */}
        <div className="px-6 pb-6">
          <button
            onClick={handleBack}
            className="w-full py-2 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-md transition-transform duration-300"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
