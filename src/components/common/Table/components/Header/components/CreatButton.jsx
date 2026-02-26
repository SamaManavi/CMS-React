import React from 'react';
import {FaPlus} from "react-icons/fa";

function CreatButton({title, openModal, modalType,openCreatModal}) {
    return (
        <button onClick={() => {
            openModal(true)
            modalType("create")
            openCreatModal()
        }} id="create-product" className="section-link">
            <span className="flex items-center gap-x-2">
                <span> ایجاد {title[0]} </span>
                <FaPlus/>
            </span>
        </button>
    );
}

export default CreatButton;