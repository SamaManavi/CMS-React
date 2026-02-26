import {useEffect, useState} from "react";

const useFetch = (url) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refetch, setRefetch] = useState(true);
    useEffect(() => {

        const controller = new AbortController();

        const fetchUser = async () => {

            setLoading(true);
            setError(null);

            try {

                const response = await fetch(url, {signal: controller.signal});

                if (response.ok) {

                    const data = await response.json();
                    setData(data);

                } else {
                    setError("Something went wrong");
                }

            } catch (error) {

                setError(error.message);
            } finally {

                setLoading(false);
            }
        }
        fetchUser();
        return () => controller.abort();

    }, [url, refetch]);

    const postData = async (body) => {

        const response = await fetch(url, {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
        });
        if (response.ok) setRefetch(prev => !prev);

        return response;
    }

    const deleteData = async (id) => {

        const response = await fetch(`${url}/${id}`, {method: "DELETE"});
        if (response.ok) setRefetch(prev => !prev);

        return response;
    }

    const updateData = async (id, body) => {

        const response = await fetch(`${url}/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
        })
        if (response.ok) setRefetch(prev => !prev);

        return response;
    }

    return {data, error, loading, postData, deleteData, updateData};
}

export default useFetch