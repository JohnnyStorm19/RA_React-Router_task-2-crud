import { useNavigate, useParams } from "react-router-dom";
import classes from "./Modal.module.css";
import api from "../../apis/posts";
import { useRenderPosts } from "../../hooks/useRenderPosts";

const Modal = ({ type }: { type: "delete" }) => {
  const navigate = useNavigate();
  const [setShouldRender] = useRenderPosts();
  const { id } = useParams();

  const modalTypes = {
    delete: {
      modalText: "do you want to delete that post?",
      onCancelClick: () => navigate(-1),
      onAgreeClick: async () => {
        try {
          const response = await api.delete(`/posts/${id}`); 
          if (response.status === 204) {
            setShouldRender(true);
          }
        } catch (error) {
          console.error(error);
        }
      },
    },
  };

  return (
    <div className={classes.modal}>
      <p className={classes.modal__content}>{modalTypes[type].modalText}</p>
      <div className={classes.btns__wrapper}>
        <button className={classes.btn} onClick={modalTypes[type].onCancelClick}>
          Cancel
        </button>
        <button className={classes.btn} onClick={modalTypes[type].onAgreeClick}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default Modal;
