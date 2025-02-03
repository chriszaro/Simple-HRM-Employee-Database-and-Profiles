import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const DataTable = ({data, refreshData}) => {
    const [employees, setEmployees] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [employeeToDeleteId, setEmployeeToDeleteId] = useState(null);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    useEffect(() => {
        setEmployees(data)
    })

    const navigate = useNavigate();

    const handleOpen = (id, name) => {
        setEmployeeToDeleteId(id);
        setEmployeeToDelete(name);
        setIsOpen(true);
    }
    const handleCancel = () => {
        setIsOpen(false);
    }

    const handleDelete = async () => {
        await axios.delete(`http://localhost:8080/api/users/${employeeToDeleteId}`, {
            headers: {
                // 'Authorization': `Basic ${localStorage.getItem('sessionToken')}`
                        'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
            },
        }).then(() => {
            refreshData();
            setIsOpen(false);
            setEmployeeToDeleteId(null);
            setEmployeeToDelete(null);
        }).catch((error) => {
            navigate("/logout");
            console.error("Error deleting user:", error);
        });
    };

    return (
        <>
            <table className="center">
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                </tr>
                {
                    employees.map((employee) => (
                            <tr key={employee.employeeId}>
                                <td><Link to={`/employees/${employee.employeeId}`}>{employee.name}</Link></td>
                                <td><Link to={`/employees/${employee.employeeId}`}>{employee.surname}</Link></td>
                                <td>
                                    <Link to={`/employees/${employee.employeeId}`}>
                                        <button>View Profile</button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        handleOpen(employee.employeeId, employee.name + " " + employee.surname);
                                    }}>Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>
            {isOpen && (
                <div className="popup">
                    <div><p>Are you sure you want to delete <span style={{fontWeight: 'bold'}}>{employeeToDelete}</span> ?
                    </p></div>
                    <div className="button-container">
                        <button onClick={handleDelete} className="deleteButton">Delete</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default DataTable;