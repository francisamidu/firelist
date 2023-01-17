import React from "react";
import { ContentProps } from "../types";
import { Todos, Ideas } from ".";

const Content = ({ name }: ContentProps) => {
  const renderComponent = () => {
    switch (name) {
      case "ideas": {
        return <Ideas id="" title="" description="" />;
      }
      default: {
        return <Todos />;
      }
    }
  };
  return <>{renderComponent()}</>;
};

export default Content;
