import React from 'react';

function HeadRow({rows}) {
    return (
        <div className="table-head-row">
            {rows.map((row) => (

                <p key={row.id}>{row.title}</p>
            ))}
        </div>
    );
}

export default HeadRow;