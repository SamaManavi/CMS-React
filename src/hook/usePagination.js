import {useEffect, useState} from "react";

export const usePagination = (totalItems, itemPerPage) => {

    const [page, setPage] = useState(1);
    const pagesCount = Math.ceil(totalItems / itemPerPage);
    useEffect(() => {
        if (page > pagesCount && pagesCount >= 1) setPage(pagesCount);
    }, [totalItems]);
    // const startIndex = (page - 1) * itemPerPage;
    // const endIndex = startIndex + itemPerPage;
    const endIndex = page * itemPerPage;
    const startIndex = endIndex - itemPerPage;
    return {page, setPage, endIndex, startIndex, pagesCount};

}