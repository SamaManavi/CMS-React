import React, {useState} from 'react';
import Breadcrumbs from "../components/common/breadcrumbs.jsx";
import Table from "../components/common/Table/Table.jsx";
import Header from "../components/common/Table/components/Header/Header.jsx";
import HeaderInfo from "../components/common/Table/components/Header/components/HeaderInfo.jsx";
import CreatButton from "../components/common/Table/components/Header/components/CreatButton.jsx";
import HeadRow from "../components/common/Table/components/HeadRow.jsx";
import TableBody from "../components/common/Table/components/TableBody/TableBody.jsx";
import Loading from "../components/common/Loading.jsx";
import TableRow from "../components/common/Table/components/TableBody/components/TableRow.jsx";
import {FaEdit, FaTrash} from "react-icons/fa";
import TableFooter from "../components/common/Table/components/TableFooter.jsx";
import Pagination from "../components/common/Pagination.jsx";
import useFetch from "../hook/useFetch.js";
import {IoIosRemoveCircle} from "react-icons/io";
import Modal from "../components/common/modal/Modal.jsx";
import ModalHeader from "../components/common/modal/components/ModalHeader.jsx";
import ModalBody from "../components/common/modal/components/ModalBody.jsx";
import ModalFooter from "../components/common/modal/components/ModalFooter.jsx";
import {coursesFormConfig, usersFormConfig} from "../inputForms.js";
import toast from "react-hot-toast";
import {userSchema} from "../schemas/userSchema.js";
import {usePagination} from "../hook/usePagination.js";

function Users() {

    const [openModal, setOPenModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        city: "",
    });
    const [selectedUserId, setSelectedUserId] = useState(null);

    const {data: tableRow, error: rowError, loading: rowLoading} = useFetch("http://localhost:3000/usersHeadRow");
    const {
        data: users,
        error,
        loading: usersLoading,
        postData,
        deleteData,
        updateData
    } = useFetch("http://localhost:3000/users");

    const {page, setPage, endIndex, startIndex,pagesCount} = usePagination(users.length, 7);
    const paginatedItems = [...users].reverse().slice(startIndex, endIndex);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => (
            {
                ...prev,
                [name]: value
            }
        ));
    }

    const openEditModalHandler = (id) => {

        const user = users.find((user) => user.id === id);

        setFormData({
            name: user.name || "",
            username: user.username || "",
            email: user.email || "",
            city: user.city || ""
        });
    }

    const openCreatModalHandler = () => {

        setFormData({name: "", username: "", email: "", city: "",})
    }

    const addUser = async () => {

        const parsed = userSchema.safeParse(formData);

        if (!parsed.success) {

            toast.error(parsed.error.issues[0].message);
            return
        }

        const response = await postData(parsed.data);

        if (response.ok) {

            toast.success("کاربر با موفقیت ایجاد شد");
            setOPenModal(false);

        } else {
            toast.error("خطا در ایجاد کاربر");
        }
    }

    const deleteUser = async (id) => {

        const response = await deleteData(id);
        if (response.ok) {

            toast.success("کاربر با موفقیت حذف شد");
            setOPenModal(false);

        } else {
            toast.error("خطا در حذف کاربر");
        }
    }

    const updateUser = async (id) => {

        const parsed = userSchema.safeParse(formData);

        if (!parsed.success) {

            toast.error(parsed.error.issues[0].message);
            return
        }
        const response = await updateData(id, parsed.data);

        if (response.ok) {

            toast.success("کاربر با موفقیت ویرایش شد");
            setOPenModal(false);

        } else {
            toast.error("خطا در ویرایش کاربر");
        }
    }

    const submitHandler = async () => {

        try {
            switch (modalType) {

                case "create": {
                    await addUser();
                    break;
                }
                case "edit": {
                    await updateUser(selectedUserId);
                    break;
                }
                case "delete": {

                    await deleteUser(selectedUserId);
                    break;
                }
            }

        } catch (error) {

            toast.error("عملیات ناموفق بود");
        }
    }

    return (
        <section className="content">
            <Breadcrumbs title={"کاربران"}/>
            <Table>
                <Header>
                    <HeaderInfo length={users.length} title={["کاربر", "کاربران"]}/>
                    <CreatButton title={["کاربر", "کاربران"]} openModal={setOPenModal} modalType={setModalType}
                                 openCreatModal={openCreatModalHandler}/>
                </Header>
                <HeadRow rows={tableRow}></HeadRow>
                <TableBody>
                    {usersLoading ? (
                        <Loading/>
                    ) : (
                        users.length ? (
                            paginatedItems.map((user) => (
                                <TableRow key={user.id}>
                                    <p className="user-fullName">{user.name}</p>
                                    <p className="user-username">{user.username}</p>
                                    <p className="user-email">{user.email}</p>
                                    <p className="user-password">{user.city}</p>
                                    <div className="product-manage">
                                        <button className="edit-btn" onClick={() => {
                                            setOPenModal(true)
                                            setModalType("edit")
                                            openEditModalHandler(user.id)
                                            setSelectedUserId(user.id)
                                        }}>
                                            <FaEdit/>
                                        </button>
                                        <button title={"کاربر"} className="remove-btn" onClick={() => {
                                            setOPenModal(true)
                                            setModalType("delete")
                                            setSelectedUserId(user.id)
                                        }}>
                                            <IoIosRemoveCircle/>
                                        </button>
                                    </div>
                                </TableRow>
                            ))
                        ) : (<div className="mt-3">کاربری ایی یافت نشد !</div>)
                    )}
                </TableBody>
                <TableFooter>
                    <Pagination onPageChange={setPage} currentPage={page} pagesCount={pagesCount}/>
                </TableFooter>
            </Table>
            <Modal openModal={openModal}>
                <ModalHeader title={"کاربر"} setOPenModal={setOPenModal} modalType={modalType}/>
                <ModalBody title={"کاربر"} modalType={modalType} formData={formData} onChange={handleChange}
                           formConfig={usersFormConfig}/>
                <ModalFooter openModal={setOPenModal} onSubmit={submitHandler}/>
            </Modal>
        </section>

    );
}

export default Users;