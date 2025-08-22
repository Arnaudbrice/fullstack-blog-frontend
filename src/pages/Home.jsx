import React, { useContext } from "react";
import PostCard from "../components/PostCard";
import PostContext from "../contexts/postContext";
import { toast } from "react-toastify";

const Home = () => {
  const {
    posts,
    setPosts,
    toastMessage,
    setToastMessage,
    toastShown,
    setToastShown
  } = useContext(PostContext);

  if (toastMessage) {
    toast.success(toastMessage);
    setToastMessage("");
    setToastShown(true);
  }
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 mx-4  sm:mx-4 mt-16  ">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Home;
