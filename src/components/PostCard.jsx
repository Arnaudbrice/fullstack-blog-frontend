import React from "react";
import { useNavigate } from "react-router";

const PostCard = props => {
  const navigate = useNavigate();
  console.log(props);
  return (
    <div className=" rounded-lg shadow-lg  transition-transform duration-200 hover:scale-104 hover:drop-shadow-[0_0_10px_#362617] mb-4 h-full bg-white ">
      <h2 className="w-full text-xl font-bold truncate text-center p-4 ">
        {props.post.title}
      </h2>

      <div className="w-full">
        <img
          className=" w-full h-auto block  aspect-square object-cover"
          src={props.post.cover}
          alt="cover"
        />
      </div>

      <p className="p-4 ">
        {props.post.content.substring(0, 10)}
        {"..."}{" "}
        <button
          className="btn btn-info text-white"
          onClick={() => navigate(`/posts/${props.post.id}`)}
        >
          Read More
        </button>
      </p>
    </div>
  );
};

export default PostCard;
