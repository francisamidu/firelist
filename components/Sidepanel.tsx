import React, { useEffect, useState } from "react";
import { formatDate, formatTime } from "../utils";
import useSwr from "swr";
import { getIpData } from "../utils/getIpData";
import { IpData } from "../types";

const Sidepanel = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timezone, setTimezone] = useState("");
  const { data, error } = useSwr<IpData>("api/ipdata", getIpData);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeAndDate();
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });

  const setTimeAndDate = () => {
    setTime(formatDate(new Date()));
    setDate(formatTime(new Date()));
  };

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    setTimeAndDate();
    console.log(data);
    console.log(error);
  }, []);

  return (
    <div className="px-3">
      <h1 className="my-2 font-bold text-blue-gray-800">Status</h1>
      <div className="mt-5 text-blue-gray-800">
        <h2 className="text-5xl text-center font-bold">{date}</h2>
        <h3 className="text-3xl text-center my-3">{time}</h3>
        <h4 className="text-1xl text-center mt-3">{timezone}</h4>
      </div>
    </div>
  );
};

export default Sidepanel;
