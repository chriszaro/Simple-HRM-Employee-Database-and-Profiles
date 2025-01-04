import axios from "axios";
import {useEffect, useState} from "react";
import UserTable from "../UsersTable.jsx";
import Nav from "../Nav.jsx";
import {useNavigate} from "react-router-dom";

const DisplayUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/users",
                {
                    headers: {
                        'Authorization': `Basic ${localStorage.getItem('basicToken')}`
                    }
                }
            );
            setUsers(response.data);
            //console.log(response.data);
        } catch (error) {
            console.error("Error fetching users...", error);
        }
    }
    useEffect(() => {
        if (localStorage.getItem("basicToken") == null) {
            navigate("/login");
        } else fetchUsers();
    }, [])

    const navigate = useNavigate();

    return (
        <>
            {localStorage.getItem("basicToken") != null ? (
                <>
                    <Nav direction="row"/>
                    <h2>Users</h2>
                    <UserTable data={users}/>
                </>
            ) : null}
        </>
    )
}

export default DisplayUsers;