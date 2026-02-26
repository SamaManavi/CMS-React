import React from 'react';
import {FaPlus} from "react-icons/fa";

function Header({children}) {
    return (
        <div className="section-header">
            {children}
        </div>
    );
}

export default Header;