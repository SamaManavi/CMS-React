import React from 'react';
import clsx from "clsx";

function Pagination({currentPage, pagesCount, onPageChange}) {

    const visibility = 5;
    const half = Math.floor(visibility / 2);
    let startPage = currentPage - half;
    let endPage = currentPage + half;

    if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(visibility, pagesCount);
    }

    if (endPage > pagesCount) {
        endPage = pagesCount;
        startPage = Math.max((endPage - visibility) + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            {pages.map((page) => <span onClick={() => onPageChange(page)} key={page} tabIndex={page} className={clsx("page", {"active": currentPage === page})}>{page}</span>)}
        </div>
    );
}

export default Pagination;