import React from "react";
import { ContentProps } from "../types";
import { Todos, Profile } from ".";

const Content = ({ name }: ContentProps) => {
  const renderComponent = () => {
    switch (name) {
      case "profile":
        return <Profile />;

      default:
        return <Todos />;
    }
  };
  return <>{renderComponent()}</>;
};

export default Content;
