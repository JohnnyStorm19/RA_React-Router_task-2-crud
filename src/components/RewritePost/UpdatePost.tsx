import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../apis/posts";
import classes from "./UpdatePost.module.css";

import { useFormPost } from "../../hooks/useFormPost";

const UpdatePost = () => {
  const { id } = useParams();
  const [
    { formData, recievedIndex, setShouldRender, setFormData, isLoading, error },
  ] = useFormPost(id as string);
  const [putLoading, setPutLoading] = useState(false);

  const onChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      content: e.currentTarget.value,
    });
  };

  const onFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      setPutLoading(true);
      const response = await api.put(`/posts/${id}`, formData);
      if (response.status === 204) {
        setShouldRender(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFormData({
        ...formData,
        content: "",
      });
      setPutLoading(false);
    }
  };

  return (
    <>
      {isLoading && <div>Loading card data...</div>}
      {error && <div>Error!!!</div>}
      {putLoading ? (
        <div>Saving changes...</div>
      ) : (
        <div className={classes.updatepost}>
          <header className={classes.updatepost__header}>
            <h3 className={classes.updatepost__title}>
              Update post #
              {(recievedIndex || recievedIndex === 0) && recievedIndex + 1}
            </h3>
            <Link to={"/"} className={classes.link__back}></Link>
          </header>
          <form onSubmit={onFormSubmit} className={classes.updatepost__form}>
            <textarea
              name="updatepost"
              id=""
              cols={30}
              rows={10}
              onChange={onChange}
              value={formData.content}
              required
            ></textarea>
            <button type="submit" className={classes.updatepost__submitBtn}>
              Save changes
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdatePost;
