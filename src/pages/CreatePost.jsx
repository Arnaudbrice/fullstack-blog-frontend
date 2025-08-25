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

  // State for previewing the selected image
  const [preview, setPreview] = useState(null);

  const handleChange = event => {
    const { name, type, value, files } = event.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        setPost(prev => ({
          ...prev,
          cover: file
        }));
        setPreview(URL.createObjectURL(file)); // <-- set image preview
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
        body: formData // No need to stringify FormData
      });

      const data = await response.json();
      console.log("created Post", data);

      setPosts([data, ...posts]);

      navigate("/"); // go back to homepage
      // to display the toast message after navigation to the home page
      setToastMessage(
        <div>
          Post <strong>{data.title}</strong> created successfully
        </div>
      );
      setToastShown(false);
    } catch (error) {
      console.log(error);
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
      <h2 className=" bg-gradient-to-r from-yellow-100 via-[#71565a] to-blue-200 rounded-t-2xl text-center text-xl text-white font-bold p-4">
        Create Post
      </h2>

      <fieldset className="fieldset bg-white backdrop-blur-md shadow-xl rounded-b-box w-full p-4 h-full">
        {/* Title input */}
        <label htmlFor="title" className="label text-black text-lg">
          Title
        </label>
        <input
          onChange={handleChange}
          value={post.title}
          name="title"
          type="text"
          className="w-full input  outline-black border-black"
          id="title"
          placeholder="title"
        />

        {/* Cover input */}
        <label htmlFor="cover" className="label text-black text-lg">
          Cover
        </label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="file-input w-full  outline-black border-black "
          id="cover"
          name="cover"
          onChange={handleChange}
        />

        {/* Image preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-64 object-cover rounded-md mt-2"
          />
        )}

        {/* Content input */}
        <label htmlFor="content" className="label text-lg text-black">
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
          type="submit"
          className="btn rounded-lg my-2 btn-success w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Create Post..." : "Create Post"}
        </button>
      </fieldset>
    </form>
  );
};

export default CreatePost;
