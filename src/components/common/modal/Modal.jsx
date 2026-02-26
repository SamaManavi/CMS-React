import React from 'react';
import clsx from "clsx";

function Modal({children, openModal}) {
    return (
        <div className={clsx("modal-screen", openModal ? "" : "hidden")}>
            <div className="modal">
                {children}
            </div>
        </div>
    );
}

export default Modal;