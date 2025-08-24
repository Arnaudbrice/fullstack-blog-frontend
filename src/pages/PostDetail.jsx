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
    setToastShown
  } = useContext(PostContext);
  console.log(id);
  console.log("posts", posts);
  //+id , parseInt(id), Number(id)
  const post = posts.find(post => post.id === Number(id));
  console.log("post", post);

  //Delete the post:
  const handleDelete = () => {
    console.log("handleDelete");
  };

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
      <div className="w-full">
        <img
          className=" w-full h-auto block  aspect-square object-cover"
          src={post?.cover}
          alt="cover"
        />
      </div>

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
