import React from "react";
import { IdeaProps } from "../types";

const Idea = ({
  getIdea,
  removeIdea,
  setIdeas,
  idea: { title, description, tags },
  ideas,
}: IdeaProps) => {
  return (
    <div className="p-4 rounded-md bg-white">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-600 my-3">{description}</p>
    </div>
  );
};

export default Idea;
