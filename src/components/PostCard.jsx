import React from "react";
import { useNavigate } from "react-router";

const PostCard = (props) => {
  const navigate = useNavigate();
  console.log(props);
  return (
    <div className=" bg-white rounded-lg overflow-hidden shadow-xl transition-transform duration-200 hover:scale-[1.10]">
      <figure className="w-full">
        <img
          className="w-full aspect-[4/3] object-cover"
          src={props.post.cover}
          alt="cover"
        />
      </figure>
      <div className="px-6 py-6 text-center">
        <h2 className="text-xl font-semibold ">{props.post.title}</h2>
        <p className="mt-3 text-[#333]">
          {props.post.content?.substring(0, 10)}
          {"..."}{" "}
          <button
            className="btn btn-info text-white"
            onClick={() => navigate(`/posts/${props.post.id}`)}
            className="mt-6 inline-block px-5 py-2 border border-black rounded-full uppercase tracking-wide text-sm hover:bg-black hover:text-white transition-colors"
          >
            Read More
          </button>
        </p>
      </div>
    </div>
  );
};

export default PostCard;
