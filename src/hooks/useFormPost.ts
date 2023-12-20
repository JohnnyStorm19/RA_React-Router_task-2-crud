import { useEffect, useState } from "react";
import { useRenderPosts } from "./useRenderPosts";
import { IPost } from "../models";
import api from '../apis/posts';

export const useFormPost = (id: string) => {
    const [formData, setFormData] = useState({ content: "" });
    const [recievedIndex, setRecievedIndex] = useState<number | null>(null);
    const [setShouldRender] = useRenderPosts();

    const [isLoading, setIsLodaing] = useState(false);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      const fetchCard = async () => {
        try {
          setIsLodaing(true);
          const response = await api.get<{ post: IPost; index: number }>(
            `/posts/${id}`
          );
          setFormData({ content: response.data.post.content });
          setRecievedIndex(response.data.index);
        } catch (error) {
          console.error(error);
          setError(true);
        } finally {
          setIsLodaing(false);
        }
      };
      fetchCard();
    }, [id]);

    return [{formData, recievedIndex, setShouldRender, setFormData, isLoading, error}];
}