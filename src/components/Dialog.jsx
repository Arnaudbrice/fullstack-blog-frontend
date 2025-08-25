import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import PostContext from "../contexts/PostContext";
const Dialog = props => {
  const {
    posts,
    setPosts,
    setToastMessage,
    toastMessage,
    toastShown,
    setToastShown
  } = useContext(PostContext);

  console.log("id", props.id);

  const findPost = posts.find(post => post.id === Number(props.id));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`http://localhost:3000/posts/${props.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      // Check if the response is OK (204 is considered successful)
      if (!response.ok) {
        throw new Error(`Failed to delete post: ${response.statusText}`);
      }

      // Update posts in state
      const updatedPosts = posts.filter(p => p.id !== Number(props.id));
      console.log("updatedPosts", updatedPosts);
      setPosts(updatedPosts);

      setToastMessage(
        <div>
          <p>
            Post <strong>{findPost?.title}</strong> deleted successfully
          </p>
        </div>
      );
      setToastShown(false);

      // Navigate back to the previous page(-1 will also prevent the error page page to be displaying before the Home page is mounted)
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box text-center">
        <h3 className="font-bold text-lg">Warning!</h3>
        <p className="py-4 ">
          Do you really want to delete the post{" "}
          <strong>{findPost?.title}</strong>?
        </p>
        <div className="modal-action block my-4">
          <form method="dialog" className="flex justify-between gap-4">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-error btn-lg  font-bold shadow-md transition-colors duration-300 rounded-full"
              onClick={handleDelete}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Delete Post..." : "Delete Post"}
            </button>
            <button className="btn btn-neutral btn-lg  rounded-full">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Dialog;
