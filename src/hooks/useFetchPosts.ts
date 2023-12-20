import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IPost } from "../models";
import api from "../apis/posts";

const useFetchPosts = (): [IPost[], Dispatch<SetStateAction<IPost[]>>] => {
    const [data, setData] = useState<IPost[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        const response = await api.get<IPost[]|[]>("/posts");
        setData(response.data);
      };
      fetchData();
    }, []);

    return [data, setData];
}

export default useFetchPosts;
