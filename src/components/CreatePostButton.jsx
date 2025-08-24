import React from "react";
import { useFormStatus } from "react-dom";

const CreatePostButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn rounded-lg mt-8 btn-success w-full">
      {pending ? "Creating Post..." : "Create Post"}
    </button>
  );
};

export default CreatePostButton;
