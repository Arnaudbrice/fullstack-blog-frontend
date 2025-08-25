import React, { useContext } from "react";
import PostContext from "../contexts/PostContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const Dialog = props => {
  const {
    posts,
    setPosts,
    setToastMessage,
    toastMessage,
    toastShown,
    setToastShown
  } = useContext(PostContext);
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${props.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("Response status:", response.status); // Debug
      console.log("Response:", response); // Debug
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      // find the post in the posts array and update the title and content
      const updatedPosts = posts.filter(p => p.id !== props.id);
      setPosts(updatedPosts);
      /*  setToastMessage("Post deleted successfully");
      setToastShown(false); */
      toast.success("Post deleted successfully");

      navigate("/"); // return to homepage (/)
      // update the post
      setPosts(updatedPosts);
    } catch (error) {
      // console.log(error);

      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Do you really want to delete the post?</p>
        <div className="modal-action">
          <form className="flex justify-between" method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn bg-red-500 hover:bg-red-600 text-white font-bold shadow-md transition-colors duration-300"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Dialog;
