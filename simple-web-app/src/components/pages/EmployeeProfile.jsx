import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Nav from "../Nav.jsx";

const EmployeeProfile = () => {
    const {id} = useParams();
    const [employee, setEmployee] = useState([]);
    const [address, setAddress] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get(`http://localhost:8080/api/users/${id}`, {
                    headers: {
                        // 'Authorization': `Basic ${localStorage.getItem('sessionToken')}`
                        'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
                    },
                })
                .then((response) => {
                    setEmployee(response.data);
                    setAddress(response.data.address);
                    setLoading(false);
                }).catch((error) => {
                    navigate("/logout");
                    console.error("Error fetching users...", error)
                })
        }

        if (localStorage.getItem("sessionToken") == null) {
            navigate("/login");
        } else fetchData();
    }, [])

    const navigate = useNavigate();

    const deleteEmployee = async () => {
        await axios
            .delete(`http://localhost:8080/api/users/${id}`, {
                headers: {
                    // 'Authorization': `Basic ${localStorage.getItem('sessionToken')}`
                        'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
                },
            })
            .then(() => navigate('/users'))
            .catch((error) => {
                navigate("/logout");
                console.error("Error deleting user:", error);
            })
    };

    const updateEmployee = async () => {
        const formData = new FormData();
        formData.append(
            "employee",
            new Blob([JSON.stringify(employee)], {type: "application/json"})
        );

        await axios
            .put("http://localhost:8080/api/users", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    // 'Authorization': `Basic ${localStorage.getItem('sessionToken')}`
                        'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
                },
            }).then(() => alert("Employee Profile updated successfully"))
            .catch((error) => {
                navigate("/logout");
                console.error("Error updating user profile:", error)
            });
    };

    const handleAddressInputChange = (e) => {
        const {name, value} = e.target;
        // console.log({name, value});

        // Update UI
        setAddress({...address, [name]: value});
        // Update data to be ready for submission
        address[name] = value;
        employee.address = address;

        // console.log(address);
    }

    return (
        <>{localStorage.getItem("sessionToken") != null ? (<>
            <Nav direction="row"/>
            <h2>Employee Profile</h2>
            {!loading && (
                <>
                    <table className="center text-left">
                        <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{employee.name}</td>
                        </tr>
                        <tr>
                            <th>Surname</th>
                            <td>{employee.surname}</td>
                        </tr>
                        <tr>
                            <th>Gender</th>
                            <td>{(employee.gender == 0) ? "M" : "F"}</td>
                        </tr>
                        <tr>
                            <th>Birthday</th>
                            <td>{new Date(employee.birthday).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            }).replaceAll('/', '-')}</td>
                        </tr>
                        <tr>
                            <th>Work Address</th>
                            <td><input
                                type="text"
                                value={address.workAddress ? address.workAddress : ''}
                                onChange={handleAddressInputChange}
                                name="workAddress"
                                id="workAddress"
                            ></input></td>
                        </tr>
                        <tr>
                            <th>Home Address</th>
                            <td><input
                                type="text"
                                value={address.homeAddress ? address.homeAddress : ''}
                                onChange={handleAddressInputChange}
                                name="homeAddress"
                                id="homeAddress"
                            ></input></td>
                        </tr>
                        </tbody>
                    </table>
                    <button onClick={updateEmployee}
                            style={{margin: '1em'}}>Update
                    </button>
                    <button onClick={deleteEmployee}
                            className="deleteButton">Delete
                    </button>
                </>
            )}
        </>) : null}</>
    )
}

export default EmployeeProfile;