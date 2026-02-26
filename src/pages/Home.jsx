import React from 'react';
import Breadcrumbs from "../components/common/breadcrumbs.jsx";
import Summary from "../features/Summary.jsx";
import LatestUsers from "../features/latestUsers.jsx";
import useFetch from "../hook/useFetch.js";
import LatestCourses from "../features/LatestCourses.jsx";

function Home() {

    const {data: users, error: errorUsers, loading: loadingUsers} = useFetch("http://localhost:3000/users");

    const {
        data: courses,
        error: errorCourses,
        loading: loadingCourses
    } = useFetch("http://localhost:3000/courses");

    return (

        <>
            <section className="content">
                <Breadcrumbs title={"داشبورد"}/>
                <Summary userLength={users.length} courseLength={courses.length}/>
                <section className="after-hero">
                    <LatestUsers users={users} loading={loadingUsers}/>
                    <LatestCourses courses={courses} loading={loadingCourses}/>
                </section>
            </section>
        </>
    );
}

export default Home;