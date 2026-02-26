import React, {useEffect} from 'react';
import {FaMoon, FaSun} from "react-icons/fa";
import useLocalstorage from "../../hook/useLocalstorage.js";

function Theme() {

    const [theme, setTheme] = useLocalstorage("theme", "light");

    useEffect(() => {

        theme === "light" ? document.querySelector("html").classList.remove("dark") :
            document.querySelector("html").classList.add("dark");
    }, [])

    const toggleTheme = () => {

        const themeMood = theme === "light" ? "dark" : "light";
        setTheme(themeMood);
        document.querySelector("html").classList.toggle("dark");
    }

    return (
        <button onClick={toggleTheme} className="theme-button">

            {theme === "light" ? <FaMoon/> : <FaSun/>}
        </button>
    );
}

export default Theme;