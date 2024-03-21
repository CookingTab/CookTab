import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db } from "../libs/firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { BsSend } from "react-icons/bs";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const DetailChat = () => {
  const params = useParams();
  const { theme, currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const text = theme[currentTheme].text;
  const bgcolor = theme[currentTheme].bgcolor;
  const bgcomps = theme[currentTheme].bgcomps;
  const bgdetail = theme[currentTheme].bgdetail;
  const id = params.id;

  const [chatSnap, loading] = useDocument(doc(db, "chats", id));
  const chat = chatSnap?.data();

  const [msg, setMsg] = useState("");
  const bottomOfChat = useRef();
  const qChat = query(
    collection(db, `chats/${id}/message`),
    orderBy("timestamp", "asc")
  );
  const [msgSnap, loading2] = useCollection(qChat);

  const message = msgSnap?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  useEffect(() => {
    const scrollToBottom = () => {
      bottomOfChat.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    const timeoutId = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(timeoutId);
  }, [msgSnap]);

  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `chats/${id}/message`), {
      sender: "admin",
      message: msg,
      timestamp: serverTimestamp(),
    });
    setMsg("");
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-slate-800"></div>
      </div>
    );
  }

  return (
    <div className={`${bgcolor} h-screen fixed w-screen`}>
      <div className="max-w-2xl mx-auto p-6 flex flex-col h-[90dvh]">
        <div
          className={`${bgcomps} w-full p-3 border-b flex gap-2 items-center`}
        >
          <Link to="/chat" className={`${text} p-2 rounded-sm border`}>
            Back
          </Link>
          <h1 className={`${text} text-lg font-bold`}>{chat?.name}</h1>
        </div>
        <div className="flex-1 w-full h-full overflow-y-auto">
          {loading2 ? (
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-slate-800"></div>
          ) : (
            <div className={`${bgcomps} w-full overflow-y-auto h-full`}>
              {message?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`w-full flex my-2 ${
                      item?.sender === "admin" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`w-[70%] p-2 rounded-sm ${
                        item?.sender === "admin"
                          ? "bg-blue-500 text-white"
                          : "bg-slate-200"
                      }`}
                    >
                      <p>{item?.message}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomOfChat}></div>
            </div>
          )}
        </div>
        <form
          onSubmit={sendMessage}
          className="p-3 border rounded-sm flex gap-2"
        >
          <input
            type="text"
            required
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="flex-1 p-2 border-b focus:outline-blue-500"
            placeholder="Enter message"
          />
          <button className="p-2 bg-blue-500 text-white rounded-sm">
            <BsSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DetailChat;
