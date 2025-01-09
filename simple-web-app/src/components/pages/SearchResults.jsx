import axios from "axios";
import {useEffect, useState} from "react";
import UserTable from "../UsersTable.jsx";
import {useNavigate, useSearchParams} from 'react-router-dom';
import Nav from "../Nav.jsx";

const SearchResults = () => {
    const [users, setUsers] = useState([]);
    const [searchParams] = useSearchParams();
    const sanitizeInput = (input) => {
        // Regular expression to match special characters and other potentially dangerous characters
        const regex = /[^a-zA-Z0-9\s]/g;
        return input.replace(regex, '');
    };

    const keyword = sanitizeInput(searchParams.get('keyword'));

    const fetchUsers = async () => {
        await axios
            .get(`http://localhost:8080/api/users/search?keyword=${keyword}`, {
                headers: {
                    // 'Authorization': `Basic ${localStorage.getItem('sessionToken')}`
                        'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
                },
            })
            .then((res) => setUsers(res.data))
            .catch((error) => {
                navigate("/logout");
                console.error("Error fetching users...", error)
            })
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("sessionToken") == null) {
            navigate("/login");
        }
        fetchUsers();
    }, [searchParams]);

    return (
        <>
            {localStorage.getItem("sessionToken") != null ? (
                <>
                    <Nav direction="row"/>
                    <h2>Search Results for {keyword}</h2>
                    <UserTable data={users} refreshData={fetchUsers}/>
                </>
            ) : null}
        </>
    )
}

export default SearchResults;