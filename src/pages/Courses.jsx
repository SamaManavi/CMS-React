import React, {useState} from 'react';
import Breadcrumbs from "../components/common/breadcrumbs.jsx";
import Table from "../components/common/Table/Table.jsx";
import useFetch from "../hook/useFetch.js";
import HeadRow from "../components/common/Table/components/HeadRow.jsx";
import TableBody from "../components/common/Table/components/TableBody/TableBody.jsx";
import TableRow from "../components/common/Table/components/TableBody/components/TableRow.jsx";
import Header from "../components/common/Table/components/Header/Header.jsx";
import HeaderInfo from "../components/common/Table/components/Header/components/HeaderInfo.jsx";
import CreatButton from "../components/common/Table/components/Header/components/CreatButton.jsx";
import Loading from "../components/common/Loading.jsx";
import {FaEdit, FaTrash} from "react-icons/fa";
import TableFooter from "../components/common/Table/components/TableFooter.jsx";
import Pagination from "../components/common/Pagination.jsx";
import Modal from "../components/common/modal/Modal.jsx";
import ModalHeader from "../components/common/modal/components/ModalHeader.jsx";
import ModalBody from "../components/common/modal/components/ModalBody.jsx";
import ModalFooter from "../components/common/modal/components/ModalFooter.jsx";
import {coursesFormConfig} from "../inputForms.js";
import toast from "react-hot-toast";
import {userSchema} from "../schemas/userSchema.js";
import {courseSchema} from "../schemas/courseSchema.js";
import {usePagination} from "../hook/usePagination.js";

function Courses() {

    const [openModal, setOPenModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        price: 0,
        category: "",
    });

    const {
        data: courses,
        error,
        loading: coursesLoading,
        postData,
        deleteData,
        updateData
    } = useFetch("http://localhost:3000/courses");

    const {data: tableRow, error: rowError, loading: rowLoading} = useFetch("http://localhost:3000/coursesHeadRow");
    const {page, setPage, endIndex, startIndex,pagesCount} = usePagination(courses.length, 7);
    const paginatedItems = [...courses].reverse().slice(startIndex, endIndex);

    const openEditModalHandler = (id) => {

        const course = courses.find((course) => course.id === id);
        setFormData({title: course.title || "", price: course.price || "", category: course.category || "",});
    }

    const openCreatModalHandler = () => {

        setFormData({title: "", price: "", category: "",})
    }

    const addCourses = async () => {

        const parsed = courseSchema.safeParse(formData);

        if (!parsed.success) {

            toast.error(parsed.error.issues[0].message);
            return
        }

        const response = await postData(parsed.data);

        if (response.ok) {

            toast.success("دوره با موفقیت ایجاد شد");
            setOPenModal(false);

        } else {
            toast.error("خطا در ایجاد دوره");
        }
    }

    const deleteCourse = async (id) => {

        const response = await deleteData(id);

        if (response.ok) {

            toast.success("دوره با موفقیت حذف شد");
            setOPenModal(false);

        } else {
            toast.error("خطا در حذف دوره");
        }
    }

    const updateCourse = async (id) => {

        const parsed = courseSchema.safeParse(formData);

        if (!parsed.success) {

            toast.error(parsed.error.issues[0].message);
            return
        }

        const response = await updateData(id, parsed.data);

        if (response.ok) {

            toast.success("دوره با موفقیت ویرایش شد");
            setOPenModal(false);

        } else {
            toast.error("خطا در ویرایش دوره");
        }
    }

    const submitHandler = async () => {

        try {
            switch (modalType) {

                case "create": {
                    await addCourses();
                    break;
                }
                case "edit": {
                    await updateCourse(selectedCourseId);
                    break;
                }
                case "delete": {

                    await deleteCourse(selectedCourseId);
                    break;
                }
            }

        } catch (error) {

            toast.error("عملیات ناموفق بود");
        }
    }

    const handleChange = (e) => {

        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: name === "price" ? +value : value,
        });
    };

    return (
        <>
            <section className="content">
                <Breadcrumbs title={"دوره ها"}/>
                <Table>
                    <Header>
                        <HeaderInfo length={courses.length} title={["دوره", "دوره ها"]}/>
                        <CreatButton title={["دوره", "دوره ها"]} openModal={setOPenModal} modalType={setModalType}
                                     openCreatModal={openCreatModalHandler}/>
                    </Header>
                    <HeadRow rows={tableRow}></HeadRow>
                    <TableBody>
                        {coursesLoading ? (
                            <Loading/>
                        ) : (
                            courses.length ? (
                                paginatedItems.map((course) => (
                                    <TableRow key={course.id}>
                                        <p className="product-title">{course.title}</p>
                                        <p className="product-price">{course.price.toLocaleString()}</p>
                                        <p className="product-shortName">{course.category}</p>
                                        <div className="product-manage">
                                            <button className="edit-btn" onClick={() => {
                                                setOPenModal(true)
                                                setModalType("edit")
                                                openEditModalHandler(course.id)
                                                setSelectedCourseId(course.id);
                                            }}>
                                                <FaEdit/>
                                            </button>
                                            <button className="remove-btn" onClick={() => {
                                                setOPenModal(true)
                                                setModalType("delete")
                                                setSelectedCourseId(course.id);
                                            }}>
                                                <FaTrash/>
                                            </button>
                                        </div>
                                    </TableRow>
                                ))
                            ) : (<div className="mt-3">دوره ایی یافت نشد !</div>)
                        )}
                    </TableBody>
                    <TableFooter>
                        <Pagination onPageChange={setPage} currentPage={page} pagesCount={pagesCount}/>
                    </TableFooter>
                </Table>
                <Modal openModal={openModal}>
                    <ModalHeader title={"دوره"} setOPenModal={setOPenModal} modalType={modalType}/>
                    <ModalBody title={"دوره"} modalType={modalType} formData={formData} onChange={handleChange}
                               formConfig={coursesFormConfig}/>
                    <ModalFooter openModal={setOPenModal} onSubmit={submitHandler} />
                </Modal>
            </section>
        </>
    );
}

export default Courses;