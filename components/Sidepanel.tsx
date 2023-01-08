import React, { useEffect, useState } from "react";
import { formatDate, formatTime } from "../utils";
import { useFetch } from "use-http";

import getConfig from "next/config";
const { IPDATA_API_KEY } = getConfig();

const Sidepanel = () => {
  const [date, setDate] = useState(formatDate(new Date()));
  const [time, setTime] = useState(new Date());
  const URL = `https://api.ipdata.co?api-key=${IPDATA_API_KEY}`;
  const { data, error } = useFetch(URL, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

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
