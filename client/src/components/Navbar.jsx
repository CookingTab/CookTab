import { signOut } from "firebase/auth";
import { FaBookmark, FaSignOutAlt, FaUser } from "react-icons/fa";
import { auth } from "../libs/firebase";
import { useSelector } from "react-redux";
import { FaMessage } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  localStorage.setItem("uid", user?.uid);

  const onLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("uid");
    localStorage.removeItem("chatId");
    navigate("/login");
  };
  const { theme, currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const bgcomps = theme[currentTheme].bgcomps;
  const bgdetail = theme[currentTheme].bgdetail;
  const text = theme[currentTheme].text;
  return (
    <div
      className={`${bgdetail} w-full py-3 px-6 sticky top-0 shadow-lg flex items-center sm:justify-around justify-between`}
    >
      <Link to={"/"}>
        <h1 className={`${text} font-bold text-xl text-slate-800`}>CookTab</h1>
      </Link>
      {/* {user !== null ? ( */}
      <div className="flex gap-3 items-center">
        <Link to={"/bookmarks"} className="p-2 rounded-sm border">
          <FaBookmark />
        </Link>
        <Link to={"/profile"} className="p-2 rounded-sm border">
          <FaUser />
        </Link>
        <Link to={"/chat"} className="p-2 rounded-sm border">
          <FaMessage />
        </Link>
        <button
          onClick={() => onLogout()}
          className="p-2 rounded-sm bg-slate-800 text-white"
        >
          <FaSignOutAlt />
        </button>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            defaultValue=""
            defaultChecked=""
            className="peer sr-only"
            onChange={() => {
              setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
            }}
          />
          <div className="peer flex h-8 items-center gap-4 rounded-full bg-orange-600 px-3 after:absolute after:left-1 after: after:h-6 after:w-12 after:rounded-full after:bg-white/40 after:transition-all after:content-[''] peer-checked:bg-stone-600 peer-checked:after:translate-x-full peer-focus:outline-none dark:border-slate-600 dark:bg-slate-700 text-sm text-white">
            <span>Light</span>
            <span>Dark</span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
