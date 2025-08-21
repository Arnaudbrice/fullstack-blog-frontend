import React from "react";

const PostCard = props => {
  console.log(props);
  return (
    <div className="border border-red-300 rounded-lg shadow-md p-4 mb-4">
      <h2>{props.post.author}</h2>
      <p>{props.post.content}</p>
      <img src={props.post.cover} alt="cover" />
      <p>{props.post.date}</p>
    </div>
  );
};

export default PostCard;
