import Layout from "./layouts/Layout";
import PostDetail from "./pages/PostDetail";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CreatePost from "./pages/CreatePost";
import { Route, Routes } from "react-router";

const App = () => {
  return (
    <div
      className="min-h-screen w-full grid grid-rows-[auto_1fr_auto]
        font-['Outfit']  "
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Home , BlogDetail and NotFound will use the Layout component  to display Header , the component(Home, BlogDetail, NotFound) will be rendered inside the main component, and the Footer will be displayed at the bottom */}
          <Route index element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts" element={<CreatePost />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
