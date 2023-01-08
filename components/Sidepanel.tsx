import React, { useEffect, useState } from "react";
import { formatDate, formatTime } from "../utils";
import useSwr from "swr";
import { getIpData } from "../utils/getIpData";
import { IpData, IpDataResponse } from "../types";

const Sidepanel = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timezone, setTimezone] = useState("");
  const [isSet, setIsSet] = useState(false);
  const [userInfo, setUserInfo] = useState<IpData>({
    city: "",
    country: "",
  });
  const { data } = useSwr<IpDataResponse>("api/ipdata", getIpData, {
    errorRetryCount: 0,
  });

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
    if (data) {
      setUserInfo({
        city: data.city,
        country: data.country_name,
      });
    }
    setIsSet(Object.values(userInfo).every((val) => val != ""));
  }, [data]);

  return (
    <div className="px-3">
      <h1 className="my-2 font-bold text-blue-gray-800">Status</h1>
      <div className="mt-5 text-blue-gray-800">
        <h2 className="text-5xl text-center font-bold">{date}</h2>
        <h3 className="text-3xl text-center my-3">{time}</h3>
        <h4 className="text-1xl text-center my-3">{timezone}</h4>
        {isSet ? (
          <h5 className="text-1xl text-center my-3">
            {userInfo.city} - {userInfo.country}
          </h5>
        ) : null}
      </div>
    </div>
  );
};

export default Sidepanel;
