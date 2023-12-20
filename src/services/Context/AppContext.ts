import { createContext } from "react";
import { IContext } from "../../models";

export const AppContext = createContext<IContext | null>(null);