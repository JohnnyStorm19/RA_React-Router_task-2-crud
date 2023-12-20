import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../apis/posts";
import classes from "./NewPost.module.css";
import { useRenderPosts } from "../../hooks/useRenderPosts";
import { IFormData } from "../../models";

const NewPost = () => {
  const [formData, setFormData] = useState<IFormData>({ content: "" });
  const [setShouldRender] = useRenderPosts();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const onChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      content: e.currentTarget.value,
    });
  };

  const onFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      setError(false);
      setIsLoading(true);

      const response = await api.post("/posts", formData);
      if (response.status === 204) {
        setShouldRender(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(true);
    }

    setFormData({
      ...formData,
      content: "",
    });
  };

  return (
    <>
      {error && <div>Having troubles</div>}
      {isLoading ? (
        <div>Posting new post</div>
      ) : (
        <div className={classes.newpost}>
          <header className={classes.newpost__header}>
            <Link to={"/"} className={classes.link__back}></Link>
            <h3 className={classes.newpost__title}>New post</h3>
          </header>
          <form onSubmit={onFormSubmit} className={classes.newpost__form}>
            <textarea
              name="newpost"
              id=""
              cols={30}
              rows={10}
              value={formData?.content}
              onChange={onChange}
              required
            ></textarea>
            <button type="submit" className={classes.newpost__submitBtn}>
              Submit post
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default NewPost;
