import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const UsersTable = ({data}) => {
    const [users, setUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [userToDeleteId, setUserToDeleteId] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        setUsers(data)
    })

    const handleOpen = (id, name) => {
        setUserToDeleteId(id);
        setUserToDelete(name);
        setIsOpen(true);
    }
    const handleCancel = () => {
        setIsOpen(false);
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${userToDeleteId}`, {
                headers: {
                    'Authorization': `Basic ${localStorage.getItem('basicToken')}`
                },
            });
            // console.log("Product deleted successfully");
            // alert("Product deleted successfully");
            setIsOpen(false);
            setUserToDeleteId(null);
            setUserToDelete(null);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
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
                    users.map((user) => (
                            <tr key={user.userId}>
                                <td><Link to={`/users/${user.userId}`}>{user.name}</Link></td>
                                <td><Link to={`/users/${user.userId}`}>{user.surname}</Link></td>
                                <td>
                                    <Link to={`/users/${user.userId}`}>
                                        <button>View Profile</button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        handleOpen(user.userId, user.name + " " + user.surname);
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
                    <div><p>Are you sure you want to delete <span style={{fontWeight: 'bold'}}>{userToDelete}</span> ?
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

export default UsersTable;