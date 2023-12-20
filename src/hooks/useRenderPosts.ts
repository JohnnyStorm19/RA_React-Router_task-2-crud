import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../apis/posts";
import { AppContext } from "../services/Context/AppContext";
import { IContext, IPost } from "../models";
import { useNavigate } from "react-router-dom";

export const useRenderPosts = (): [Dispatch<SetStateAction<boolean>>] => {
  const [shouldRender, setShouldRender] = useState(false);
  const context = useContext<IContext>(AppContext as React.Context<IContext>);
  const navigate = useNavigate();
  const { setData } = context;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<IPost[] | []>("/posts");
        setData(response.data);
        navigate("/"); // переходим на главную страницу
      } catch (error) {
        console.error(error);
      } finally {
        setShouldRender(false);
      }
    };

    if (shouldRender) {
      fetchData();
    }
  }, [shouldRender, setData, navigate]);

  return [setShouldRender];
};
