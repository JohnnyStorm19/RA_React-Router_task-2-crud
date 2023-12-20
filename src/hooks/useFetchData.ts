import { useEffect, useState } from "react"
import { IAxiosConfig } from "../models";
import { AxiosResponse } from 'axios';
import api from '../apis/posts'

const useFetchData = (configObj: IAxiosConfig) => {
  const [data, setData] = useState<AxiosResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    method,
    url,
    requestConfig = {}
  } = configObj;


  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async() => {
        setLoading(true);
        setError(false);
        try { 
            const response = await api[method](url, {
                ...requestConfig,
                signal: controller.signal
            });
            setData(response);

        } catch (error) {
            setError(true)
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    fetchData();

    return () => controller.abort();

  }, [method, requestConfig, url])

  return [data, loading, error];
}

export default useFetchData;