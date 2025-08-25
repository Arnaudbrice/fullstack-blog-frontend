import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import PostContext from "../contexts/postContext";
import { toast } from "react-toastify";

const CreatePost = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const baseUrl = "http://localhost:3000";
  //
  const { posts, setPosts, setToastMessage, setToastShown } =
    useContext(PostContext);

  const [post, setPost] = useState({
    title: "",
    cover: "",
    content: "",
  });

  const handleChange = (event) => {
    const { name, type } = event.target;

    if (type === "file") {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPost((prev) => ({
            ...prev,
            cover: event.target.result, // base64 string
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      const { value } = event.target;
      setPost((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      if (!post.title || !post.content || !post.cover) {
        toast.error("Please fill all fields");
        return;
      }

      const response = await fetch(`${baseUrl}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: post.title,
          cover: post.cover,
          content: post.content,
        }),
      });
      const data = await response.json();

      setPosts([data, ...posts]);
      setToastMessage(`Post ${data.title} created successfully`);
      setToastShown(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setToastMessage(error.message || "An error occurred");
    }
  };

  return (
    <form
      onSubmit={handleCreate}
      className="max-w-sm sm:max-w-lg mx-auto mt-16 pt-4 w-full"
    >
      <h2 className="bg-gradient-to-r from-yellow-100 via-[#71565a] to-blue-200 rounded-t-2xl text-center text-xl text-white font-bold p-4">
        Create Post
      </h2>

      <fieldset className="fieldset bg-white/70 backdrop-blur-md shadow-xl rounded-b-box w-full p-4 h-full">
        {/* Title input */}
        <label htmlFor="title" className="label text-black text-lg">
          Title
        </label>
        <input
          onChange={handleChange}
          value={post.title}
          name="title"
          type="text"
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          id="title"
          placeholder="title"
        />

        {/* Cover input */}
        <label htmlFor="cover" className="label text-black text-lg mt-4">
          Cover
        </label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="file-input w-full"
          id="cover"
          name="cover"
          onChange={handleChange}
        />

        {/* Image preview */}
        {post.cover && (
          <img
            src={post.cover}
            alt="Preview"
            className="w-full max-h-64 object-cover rounded-md mt-2"
          />
        )}

        {/* Content input */}
        <label htmlFor="content" className="label text-lg text-black mt-4">
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

        {/* Submit button */}
        <button
          className="btn rounded-lg mt-8 btn-success w-full"
          type="submit"
        >
          Create Post
        </button>
      </fieldset>
    </form>
  );
};

export default CreatePost;

