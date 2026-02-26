import React from 'react';
import {Link} from "react-router";
import {FaChevronLeft, FaUser} from "react-icons/fa";
import Loading from "../components/common/Loading.jsx";

function LatestUsers({users, loading}) {

    return (
        <section className="latest-users">
            <i className="ui-border top indigo"></i>
            <div className="section-header">
                <p className="section-title">جدیدترین کاربران</p>
                <Link to="./users" className="section-link">
                    بیشتر
                    <FaChevronLeft/>
                </Link>
            </div>

            {loading ?
                <Loading/>
                :
                users.length ? (

                    users.slice(-5).map((user) => (

                        <article key={user.id}>

                    <span className="icon-card">
                        <FaUser/>
                    </span>
                            <div>
                                <p className="user-name">{user.firstname}{" "}{user.lastname}</p>
                                <p className="user-email">{user.email}</p>
                            </div>
                        </article>
                    ))
                ) : (<div className="mt-3">کاربری یافت نشد !</div>)
            }
        </section>);
}

export default LatestUsers;