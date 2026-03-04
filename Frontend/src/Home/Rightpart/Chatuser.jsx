import React from "react";
import useConversation from "../../Zustand/useConversation.js";
import { useSocketContext } from "../../Context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";
function Chatuser() {
  const { selectedConversation } = useConversation();
  // eslint-disable-next-line no-unused-vars
  const { socket, onlineUsers } = useSocketContext();

  // const isOnline = onlineUsers.includes(user._id)
  // console.log(selectedConversation);

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>

      <div className="flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300 cursor-pointer ">
        <div className="avatar avatar-online">
          <div className="w-16 rounded-full">
            <img src="data:image/jpeg;base64,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" />
          </div>
        </div>
        <div className="">
          <h1 className="text-xl">{selectedConversation.fullName}</h1>
          {/* <h1 className="text-xl">Aman</h1> */}
          <span className="text-sm">
            {getOnlineUsersStatus(selectedConversation._id)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;
