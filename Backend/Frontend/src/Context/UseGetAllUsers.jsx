import React, { useEffect, useState } from "react";
import axios from "axios";
// import cookies from "js-cookie";
import Cookies from "js-cookie";
function UseGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get("/api/user/allUsers", {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in useGetAllUsers : " + error);
      }
    };
    getUsers();
  }, []);
  return [allUsers, loading];
}

export default UseGetAllUsers;
