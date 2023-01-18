import React from "react";
import { IdeaProps } from "../types";
import { generateRandomColors } from "../utils";

const Idea = ({
  getIdea,
  removeIdea,
  setIdeas,
  idea: { title, description, tags },
  ideas,
}: IdeaProps) => {
  return (
    <div className="p-4 rounded-md bg-white flex-1 min-w-[300px] idea">
      <h1 className="text-2xl font-bold text-blue-gray-800">{title}</h1>
      <p className="text-gray-600 my-3">{description}</p>
      <div className="flex flex-row item-center">
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              color: generateRandomColors(),
            }}
            className="bg-gray-100 mx-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Idea;
