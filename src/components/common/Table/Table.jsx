import React from 'react';
import {FaPlus} from "react-icons/fa";

function Table({children}) {
    return (
        <div className="table-component">
            <i className="ui-border emerald top"></i>
            {children}
        </div>
    );
}

export default Table;