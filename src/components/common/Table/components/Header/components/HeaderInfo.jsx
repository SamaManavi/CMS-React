import React from 'react';

function HeaderInfo({title,length}) {
    return (
        <div>
            <p className="title-text"> لیست{" "}{title[1]}</p>
            <p className="products-count-text caption-text">
                <span className="products-data">{length}</span>
                <span> {title[0]} در وبسایت شما وجود دارد </span>
            </p>
        </div>
    );
}

export default HeaderInfo;