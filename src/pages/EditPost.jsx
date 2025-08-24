import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PostContext from "../contexts/PostContext";
import { toast } from "react-toastify";

import NotFound from "./NotFound";

const EditPost = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const baseUrl = "http://localhost:3000";
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
  console.log("posts from edit", posts);
  //+id , parseInt(id), Number(id)

  const [post, setPost] = useState({
    id: id,
    title: "",
    content: ""
  });

  /*  useEffect to update the post when the id changes
 if the page is reloaded, the id will be the same
  so we need to update the post to be able to display the correct title and content in the inputs fields */
  useEffect(() => {
    let findPost = posts.find(post => post.id === Number(id));
    setPost({
      id: id,
      title: findPost?.title || "",
      content: findPost?.content || ""
    });
  }, [posts, id]);

  const handleChange = e => {
    const { name, value } = e.target;
    console.log("value", value);
    setPost(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleEdit = async event => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      if (!post.title || !post.content) {
        toast.error("Please fill all fields");
        return;
      }
      const response = await fetch(`${baseUrl}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: post.title,
          content: post.content
        })
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      // data here is an object with the updated post
      const data = await response.json();
      console.log(data);
      // find the post in the posts array and update the title and content
      posts.map(post => {
        if (post.id === data.id) {
          post.title = data.title;
          post.content = data.content;
        }
      });
      // update the post
      setPost(data);

      setToastMessage(`Post ${data.title} updated successfully`);
      setToastShown(false);

      // Delay navigation to show the toast
      navigate(`/posts/${id}`);
    } catch (error) {
      console.log(error);

      // setToastMessage(error.message || "An error occurred");
      toast.error(error.message || "An error occurred");
      // setIsError(true);
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
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
  // if (!post.title || !post.content) {
  //   return <NotFound />;
  // }
  return (
  
    <div className="mt-16 flex justify-center">
      <div className="max-w-3xl w-full rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 bg-white">
        
        {/* Title with gradient */}
        <div className="w-full p-6 text-center bg-gradient-to-r from-yellow-100 via-[#71565a] to-blue-200">
          <h2 className="text-2xl font-bold text-white">Edit Post</h2>
        </div>

        {/* Form */}
        <form className="p-6 space-y-4">
          <label htmlFor="title" className="block text-gray-700 font-semibold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={post.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Title"
          />

          <label htmlFor="content" className="block text-gray-700 font-semibold">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            value={post.content}
            onChange={handleChange}
            rows="6"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Content"
          ></textarea>

          <button
            type="submit"
            onClick={handleEdit}
            disabled={isSubmitting}
            className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-full shadow-md transition-colors duration-300"
          >
            {isSubmitting ? "Updating..." : "Update Post"}
          </button>

          <button
            type="button"
            onClick={() => navigate(`/posts/${id}`)}
            className="w-full py-2 mt-2 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-full shadow-md transition-colors duration-300"
          >
            Back to Detail
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;