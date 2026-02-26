import React from 'react';
import {FaChevronLeft, FaEdit, FaTrash} from "react-icons/fa";
import {Link} from "react-router";
import Loading from "../components/common/Loading.jsx";
import useFetch from "../hook/useFetch.js";
import HeadRow from "../components/common/Table/components/HeadRow.jsx";

function LatestCourses({courses, loading}) {
    const {data: tableRow, error: rowError, loading: rowLoading} = useFetch("http://localhost:3000/coursesHeadRow");

    return (
        <section className="table-component">
            <i className="ui-border emerald top"></i>
            <div className="section-header">
                <div>
                    <p className="title-text">لیست دوره ها</p>
                    <p className="products-count-text caption-text">
                        <span className="products-data">{courses.length}</span>
                        <span> دوره در وبسایت شما وجود دارد </span>
                    </p>
                </div>
                <Link to="/courses" className="section-link">
                <span className="flex items-center gap-x-2">
                  محصولات
                  <FaChevronLeft/>
                </span>
                </Link>
            </div>

            <HeadRow rows={tableRow}></HeadRow>


            <div className="table-body">
                {loading ? (
                    <div className="animationPreload">
                        <Loading/>
                    </div>
                ) : (courses.length ? (
                        courses.slice(-5).map(course => (
                            <div key={course.id} className="tableRow">
                                <p className="product-title">{course.title}</p>
                                <p className="product-price">{course.price.toLocaleString()}</p>
                                <p className="product-shortName">{course.category}</p>
                                <div className="product-manage">
                                    <button className="edit-btn">
                                        <FaEdit />
                                    </button>
                                    <button className="remove-btn">
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (<div className="mt-3">دوره ایی یافت نشد !</div>)

                )}


            </div>
        </section>
    );
}

export default LatestCourses;