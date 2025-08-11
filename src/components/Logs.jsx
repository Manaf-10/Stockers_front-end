import React from "react";
import logs from "./logslist";
const Logs = ({users}) => {
  console.log(users)
  
  return (
    <>
    <div className="container">
      <p>{users.id}</p>
    </div>
    </>
  );
};

export default Logs;
