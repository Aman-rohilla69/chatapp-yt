import React, { useEffect } from "react";
import Message from "./Message";
import useGetMessage from "../../Context/useGetMessage.js";
import Loading from "../../Components/Loading.jsx";
import { useRef } from "react";
import useGetSocketMessage from "../../Context/useGetSocketMessage.js";

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage(); // listening incomming messages at real time:-
  console.log(messages);

  const lastMegRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (lastMegRef.current) {
        lastMegRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMegRef}>
            <Message message={message} />
          </div>
        ))
      )}
      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">
            Type! Hii to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;

// function Messages() {
//   const { loading, messages } = useGetMessage();
//   const lastMegRef = useRef();

//   useEffect(() => {
//     lastMegRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div
//       className="flex-1 overflow-y-auto"
//       style={{ height: "calc(92vh - 8vh)" }}
//     >
//       {loading ? (
//         <Loading />
//       ) : (
//         messages.length > 0 &&
//         messages.map((message, index) => (
//           <div
//             key={message._id}
//             ref={index === messages.length - 1 ? lastMegRef : null}
//           >
//             <Message message={message} />
//           </div>
//         ))
//       )}

//       {!loading && messages.length === 0 && (
//         <div>
//           <p className="text-center mt-[20%]">
//             Type! Hii to start the conversation
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
