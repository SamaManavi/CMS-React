import React from 'react';
import {LiaTimesSolid} from "react-icons/lia";

function ModalHeader({setOPenModal, modalType, title}) {
    return (
        <>
            <i className="ui-border top red"></i>
            <i className="ui-border bottom red"></i>
            <header className="modal-header">
                <h3>{modalType === "delete" ? `حذف ${title} ` : modalType === "edit" ? `ویرایش ${title}` : ` ایجاد ${title}`}
                </h3>
                <button className="close-modal" onClick={() => setOPenModal(false)}>
                    <LiaTimesSolid/>
                </button>
            </header>
        </>
    )
}

export default ModalHeader;