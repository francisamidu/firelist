import { deleteDoc, doc } from "firebase/firestore";
import { DeleteIcon, Plus } from "lucide-react";
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
        ideas={ideaList}
        resetIdea={handleResetIdea}
        setOpen={setOpen}
        setIdeas={setIdeaList}
      />
      <div className="flex flex-row items-center justify-between">
        <h1 className="my-2 font-bold text-blue-gray-800">Ideas</h1>
        {tag ? (
          <p className="bg-white text-blue-500 p-1 px-2 rounded flex flex-row items-center">
            <span className="text-sm">{tag}</span>
            <DeleteIcon
              className="text-blue-500 hover:cursor-pointer ml-2"
              size={15}
              onClick={() => handleSetTag()}
            />
          </p>
        ) : null}
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
          <div className="flex flex-row flex-wrap mt-4">
            {ideaList
              .filter((t) => {
                if (!tag) return t;
                return t.tags.indexOf(tag) !== -1;
              })
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
        ) : (
          <NoContentCta addItem={handleAddClick} />
        )}
      </div>
    </div>
  );
};

export default Ideas;
