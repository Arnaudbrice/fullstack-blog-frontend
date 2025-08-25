import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const baseUrl = "http://localhost:3000";
  const [posts, setPosts] = useState([]);

  const [toastMessage, setToastMessage] = useState("");

  const [toastShown, setToastShown] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/posts`);

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        console.log(data);

        setPosts(data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    /*  const data=  fetchData();
    setPosts(data); */
  }, []);

  console.log("posts", posts);

  // this is to avoid that the toast message is shown multiple times on the home page
  useEffect(() => {
    if (toastMessage && !toastShown) {
      toast.success(toastMessage);
      setToastShown(true);

      // Reset toast message after showing
      setToastMessage("");
    }
  }, [toastMessage, toastShown]);

  return (
    <PostContext
      value={{
        posts,
        setPosts,
        toastMessage,
        setToastMessage,
        toastShown,
        setToastShown,
        isLoading,
        setIsLoading,
        isError,
        setIsError
      }}
    >
      {children}
    </PostContext>
  );
};

export default PostContext;
