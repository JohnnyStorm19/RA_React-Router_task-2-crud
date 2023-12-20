import { Link, useNavigate } from "react-router-dom";
import { IPost } from "../../models";
import classes from "./PostCard.module.css";
import { getDate } from "../../services/utils/getDate";

const PostCard = ({ post }: { post: IPost }) => {
  const navigate = useNavigate();
  const date = getDate(post.created);
  const deleteBtnClass = [classes.link, classes.link__delete].join(' ');

  const onCardClick = (e: React.SyntheticEvent) => {
    if((e.target as Element).closest('a') === null){
      navigate(`/posts/${post.id}`);
    }
  }

  return (
    <div className={classes.post__card} onClick={onCardClick}>
      <header>
        <span className={classes.date}>{`${date.day}.${date.month}.${date.year},${date.hour}:${date.minute}`}</span>
        <p className={classes.content}>{post.content}</p>
      </header>
      <div className={classes.links__wrapper}>
        <Link to={`/posts/${post.id}/update`} className={classes.link}>
          Update post
        </Link>
        <Link to={`/posts/${post.id}/delete`} className={deleteBtnClass}>
          Delete post
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
