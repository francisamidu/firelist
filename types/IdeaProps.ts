import { Dispatch, SetStateAction } from "react";
import { Idea } from ".";

type IdeaProps = {
  idea: Idea;
  ideas: Idea[];
  getIdea: (id: string) => void;
  removeIdea: (id: string) => void;
  setIdeas: Dispatch<SetStateAction<Idea[]>>;
  setTag: Dispatch<SetStateAction<string>>;
};
export default IdeaProps;
