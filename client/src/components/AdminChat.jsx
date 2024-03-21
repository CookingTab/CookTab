import { collection, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../libs/firebase";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
const AdminChat = () => {
  const [chatSnap, loading] = useCollection(query(collection(db, "chats")));
  const chats = chatSnap?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const { theme, currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const text = theme[currentTheme].text;
  const bgcolor = theme[currentTheme].bgcolor;
  const bgcomps = theme[currentTheme].bgcomps;
  const bgdetail = theme[currentTheme].bgdetail;
  return (
    <div className={`${bgcolor} w-full h-screen fixed`}>
      <div
        className={`${bgcomps} w-full max-w-2xl mx-auto flex flex-col gap-3 p-3`}
      >
        <h1 className={`${text} text-xl font-bold`}>Chats</h1>
        {loading ? (
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-slate-800"></div>
        ) : (
          <>
            {chats?.map((chat) => (
              <Link
                to={`/chat/${chat.id}`}
                key={chat.id}
                className={`p-2 rounded-sm border ${text}`}
              >
                {chat?.name}
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
