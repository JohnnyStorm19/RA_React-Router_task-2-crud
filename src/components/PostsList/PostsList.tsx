import { IPost } from "../../models";
import Header from "../Header/Header";
import PostCard from "../PostCard/PostCard";
import classes from "./PostsList.module.css";

const PostsList = ({ postsList }: { postsList: [] | IPost[] }) => {
  return (
    <>
      <Header />
      <div className={classes.posts__list}>
        {postsList.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default PostsList;
