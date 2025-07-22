import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const MapScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center text-white md:w-1/3 w-full md:mx-auto">
      <iframe
        className="relative h-screen"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117331.68800258408!2d72.56314524532495!3d23.220688229493547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2b987c6d6809%3A0xf86f06a7873e0391!2sGandhinagar%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1707043306344!5m2!1sen!2sin"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>

      <IoMdArrowBack
        onClick={() => navigate(-1)}
        className="absolute md:left-[28rem] left-[0rem] m-2 bg-[#171515] rounded-full text-2xl md:text-2xl cursor-pointer"
      />
      <div className="flex flex-col absolute bg-[#171515] rounded-lg w-full m-10 md:w-1/4">
        <input
          type="text"
          placeholder="source"
          className="border border-b-[#FF8000] border-t-[#171515] border-l-[#171515] border-r-[#171515] border-opacity-50 bg-[#171515] rounded-lg m-2 p-1 outline-none"
        />
        <input
          type="text"
          placeholder="destination"
          className="border border-b-[#FF8000] border-t-[#171515] border-l-[#171515] border-r-[#171515] border-opacity-50 bg-[#171515] rounded-lg m-2 p-1 outline-none"
        />
      </div>
    </div>
  );
};

export default MapScreen;
