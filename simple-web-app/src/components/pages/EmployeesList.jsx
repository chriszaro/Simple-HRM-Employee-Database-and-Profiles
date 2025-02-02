import axios from "axios";
import {useEffect, useState} from "react";
import UserTable from "../DataTable.jsx";
import Nav from "../Nav.jsx";
import {useNavigate} from "react-router-dom";

const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);

    const fetchData = async () => {
        await axios
            .get("http://localhost:8080/api/users",
                {
                    headers: {
                        // 'Authorization': `Basic ${localStorage.getItem('sessionToken')}`
                        'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
                    }
                }
            )
            .then(res => setEmployees(res.data))
            .catch((error) => {
                navigate("/logout");
                console.error("Error fetching employees...", error);
            });
    }
    useEffect(() => {
        if (localStorage.getItem("sessionToken") == null) {
            navigate("/login");
        } else fetchData();
    }, [])

    const navigate = useNavigate();

    return (
        <>
            {localStorage.getItem("sessionToken") != null ? (
                <>
                    <Nav direction="row"/>
                    <h2>Employees</h2>
                    <UserTable data={employees} refreshData={fetchData}/>
                </>
            ) : null}
        </>
    )
}

export default EmployeesList;