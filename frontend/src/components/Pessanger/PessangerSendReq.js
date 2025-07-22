import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { createRide } from "../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

const PessangerSendReq = () => {
  const [source, setSource] = useState();
  const [destination, setDestination] = useState();
  const [date, setDate] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { _id } = useSelector((store) => store.user.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("source", source);
    console.log("destination", destination);
    console.log("date", date);

    dispatch(createRide(source, destination, date, _id, navigate));
  };

  return (
    <div className="w-full h-[100%] md:w-1/3 mx-auto text-white p-5">
      <h1 className="text-xl opacity-50">Create Your Request Now!</h1>
      <form onSubmit={handleSubmit} className="mt-10">
        <div className="flex flex-col">
          <label>Source</label>
          <input
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="border border-[#FF8000] border-opacity-50 bg-[#171515] text-sm rounded-lg py-3 px-3 mt-1 md:py-2 outline-none"
            type="text"
            placeholder="From"
          />
        </div>
        <div className="flex flex-col">
          <label>Destination</label>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border border-[#FF8000] border-opacity-50 bg-[#171515] text-sm rounded-lg py-3 px-3 mt-1 md:py-2 outline-none"
            type="text"
            placeholder="To"
          />
        </div>
        <div className="flex flex-col">
          <label>Date</label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-[#FF8000] border-opacity-50 bg-[#171515] text-sm rounded-lg py-3 px-3 mt-1 md:py-2 outline-none"
            type="date"
          />
        </div>
        <button
          type="submit"
          className="bg-[#FF8000] text-white rounded-full text-[0.9rem] md:text-lg px-16 py-2 mt-10 md:mt-10 w-full md:py-1"
        >
          Create Request
        </button>
      </form>
      <Navbar />
    </div>
  );
};

export default PessangerSendReq;
