import React from "react";
import { IdeaProps } from "../types";
import { formatDate, generateRandomColor } from "../utils";

const Idea = ({
  getIdea,
  removeIdea,
  setIdeas,
  idea: { createdDate, title, description, tags },
  ideas,
  setTag,
}: IdeaProps) => {
  return (
    <div className="p-4 pb-0 rounded-md bg-white flex-1 min-w-[300px] idea flex flex-col justify-between">
      <h1 className="text-2xl font-bold text-blue-gray-800">{title}</h1>
      <p className="text-gray-600 my-3">{description}</p>
      <p className="self-end text-gray-600 my-2">{formatDate(createdDate)}</p>
      <div className="flex flex-row item-center border-t border-t-blue-gray-50 py-2">
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              color: generateRandomColor(),
            }}
            className="bg-gray-100 mx-1 uppercase text-xs font-bold py-1.5 px-2 rounded hover:cursor-pointer"
            onClick={() => setTag(tag)}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Idea;
