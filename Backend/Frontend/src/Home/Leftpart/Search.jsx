import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import UseGetAllUsers from "../../Context/UseGetAllUsers";
import useConversation from "../../Zustand/useConversation.js";
import toast from "react-hot-toast";
function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = UseGetAllUsers(); // get all users from this function
  const { setSelectedConversation } = useConversation(); // get selected (search) users from this function

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      // user.fullName.toLowerCase().includes(search.toLowerCase()), iss line ka matlab hai ki search input me jo bhi user ka naam type karenge, us naam ko lower case me convert karke allUsers ke fullName ke lower case version se compare karega. Agar match milta hai to us user ko conversation variable me store karega.
      user.fullName?.toLowerCase().includes(search.toLowerCase()),
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found!");
    }
  };

  return (
    <div className="h-[10vh]">
      <div className="px-6 py-4">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-3  ">
            <label className="border-[1px] border-gray-700 bg-slate-900 rounded-lg p-3 flex items-center gap-2 w-[80%]">
              <input
                type="text"
                placeholder="Search"
                className="outline-none bg-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <button>
              <FaSearch className="text-5xl p-2 hover:bg-gray-800 rounded-full duration-300" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
