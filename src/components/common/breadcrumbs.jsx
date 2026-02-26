import React from 'react';
import {Link} from "react-router";

function Breadcrumbs({title}) {
    return (
        <div className="breadcrumbs">
            <Link to="./index.html" className="breadcrumb">{title}</Link>
        </div>
    );
}

export default Breadcrumbs;