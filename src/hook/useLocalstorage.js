import {useState} from "react";

const useLocalstorage = (key, defaultValue) => {

    const [state, setState] = useState(() => {

        try {

            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;

        } catch (error) {

            return defaultValue;
        }
    });

    const setValue = (value) => {

        setState(value);
        localStorage.setItem(key, JSON.stringify(value));
    }
    return [state, setValue];
}

export default useLocalstorage;