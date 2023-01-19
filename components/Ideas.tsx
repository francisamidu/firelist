import { deleteDoc, doc } from "firebase/firestore";
import { Plus } from "lucide-react";
import React, {
  MutableRefObject,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Idea } from ".";
import { useIdeas } from "../contexts";
import { db } from "../utils";
import Dropdown from "./Dropdown";
import MakeIdea from "./MakeIdea";
import NoContentCta from "./NoContentCta";

const Ideas = () => {
  const { ideas } = useIdeas();
  const [ideaList, setIdeaList] = useState(ideas);
  const [open, setOpen] = useState(false);
  const [idea, setIdea] = useReducer(
    (ar: any, arr: any) => ({
      createdDate: new Date(),
      description: "",
      done: false,
      id: "",
      title: "",
      tags: [],
    }),
    {
      createdDate: new Date(),
      description: "",
      done: false,
      id: "",
      title: "",
      tags: [],
    },
    (arg) => ({ ...arg })
  );
  const [tag, setTag] = useState("");
  const [filterOption, setFilterOption] = useState("filter-all");

  //Refs
  const addBtnRef: MutableRefObject<any> = useRef();

  //Handlers
  const handleAddClick = () => setOpen(!open);
  const handleDropdownClick = (option: string) => {
    if (option.includes("filter")) {
      setFilterOption(option);
    }
    switch (option) {
      case "filter-completed": {
        let temp1 = ideas.filter((t) => t.done === true);
        setIdeaList(temp1);
        break;
      }
      case "filter-incomplete": {
        let temp2 = ideas.filter((t) => t.done !== true);
        setIdeaList(temp2);
        break;
      }
      case "sort-date-asc": {
        let temp3 = ideas.sort((a, b) => {
          return a.createdDate.getTime() > b.createdDate.getTime() ? 1 : -1;
        });
        setIdeaList(() => temp3);
        break;
      }
      case "sort-date-desc": {
        let temp4 = ideas.sort((a, b) => {
          return a.createdDate.getTime() < b.createdDate.getTime() ? 1 : -1;
        });
        setIdeaList(() => temp4);
        break;
      }
      default: {
        setIdeaList(ideas);
        break;
      }
    }
  };
  const handleIdeaClick = (id: string) => {
    const ideaIndex = ideas.findIndex((t) => t.id === id);
    if (ideas[ideaIndex]) {
      setIdea(ideas[ideaIndex]);
      addBtnRef?.current.click();
    }
  };
  const handleResetIdea = () => {
    setIdea({
      createdDate: new Date(),
      description: "",
      done: false,
      id: "",
      title: "",
    });
  };
  const handleRemoveIdea = async (id: string) => {
    try {
      await deleteDoc(doc(db, "ideas", id));
      const newIdeas = ideas.filter((t) => t.id !== id);
      setIdeaList(newIdeas);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSetTag = (tag?: string) => {
    if (!tag) {
      setTag("");
      return;
    }
    setTag(tag);
  };

  useEffect(() => {
    setIdeaList(ideas);
    return () => setIdeaList([]);
  }, ideas);
  return (
    <div className="px-3 max-h-[100vh] overflow-y-auto">
      <MakeIdea
        open={open}
        idea={idea}
        ideas={ideaList}
        resetIdea={handleResetIdea}
        setOpen={setOpen}
        setIdeas={setIdeaList}
      />
      <div className="flex flex-row items-center justify-between">
        <h1 className="my-2 font-bold text-blue-gray-800">Ideas</h1>
        <div className="flex flex-row items-center">
          {/* <Dropdown label="Sort" handler={handleDropdownClick} /> */}
          <Dropdown label="Filter" handler={handleDropdownClick} />
        </div>
      </div>
      <div
        className="mt-5 flex flex-row items-center hover:cursor-pointer py-2 px-3 w-max bg-white rounded-md"
        ref={addBtnRef}
        onClick={handleAddClick}
      >
        <Plus className="text-blue-gray-600 mr-2" size={18} />
        <span className="text-blue-gray-600">Add Idea</span>
      </div>
      <div>
        {ideas.length > 0 ? (
          <>
            {filterOption === "filter-incomplete" ||
            filterOption === "filter-all" ? (
              <div className="flex flex-row flex-wrap mt-4">
                {ideaList
                  .filter((t) => !t.done)
                  .map((idea) => (
                    <Idea
                      idea={idea}
                      key={idea.id}
                      ideas={ideaList}
                      getIdea={handleIdeaClick}
                      removeIdea={handleRemoveIdea}
                      setIdeas={setIdeaList}
                      setTag={setTag}
                    />
                  ))}
              </div>
            ) : null}
          </>
        ) : (
          <NoContentCta addItem={handleAddClick} />
        )}
      </div>
    </div>
  );
};

export default Ideas;
