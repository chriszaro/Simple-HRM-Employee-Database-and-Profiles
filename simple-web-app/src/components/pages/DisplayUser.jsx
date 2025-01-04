import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Nav from "../Nav.jsx";

const DisplayUser = () => {
    const {id} = useParams();
    const [user, setUser] = useState([]);
    const [address, setAddress] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response =
                    await axios.get(`http://localhost:8080/api/users/${id}`, {
                        headers: {
                            'Authorization': `Basic ${localStorage.getItem('basicToken')}`
                        },
                    });
                setUser(response.data);
                setAddress(response.data.address);
                //console.log(response.data);
            } catch (error) {
                console.error("Error fetching users...", error);
            }
        }

        if (localStorage.getItem("basicToken") == null) {
            navigate("/login");
        }
        else fetchUser();
    }, [])

    const navigate = useNavigate();

    const deleteUser = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${id}`, {
                headers: {
                    'Authorization': `Basic ${localStorage.getItem('basicToken')}`
                },
            });
            // console.log("Product deleted successfully");
            // alert("Product deleted successfully");
            navigate('/users');
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const updateUser = async () => {
        const formData = new FormData();
        formData.append(
            "user",
            new Blob([JSON.stringify(user)], {type: "application/json"})
        );

        try {
            await axios
                .put("http://localhost:8080/api/users", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Basic ${localStorage.getItem('basicToken')}`
                    },
                });
            //console.log("Product updated successfully");
            alert("Product updated successfully");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleAddressInputChange = (e) => {
        const {name, value} = e.target;
        // console.log({name, value});

        // Update UI
        setAddress({...address, [name]: value});
        // Update data to be ready for submission
        address[name] = value;
        user.address = address;

        // console.log(address);
    }

    return (
        <>{localStorage.getItem("basicToken") != null ? (<>
            <Nav direction="row"/>
            <h2>User Profile</h2>
            <table className="center text-left">
                <tbody>
                <tr>
                    <th>Name</th>
                    <td>{user.name}</td>
                </tr>
                <tr>
                    <th>Surname</th>
                    <td>{user.surname}</td>
                </tr>
                <tr>
                    <th>Gender</th>
                    <td>{(user.gender == 0) ? "M" : "F"}</td>
                </tr>
                <tr>
                    <th>Birthday</th>
                    <td>{new Date(user.birthday).toLocaleDateString('en-GB', {
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
                {/*<tr>*/}
                {/*        <th>Name</th>*/}
                {/*        <th>Surname</th>*/}
                {/*        <th>Gender</th>*/}
                {/*        <th>Birthday</th>*/}
                {/*        <th>Work Address</th>*/}
                {/*        <th>Home Address</th>*/}
                {/*        <th></th>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <td>{user.name}</td>*/}
                {/*        <td>{user.surname}</td>*/}
                {/*        <td>{(user.gender == 0) ? "M" : "F"}</td>*/}
                {/*        <td>{new Date(user.birthday).toLocaleDateString('en-GB', {*/}
                {/*            day: '2-digit',*/}
                {/*            month: '2-digit',*/}
                {/*            year: 'numeric'*/}
                {/*        }).replaceAll('/', '-')}</td>*/}
                {/*        <td>{address.workAddress}</td>*/}
                {/*        <td>{address.homeAddress}</td>*/}
                {/*        <td>*/}
                {/*            <Link to={`/users`}>*/}
                {/*                <button onClick={deleteUser}>Delete</button>*/}
                {/*            </Link>*/}
                {/*        </td>*/}
                {/*    </tr>*/}
                </tbody>
            </table>
            <button onClick={updateUser}
                    style={{margin: '1em'}}>Update
            </button>
            <button onClick={deleteUser}
                    className="deleteButton">Delete
            </button>
        </>) : null}</>
    )
}

export default DisplayUser;