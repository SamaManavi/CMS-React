import React from 'react';

function ModalBody({modalType, formData, formConfig, onChange, title}) {

    return (

        <main className="modal-content">

            {modalType === "create" || modalType === "edit" ? (
                <>
                    {formConfig.map((input) => (

                        <input
                            autoComplete="off"
                            key={input.name}
                            type={input.type}
                            placeholder={input.placeholder}
                            className="modal-input"
                            name={input.name}
                            value={formData[input.name] || ""}
                            onChange={onChange}/>
                    ))}

                </>
            ) : (
                <p className="remove-text">آیا از حذف این {title} اطمینان دارید؟</p>
            )}
        </main>
    );
}

export default ModalBody;