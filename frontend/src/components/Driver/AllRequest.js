import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Navbar from "../Common/Navbar";
import { rides } from "../../services/api";
import { useNavigate } from "react-router-dom";
const { GET_ALL_REQUESTS } = rides;

const AllRequest = () => {
  const [rideRequest, setRideRequest] = useState([]);
  const [totalReq, setToalReq] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const fetchAllRequests = async () => {
    const data = await fetch(GET_ALL_REQUESTS);
    const result = await data.json();

    console.log("All Ride Requests ", result);
    setRideRequest(result.rideRequests);
    setToalReq(result.totalRideRequests);
  };

  return (
    <div className="w-full h-[100%] md:w-1/3 mx-auto text-white p-5 bg-black">
      <h1 className="text-xl">Total Ride Requests ({totalReq})</h1>
      {totalReq === 0 ? (
        <h1 className="text-lg mt-10 text-center opacity-80">No Ride Found</h1>
      ) : (
        rideRequest?.map((ride) => (
          <div className="flex flex-col gap-y-3 shadow-[5px_5px_0px_0px_rgba(57,57,57)] bg-[#171515] m-5 mb-10 p-5 rounded-md">
            <div className="flex justify-between items-center p-2 opacity-90 border-b border-[#393939ed] ">
              <p>{ride.source}</p>
              <FaArrowRightLong />
              <p>{ride.destination}</p>
            </div>

            <p className="text-center opacity-80 text-sm">
              Journey date : {ride?.travelTime?.toString().slice(0, 15)}
            </p>
            <p className="text-center opacity-80 text-sm">
              Created Date : {ride?.createdAt?.toString().slice(0, 10)}
            </p>
            <div className="flex justify-end mr-3">
              <button onClick={() => navigate("/map-screen")} className=" bg-white bg-opacity-80 text-black w-1/3 rounded-md hover:bg-white">
                Accept
              </button>
            </div>
          </div>
        ))
      )}

      <Navbar />
    </div>
  );
};

export default AllRequest;
