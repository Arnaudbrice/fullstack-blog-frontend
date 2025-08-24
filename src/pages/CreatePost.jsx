import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";

import { toast } from "react-toastify";
import PostContext from "../contexts/PostContext";

const CreatePost = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const baseUrl = "http://localhost:3000";
  const {
    posts,
    setPosts,
    setToastMessage,
    toastShown,
    setToastShown
  } = useContext(PostContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    cover: "",
    content: null
  });

  const handleChange = event => {
    const { name, type, value } = event.target;
    if (type === "file") {
      const file = event.target.files[0];

      if (file) {
        setPost(prev => ({
          ...prev,
          cover: file
        }));
      }
    } else {
      setPost(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCreate = async event => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (!post.title || !post.content || !post.cover) {
        toast.error("Please fill all fields");
        return;
      }

      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("cover", post.cover); // Assuming post.cover is a File object
      formData.append("content", post.content);
      const response = await fetch(`${baseUrl}/posts`, {
        method: "POST",
        /*  headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: post.title,
          cover: post.cover,
          content: post.content
        }) */
        /* When using FormData, we do not need to manually set the Content-Type header. The browser will automatically set it to multipart/form-data with the correct boundary. */
        body: formData // No need to stringify formData
      });
      const data = await response.json();
      console.log("created Post", data);

      setPosts([data, ...posts]);
      // to display the toast message after navigation to the home page

      setToastMessage(`Post ${data.title} created successfully`);
      setToastShown(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      // to display the toast message after navigation to the home page

      setToastMessage(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      action="/upload"
      enctype="multipart/form-data"
      onSubmit={handleCreate}
      className="max-w-sm sm:max-w-lg mx-auto mt-16 pt-4 w-full"
    >
      <h2 className="text-center text-xl text-white font-bold bg-black p-4">
        Create Post
      </h2>
      <fieldset className="fieldset bg-white shadow-xl rounded-b-box w-full p-4 h-full">
        <label htmlFor="title" className="label text-black text-lg ">
          Title
        </label>
        <input
          onChange={handleChange}
          value={post.title}
          name="title"
          type="text"
          className="input  w-full outline-black border-black"
          id="title"
          placeholder="title"
        />

        <label htmlFor="cover" className="label  text-black text-lg">
          Cover
        </label>
        {/* input type file don't needa value */}
        {/* we use a key props here to force the input to be re-rendered when the imageUrl changes (otherwise input file will use It old value) */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="file-input outline-black border-black w-full  "
          id="cover"
          name="cover"
          onChange={handleChange}
        />

        <label htmlFor="content" className="label text-lg text-black ">
          Content
        </label>
        <textarea
          onChange={handleChange}
          value={post.content}
          name="content"
          className="textarea outline-black border-black w-full"
          id="content"
          placeholder="Content"
          rows="8"
        ></textarea>

        <button
          type="submit"
          className="btn rounded-lg mt-8 btn-success w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Create Post..." : "Create Post"}
        </button>
      </fieldset>
    </form>
  );
};

export default CreatePost;
