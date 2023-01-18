import { Dispatch, SetStateAction } from "react";
import { Idea } from ".";

type IdeaProps = {
  idea: Idea;
  ideas: Idea[];
  setIdeas: Dispatch<SetStateAction<Idea[]>>;
  getIdea: (id: string) => void;
  removeIdea: (id: string) => void;
};
export default IdeaProps;
