import { Dispatch, SetStateAction } from "react";

export interface IPost {
    id: string;
    content: string;
    created: number;
  }

export interface IFormData {
    [key:string]: string
  }

export interface IAxiosConfig {
  method: TFetchMethod;
  url: string;
  requestConfig?: {
    [key: string]: string | IFormData | null;
  };
}

export type TFetchMethod =
  | "put"
  | "post"
  | "delete"
  | "get";

export interface IContext {
    setData: Dispatch<SetStateAction<IPost[]|[]>>
}
