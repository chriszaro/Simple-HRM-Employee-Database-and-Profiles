import axios from "axios";
import {useEffect, useState} from "react";
import UserTable from "../UsersTable.jsx";
import Nav from "../Nav.jsx";
import {useNavigate} from "react-router-dom";

const DisplayUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        await axios
            .get("http://localhost:8080/api/users",
                {
                    headers: {
                        // 'Authorization': `Basic ${localStorage.getItem('sessionToken')}`
                        'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
                    }
                }
            )
            .then(res => setUsers(res.data))
            .catch((error) => {
                navigate("/logout");
                console.error("Error fetching users...", error);
            });
    }
    useEffect(() => {
        if (localStorage.getItem("sessionToken") == null) {
            navigate("/login");
        } else fetchUsers();
    }, [])

    const navigate = useNavigate();

    return (
        <>
            {localStorage.getItem("sessionToken") != null ? (
                <>
                    <Nav direction="row"/>
                    <h2>Users</h2>
                    <UserTable data={users} refreshData={fetchUsers}/>
                </>
            ) : null}
        </>
    )
}

export default DisplayUsers;
