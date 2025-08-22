import Layout from "./layouts/Layout";
import PostDetail from "./pages/PostDetail";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CreatePost from "./pages/CreatePost";
import { Route, Routes } from "react-router";

const App = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-r from-blue-200 via-gray-200 to-yellow-100 w-full grid grid-rows-[auto_1fr_auto]
        font-['Outfit']  "
    >
      <Routes>
        <Route path="/" element={<Layout />}>
         
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts" element={<CreatePost />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
