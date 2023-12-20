import { useEffect, useState } from "react";
import { IPost } from "../models";
import { getDate } from "../services/utils/getDate";
import api from "../apis/posts";

interface IDate {
  year: number;
  month: number;
  day: number;
  hour: string | number;
  minute: string | number;
}

export const useFetchCardInfo = (id: string) => {
  const [cardData, setCardData] = useState<IPost | null>(null);
  const [date, setDate] = useState<IDate | null>(null);
  const [recievedIndex, setRecievedIndex] = useState<number | null>(null);

  const [isLoading, setIsLodaing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        setIsLodaing(true);
        const response = await api.get<{ post: IPost; index: number }>(
          `/posts/${id}`
        );
        setCardData(response.data.post);
        setRecievedIndex(response.data.index);

        const date = getDate(response.data.post.created);
        setDate(date);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLodaing(false);
      }
    };
    fetchCard();
  }, [id]);

  return [{ cardData, date, recievedIndex, isLoading, error }];
};
