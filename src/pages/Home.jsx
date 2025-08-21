import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

const Home = () => {
  const baseUrl = "http://localhost:3000";
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/posts`);
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    /*  const data=  fetchData();
    setPosts(data); */
  }, []);

  console.log("posts", posts);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 mx-4  sm:mx-4 mt-16">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Home;
