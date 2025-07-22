import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { getRideReqest } from "../../services/operations/authAPI";
import { FaArrowRightLong } from "react-icons/fa6";
import { rides } from "../../services/api";
const { USER_RIDES } = rides;

const PessangerCompleteRide = () => {
  // const rides = useSelector((store) => store.rideRequest);
  const [allRides, setRides] = useState([]);
  // console.log("rides", rides);

  const { requestId } = useParams();
  console.log("req id", requestId);

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    // dispatch(getRideReqest(requestId, navigate));
    getRideData();
  }, []);

  const getRideData = async () => {
    try {
      const data = await fetch(USER_RIDES + requestId);
      const result = await data.json();
      console.log("result ", result.rideRequest);
      setRides(result?.rideRequest);
    } catch (error) {
      console.log("error while fetch ride request by id");
    }
  };

  return (
    <div className="w-full h-[100%] md:w-1/3 mx-auto text-white p-5 bg-black">
      <h1 className="text-xl">Your ride</h1>
      {allRides.length === 0 ? (
        <h1 className="text-lg mt-10 text-center opacity-80">No Ride Found</h1>
      ) : (
        allRides?.map((ride) => (
          <div className="flex flex-col gap-y-3 shadow-[5px_5px_0px_0px_rgba(57,57,57)] bg-[#171515] m-5 mb-10 p-5 rounded-md">
            <div className="flex justify-between items-center p-2 opacity-90 border-b border-[#393939ed] ">
              <p>{ride.source}</p>
              <FaArrowRightLong />
              <p>{ride.destination}</p>
            </div>

            <p className="text-center opacity-80">
              {ride?.travelTime?.toString().slice(0, 15)}
            </p>
          </div>
        ))
      )}

      <Navbar />
    </div>
  );
};

export default PessangerCompleteRide;
