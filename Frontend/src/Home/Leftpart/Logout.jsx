import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { BiLogOutCircle } from "react-icons/bi";
import toast from "react-hot-toast";

function Logout() {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("User logged out successfully!");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout :", error);
    toast.error("Error in logging Out!")
    }
  };

  return (
    <div className="h-[10vh] bg-slate-800">
      <div>
        <BiLogOutCircle
          className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-1"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

export default Logout;
