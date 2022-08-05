import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

function Message({ msg, id, user_id, text_color, bubble }) {
  const handleDelete = async () => {
    await deleteDoc(doc(db, "users", user_id, "posts", id));
  };
  const messageclass =
    "px-4 py-2  font-medium rounded-lg inline-block rounded-br-none bg-" +
    bubble +
    " text-" +
    text_color;

  return (
    <div onClick={handleDelete} className="chat-message p-1">
      <div className="flex items-end justify-end ">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
          <div>
            <span className={messageclass}>{msg?.msg}</span>
          </div>
          <div>
            <img
              src={msg?.image}
              alt=""
              className="rounded-2xl max-h-[700px] object-cover mr-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
