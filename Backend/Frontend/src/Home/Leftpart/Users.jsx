import React from "react";
import User from "./User";
import UseGetAllUsers from "../../Context/UseGetAllUsers";

function Users() {
  // eslint-disable-next-line no-unused-vars
  const [allUsers, loading] = UseGetAllUsers();
  console.log(allUsers);

  return (
    <div className="">
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div
        className=" py-2 flex-4 overflow-y-auto"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
        {allUsers.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;
