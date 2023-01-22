import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  ReactNode,
} from "react";
import { v4 } from "uuid";
import { Idea } from "../types";
import { collection, db, getDocs } from "../utils";

const IdeasContext = createContext<{
  ideas: Idea[];
  setIdeas: Dispatch<SetStateAction<Idea[]>>;
}>({
  ideas: [],
  setIdeas: () => {},
});

export const IdeasProvider = ({
  children,
}: Partial<PropsWithChildren<ReactNode>>) => {
  const [ideasList, setIdeaList] = useState<Idea[]>([]);

  const getIdeas = async () => {
    try {
      const snapshot = await getDocs(collection(db, "ideas"));
      snapshot.forEach((doc) => {
        const idea: any = {
          id: doc.id,
          ...doc.data(),
          createdDate: new Date(doc.data()?.createdDate?.seconds * 1000),
        };
        setIdeaList([...ideasList, idea]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIdeas();
    return () => setIdeaList([]);
  }, [db]);

  return (
    <IdeasContext.Provider
      value={{
        setIdeas: setIdeaList,
        ideas: ideasList,
      }}
    >
      {children}
    </IdeasContext.Provider>
  );
};

export const useIdeas = () => useContext(IdeasContext);
