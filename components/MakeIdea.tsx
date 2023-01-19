import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { Calendar } from "lucide-react";
import { Button } from ".";
import { useClickOutside } from "../hooks";
import { Idea } from "../types";
import { collection, db, doc, setDoc, updateDoc } from "../utils";

type MakeIdeaProps = {
  ideaId?: string;
  open: boolean;
  ideas: Idea[];
  resetIdea: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIdeas: Dispatch<SetStateAction<Idea[]>>;
};
const MakeIdea = ({
  open,
  setOpen,
  setIdeas,
  resetIdea,
  ideaId,
  ideas,
}: MakeIdeaProps) => {
  const dialogRef: MutableRefObject<any> = useRef();
  const [ideaItem, setIdeaItem] = useState<Idea>({
    createdDate: new Date(),
    description: "",
    id: Date.now().toString(),
    title: "",
    tags: [],
  });
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const ideasRef = collection(db, "ideas");
    if (ideaItem?.title) {
      await updateDoc(doc(db, "ideas", ideaItem.id), {
        ...ideaItem,
        description: ideaItem.description,
        title: ideaItem.title,
      });
    } else {
      if (ideaItem?.description || ideaItem?.title) {
        await setDoc(doc(ideasRef), ideaItem);
        const tempIdeas = [ideaItem, ...ideas];
        setIdeas(tempIdeas);
      }
    }
  };
  const resetIdeaItem = () => {
    setIdeaItem({
      createdDate: new Date(),
      description: "",
      id: "",
      title: "",
      tags: [],
    });
  };
  const handleClick = () => {
    setOpen(false);
    resetIdeaItem();
    resetIdea();
  };
  const handleOpen = () => {
    const notFilled = !ideaItem.title || !ideaItem.description;

    if (notFilled) {
      setError("Please fill all required fiels");
      setTimeout(() => {
        setError("");
      }, 5000);
    } else {
      handleSubmit();
      handleClick();
    }
  };
  useClickOutside(dialogRef, handleClick);

  useEffect(() => {
    const idea = ideas.find((i) => i.id === ideaId);
    if (idea) setIdeaItem({ ...idea });
  }, []);

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        ref={dialogRef}
        className="p-2 rounded-md"
      >
        <p className="text-center !w-full py-2 text-2xl font-bold">
          {!ideaId ? "Create a new idea" : `Editing idea #${ideaId}`}
        </p>
        <DialogBody>
          <Input
            className="text-blue-gray-700 mb-2.5 placeholder-show:!border-none !border-[1px] !border-blue-gray-50 focus:!border-blue-gray-50 focus:outline-none"
            onChange={(event) =>
              setIdeaItem({
                ...ideaItem,
                title: event.target.value,
              })
            }
            placeholder="Idea title here...."
            value={ideaItem.title}
          />
          <Textarea
            className="text-blue-gray-700 mt-2.5 !border-[1px] !border-blue-gray-50 focus:border-blue-gray-50 focus:outline-none placeholder-show:!border-none"
            onChange={(event) =>
              setIdeaItem({
                ...ideaItem,
                description: event.target.value,
              })
            }
            placeholder="Idea Description"
            value={ideaItem.description}
          />
          {error ? (
            <div className="my-2">
              <span className="text-burgundy-500">{error}</span>
            </div>
          ) : null}
        </DialogBody>
        <DialogFooter className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center py-2 px-3 rounded-xl border-[1px] border-blue-gray-50 hover:cursor-pointer">
            <Calendar className="text-blue-gray-300" size={16} />
            <span className="text-sm font-medium ml-2 text-blue-gray-300">
              Due Date
            </span>
          </div>
          <div className="flex flex-row items-center">
            <Button
              className="!bg-white !ring-0 hover:!shadow-none !border-[1px] !border-blue-gray-50 mr-2 !text-blue-gray-700 py-2.5 hover:!bg-blue-gray-700 hover:!text-white transition-all duration-300"
              onClick={handleClick}
              text="Cancel"
            />
            <Button
              className="py-2.5 hover:!shadow-none border-[1px] border-midnight-500 hover:!text-midnight-500 hover:!bg-white"
              onClick={handleOpen}
              text={
                ideaItem?.title || ideaItem?.description ? "Update" : "Create"
              }
            />
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default MakeIdea;
