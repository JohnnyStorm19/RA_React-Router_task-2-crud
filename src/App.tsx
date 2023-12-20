import { Route, Routes } from "react-router-dom";
import "./App.css";
import PostsList from "./components/PostsList/PostsList";
import NewPost from "./components/NewPost/NewPost";
import UpdatePost from "./components/RewritePost/UpdatePost";
import { AppContext } from "./services/Context/AppContext";
import useFetchPosts from "./hooks/useFetchPosts";
import Modal from "./components/Modal/Modal";
import Card from "./components/Card/Card";

function App() {
  const [data, setData] = useFetchPosts();

  return (
    <AppContext.Provider value={{ setData }}>
      <Routes>
        <Route path="/" element={<PostsList postsList={data} />} />
        <Route path="posts/new" element={<NewPost />} />
        <Route path="posts/:id/update" element={<UpdatePost />} />
        <Route path="posts/:id/delete" element={<Modal type="delete" />} />
        <Route path="posts/:id" element={<Card />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
