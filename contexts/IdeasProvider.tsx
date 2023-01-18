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
  const [ideasList, setIdeaList] = useState<Idea[]>([
    {
      createdDate: new Date(),
      description: "It just needs to adapt to the UI",
      id: v4(),
      title: "UX adjustments",
      tags: ["UX"],
    },
    {
      createdDate: new Date(),
      description: "Add a field to let users link their slack accounts",
      id: v4(),
      title: "Slack Integrations",
      tags: ["Slack", "Development"],
    },
    {
      createdDate: new Date(),
      description:
        "Help businesses to clearly define their annual e-commerce digital strategy for creating a high-end plan",
      id: v4(),
      title: "Presentation",
      tags: ["Planning"],
    },
    {
      createdDate: new Date(),
      description:
        "Composing word to provide people with decision-making clarity when interacting with a product",
      id: v4(),
      title: "Copywriting of the app",
      tags: ["Writing"],
    },
  ]);

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
  }, []);

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
