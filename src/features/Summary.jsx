import React from 'react';
import {FaBox, FaUserSecret, FaUserTie} from "react-icons/fa";
import {FaTicket} from "react-icons/fa6";

function Summary({userLength, courseLength}) {
    return (
        <section className="hero-cards">
            <article>
                <i className="ui-border emerald top"></i>
                <i className="ui-border emerald bottom"></i>
                <span className="hero-card-icon products-icon">
                    <FaBox/>
                </span>
                <div>
                    <p className="hero-card-title">دوره ها</p>
                    <p className="hero-card-data products-data">{courseLength}</p>
                </div>
            </article>
            <article>
                <i className="ui-border indigo top"></i>
                <i className="ui-border indigo bottom"></i>
                <span className="hero-card-icon users-icon">
                    <FaUserSecret/>
                </span>
                <div>
                    <p className="hero-card-title">کاربران</p>
                    <p className="hero-card-data users-data">{userLength}</p>
                </div>
            </article>
            <article>
                <i className="ui-border red top"></i>
                <i className="ui-border red bottom"></i>
                <span className="hero-card-icon admins-icon">
                    <FaUserTie/>
                </span>
                <div>
                    <p className="hero-card-title">مدیران</p>
                    <p className="hero-card-data moderators-data">2</p>
                </div>
            </article>
            <article>
                <i className="ui-border yellow top"></i>
                <i className="ui-border yellow bottom"></i>
                <span className="hero-card-icon tickets-icon">
                    <FaTicket />
                </span>
                <div>
                    <p className="hero-card-title">تیکت‌ها</p>
                    <p className="hero-card-data ticket-data">2</p>
                </div>
            </article>
        </section>
    );
}

export default Summary;