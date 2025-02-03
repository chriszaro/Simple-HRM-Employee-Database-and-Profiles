import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Nav from "../Nav.jsx";

const EmployeeProfile = () => {
    const {id} = useParams();
    const [employee, setEmployee] = useState([]);
    const [address, setAddress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [newResume, setNewResume] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("sessionToken") == null) {
            navigate("/login");
        } else fetchData();
    }, [])

    const fetchData = async () => {
        await axios
            .get(`http://localhost:8080/api/employees/${id}`, {
                headers: {
                    // 'Authorization': `Basic ${localStorage.getItem('sessionToken')}`
                    'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
                },
            })
            .then((response) => {
                setEmployee(response.data);
                setAddress(response.data.address);
                setLoading(false);
                fetchResumeFile();
            }).catch((error) => {
                navigate("/logout");
                console.error("Error fetching employee...", error)
            })
    }

    const fetchResumeFile = async () => {
        await axios
            .get(`http://localhost:8080/api/employees/${id}/resume`, {
                headers: {
                    // 'Authorization': `Basic ${localStorage.getItem('sessionToken')}`
                    'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
                },
                responseType: 'blob'
            })
            .then((response) => {
                setFile(URL.createObjectURL((response.data)));
                console.log(file)
            }).catch((error) => {
                console.error("Error fetching employee resume...", error)
            })
    }

    const deleteEmployee = async () => {
        await axios
            .delete(`http://localhost:8080/api/employees/${id}`, {
                headers: {
                    // 'Authorization': `Basic ${localStorage.getItem('sessionToken')}`
                    'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
                },
            })
            .then(() => navigate('/employees'))
            .catch((error) => {
                navigate("/logout");
                console.error("Error deleting employees:", error);
            })
    };

    const updateEmployee = async () => {
        const formData = new FormData();
        formData.append(
            "employee",
            new Blob([JSON.stringify(employee)], {type: "application/json"})
        );
        formData.append('resumeFile', newResume);

        await axios
            .put("http://localhost:8080/api/employees", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    // 'Authorization': `Basic ${localStorage.getItem('sessionToken')}`
                    'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
                },
            }).then(() => {
                fetchData();
                alert("Employee Profile updated successfully")
            })
            .catch((error) => {
                //navigate("/logout");
                console.error("Error updating employee profile:", error)
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

    const handleFileChange = (e) => {
        if (e.target.files) {
            setNewResume(e.target.files[0]);
        }
    };

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

                        {file && (
                            <section>
                                Resume details:
                                <ul style={{listStyleType: 'none', textAlign: 'left'}}>
                                    <li>Name: {employee.resumeFileName}</li>
                                    <li>Type: {employee.resumeFileType}</li>
                                    <li><a href={file} target="_blank">View</a></li>
                                    {/*<li><a onClick={deleteEmployee}>Delete</a></li>*/}
                                    {/*<li>Size: {file.size || employee.resumeFileName} bytes</li>*/}
                                </ul>
                            </section>
                        )}
                        <table className="center text-left">
                            <tbody>
                            <tr>
                                <th>Add new resume</th>
                                <td>
                                    <input id="file" type="file" onChange={handleFileChange}/>
                                </td>
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
            </>)
            :
            null
        }</>
    )
}

export default EmployeeProfile;