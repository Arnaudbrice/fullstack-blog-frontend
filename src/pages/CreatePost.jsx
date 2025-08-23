import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import PostContext from "../contexts/postContext";
import { toast } from "react-toastify";

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

  const [post, setPost] = useState({
    title: "",
    cover: "",
    content: ""
  });

  const handleChange = event => {
    const { name, type } = event.target;
    // Handle file input differently from other inputs
    if (type === "file") {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = event => {
          setPost(prev => ({
            ...prev,
            cover: event.target.result // base64 string
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      // Handle all other inputs normally
      const { value } = event.target;
      setPost(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCreate = async event => {
    event.preventDefault();

    try {
      if (!post.title || !post.content || !post.cover) {
        toast.error("Please fill all fields");
        return;
      }
      const response = await fetch(`${baseUrl}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: post.title,
          cover: post.cover,
          content: post.content
        })
      });
      const data = await response.json();
      console.log("created Post", data);
      // to display the toast message after navigation to the home page

      setPosts([data, ...posts]);
      setToastMessage(`Post ${data.title} created successfully`);
      setToastShown(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      // to display the toast message after navigation to the home page

      setToastMessage(error.message || "An error occurred");
    }
  };

  return (
    <form
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
          onClick={handleCreate}
          type="button"
          className="btn rounded-lg mt-8 btn-success w-full"
        >
          Create Post
        </button>
      </fieldset>
    </form>
  );
};

export default CreatePost;
