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
    setIsLoading,
  } = useContext(PostContext);

  console.log(id);
  console.log("posts from edit", posts);
  //+id , parseInt(id), Number(id)

  const [post, setPost] = useState({
    id: id,
    title: "",
    content: "",
  });

  /*  useEffect to update the post when the id changes
 if the page is reloaded, the id will be the same
  so we need to update the post to be able to display the correct title and content in the inputs fields */
  useEffect(() => {
    let findPost = posts.find((post) => post.id === Number(id));
    setPost({
      id: id,
      title: findPost?.title || "",
      content: findPost?.content || "",
    });
  }, [posts, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("value", value);
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEdit = async (event) => {
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: post.title,
          content: post.content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      // data here is an object with the updated post
      const data = await response.json();
      console.log(data);
      // find the post in the posts array and update the title and content
      posts.map((post) => {
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
    <div className="max-w-xl mx-auto mt-12 w-full px-4">
      <button
        className="mb-6 inline-flex items-center gap-2 px-4 py-2 border border-black rounded-full uppercase text-sm hover:bg-black hover:text-white transition-colors"
        onClick={() => navigate(`/posts/${id}`)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21v-2z" />
        </svg>
        Back to Detail Page
      </button>
      <form className="max-w-sm sm:max-w-lg mx-auto mt-16 pt-4 w-full">
        <h2 className="text-center text-xl font-bold text-black bg-[#F9FEAE] rounded-t-lg p-4">
          Edit Post
        </h2>
        <fieldset className="bg-white shadow-md rounded-b-lg w-full p-6 space-y-4">
          <label htmlFor="title" className="label text-black text-md ">
            Title
          </label>
          <input
            onChange={handleChange}
            value={post?.title}
            name="title"
            type="text"
            className="bg-white shadow-md rounded-b-lg w-full p-6 space-y-4"
            id="title"
            placeholder="title"
          />

          <label htmlFor="content" className="block text-black font-medium">
            Content
          </label>
          <textarea
            onChange={handleChange}
            value={post?.content}
            name="content"
            className="w-full border border-black/70 focus:border-black focus:outline-none p-3 rounded min-h-[180px] resize-y"
            id="content"
            placeholder="Content"
            rows="8"
          ></textarea>

          <button
            onClick={handleEdit}
            type="button"
            className="w-full mt-4 px-6 py-3 bg-black text-white rounded-md uppercase tracking-wide transition-opacity disabled:opacity-40 hover:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Update Post..." : "Update Post"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default EditPost;
