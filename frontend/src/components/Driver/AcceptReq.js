import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";
// import { rides } from "../../../services/operations/api";
import { rides } from "../../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AcceptReq = () => {
  const [requests, setRequests] = useState([]);
  const driverId = localStorage.getItem("userId"); // Or from context/state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(rides.GET_ALL_REQUESTS);
        const pending = res.data.rideRequests.filter(req => req.status !== "accepted");
        setRequests(pending);
      } catch (err) {
        console.error("Failed to fetch requests", err);
      }
    };

    fetchRequests();
  }, []);

  const acceptRequest = async (requestId) => {
    try {
      const res = await axios.put(`${rides.ACCEPT_RIDE_REQUEST}/${requestId}`, {
        driverId,
      });
      alert("Request Accepted!");
      // Remove from list
      setRequests(prev => prev.filter(r => r._id !== requestId));
    } catch (err) {
      console.error("Failed to accept request", err);
    }
  };

  return (
    <div className="w-full min-h-screen md:w-1/2 mx-auto text-white p-5">
      <h2 className="text-xl mb-4">Available Requests</h2>
      {requests.length > 0 ? (
        requests.map(req => (
          <div key={req._id} className="bg-gray-900 p-4 mb-3 rounded">
            <p><strong>From:</strong> {req.source}</p>
            <p><strong>To:</strong> {req.destination}</p>
            <p><strong>Time:</strong> {req.travelTime}</p>
            <button onClick={() => navigate("/map-screen")} className=" bg-white bg-opacity-80 text-black w-1/3 rounded-md hover:bg-white">
                Accept
              </button>
          </div>
        ))
      ) : (
        <p>No pending requests found</p>
      )}
      <Navbar />
    </div>
  );
};

export default AcceptReq;
