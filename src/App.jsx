import Layout from "./layouts/Layout";
import PostDetail from "./pages/PostDetail";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CreatePost from "./pages/CreatePost";
import { Route, Routes } from "react-router";
import { PostContextProvider } from "./contexts/PostContext";
import EditPost from "./pages/EditPost";

const App = () => {
  return (
    <div className="min-h-screen bg-[#E8E8E8] font-['Outfit'] ">
      <PostContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/posts" element={<CreatePost />} />

            <Route path="/posts/:id/edit" element={<EditPost />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </PostContextProvider>
    </div>
  );
};

export default App;
