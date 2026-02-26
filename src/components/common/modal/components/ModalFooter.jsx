import React from 'react';

function ModalFooter({openModal,onSubmit}) {
    return (
        <footer className="modal-footer">
            <button className="cancel" onClick={() => openModal(false)}>انصراف</button>
            <button className="submit" onClick={onSubmit}>تائید</button>
        </footer>);
}

export default ModalFooter;