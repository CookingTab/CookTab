import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Footer = () => {
    const { theme, currentTheme, setCurrentTheme } = useContext(ThemeContext);
    const text = theme[currentTheme].text;
    const bgcolor = theme[currentTheme].bgcolor;
    
    return (
        <footer className={`${bgcolor} w-full  text-sm text-slate-500 p-3 text-center`}>
            <p className={text}>CookTab Copyright 2024. All rights reserved</p>
        </footer>
    );
};

export default Footer;
