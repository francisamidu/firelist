import React, { useEffect, useState } from "react";
import { formatDate, formatTime, getIpData } from "../utils";

const Sidepanel = (context: any) => {
  const [date, setDate] = useState(formatDate(new Date()));
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });

  useEffect(() => {
    getIpData()
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="px-3">
      <h1 className="my-2 font-bold text-blue-gray-800">Status</h1>
      <div className="mt-5 text-blue-gray-800">
        <h2 className="text-5xl text-center font-bold">{date}</h2>
        <h2 className="text-3xl text-center mt-3">{formatTime(time)}</h2>
      </div>
    </div>
  );
};

export default Sidepanel;
