import React from "react";
import { useNavigate } from "react-router";

const PostCard = (props) => {
  const navigate = useNavigate();
  return (
 <div className="rounded-lg shadow-lg mb-4 h-full overflow-hidden transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_#362617] bg-white">

      {/* Title 
       */}
      <div className="w-full p-4 text-center bg-gradient-to-r from-yellow-100 via-[#71565a] to-blue-200">
        <h2 className="text-xl font-bold truncate text-white">
          {props.post.title}
        </h2>
      </div>

      {/* Image */}
      <figure className="w-full">
        <img
          className="w-full aspect-square object-cover"
          src={props.post.cover}
          alt="cover"
        />
      </figure>

      {/* Content & Button */}
      <div className="p-4 text-center">
        <p className="mb-4 text-gray-700">
          {props.post.content?.substring(0, 50)}...
        </p>
        <button
          className="btn btn-info text-white"
          onClick={() => navigate(`/posts/${props.post.id}`)}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default PostCard;
