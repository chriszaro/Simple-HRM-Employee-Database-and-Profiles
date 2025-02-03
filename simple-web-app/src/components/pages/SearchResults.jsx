import axios from "axios";
import {useEffect, useState} from "react";
import DataTable from "../DataTable.jsx";
import {useNavigate, useSearchParams} from 'react-router-dom';
import Nav from "../Nav.jsx";

const SearchResults = () => {
    const [employees, setEmployees] = useState([]);
    const [searchParams] = useSearchParams();
    const sanitizeInput = (input) => {
        // Regular expression to match special characters and other potentially dangerous characters
        const regex = /[^a-zA-Z0-9\s]/g;
        return input.replace(regex, '');
    };

    const keyword = sanitizeInput(searchParams.get('keyword'));

    const fetchData = async () => {
        await axios
            .get(`http://localhost:8080/api/employees/search?keyword=${keyword}`, {
                headers: {
                    // 'Authorization': `Basic ${localStorage.getItem('sessionToken')}`
                        'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
                },
            })
            .then((res) => setEmployees(res.data))
            .catch((error) => {
                navigate("/logout");
                console.error("Error fetching employees...", error)
            })
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("sessionToken") == null) {
            navigate("/login");
        }
        fetchData();
    }, [searchParams]);

    return (
        <>
            {localStorage.getItem("sessionToken") != null ? (
                <>
                    <Nav direction="row"/>
                    <h2>Search Results for {keyword}</h2>
                    <DataTable data={employees} refreshData={fetchData}/>
                </>
            ) : null}
        </>
    )
}

export default SearchResults;