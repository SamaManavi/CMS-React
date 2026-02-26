import React from 'react';
import "./App.css";
import {RouterProvider} from "react-router";
import router from "./routes.jsx";
import {Toaster} from "react-hot-toast";
import useLocalstorage from "./hook/useLocalstorage.js";

function App() {

    return (
        <>
            <RouterProvider router={router}/>
            <Toaster
                position={"top-right"}
            />
        </>
    )
}

export default App
