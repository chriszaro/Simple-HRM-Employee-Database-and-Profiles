import axios from "axios";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useNavigate} from "react-router-dom";
import Nav from "../Nav.jsx";
import {useForm, Controller} from "react-hook-form";

const AddEmployee = () => {

    useEffect(() => {
        if (localStorage.getItem("sessionToken") == null) {
            navigate("/login");
        }
    }, []);

    const {register, handleSubmit, control, setValue, formState: {errors}} = useForm();

    const registerOptions = {
        name: {
            required: "Cannot be empty",
            minLength: {value: 2, message: "Enter at least 2 letters"},
            pattern: {value: /^[A-Za-z]+ ?-? ?[A-Za-z]*$/, message: "Only letters are allowed"}
        },
        address: {
            pattern: {value: /^[A-Za-z0-9 ,-]*$/, message: "Only letters, number and spaces are allowed"}
        },
        gender: {
            required: true
        }
    }

    // eslint-disable-next-line no-unused-vars
    const [employee, setEmployee] = useState({
        name: "",
        surname: "",
        gender: "false",
        birthday: "",
        address: {},
    });

    // eslint-disable-next-line no-unused-vars
    const [address, setAddress] = useState({
        workAddress: "",
        homeAddress: "",
    });

    const [selectedDate, setSelectedDate] = useState(null);

    const navigate = useNavigate();

    // // used for gender
    // const handleInputChange = (e) => {
    //     const {name, value} = e.target;
    //     //console.log({name, value});
    //
    //     // Update UI
    //     setUser({...employee, [name]: value});
    //     // Update data to be ready for submission
    //     employee[name] = value;
    //
    //     //console.log(employee);
    // }

    // const handleAddressInputChange = (e) => {
    //     const {name, value} = e.target;
    //     // console.log({name, value});
    //
    //     // Update UI
    //     setAddress({...address, [name]: value});
    //     // Update data to be ready for submission
    //     address[name] = value;
    //     employee.address = address;
    //
    //     // console.log(address);
    // }

    const handleDateInputChange = (value) => {
        setValue("birthday", value, {
            shouldDirty: true
        });
        // Update UI
        setSelectedDate(value);
        // // Update data to be ready for submission
        // employee.birthday = value;
    }

    const submitHandler = (data) => {
        //console.log(data);

        address.workAddress = data.workAddress;
        address.homeAddress = data.homeAddress;
        employee.address = address;

        employee.gender = data.gender;
        employee.name = data.name;
        employee.surname = data.surname;
        employee.birthday = data.birthday;

        const formData = new FormData();
        formData.append(
            "employee",
            new Blob([JSON.stringify(employee)], {type: "application/json"})
        );
        axios
            .post("http://localhost:8080/api/employees", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    // 'Authorization': `Basic ${localStorage.getItem('sessionToken')}`
                        'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
                },
            })
            .then(() => {
                navigate('/employees');
            })
            .catch(() => {
                navigate("/logout");
                console.log(JSON.stringify(employee));
                alert("Error adding employee");
            })
    }

    return (
        <>
            {localStorage.getItem("sessionToken") != null ? (
                <>
                    <Nav direction="row"/>
                    <h2>New Employee</h2>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <label htmlFor='name'>Name</label>
                        <br/>
                        <input
                            type="text"
                            name="name"
                            {...register("name", registerOptions.name)}
                        ></input>
                        <br/>
                        <span> {errors?.name && errors.name.message}</span>
                        <br/>
                        <label htmlFor='surname'>Surname</label>
                        <br/>
                        <input
                            type="text"
                            name="surname"
                            {...register("surname", registerOptions.name)}
                        ></input>
                        <br/>
                        <span> {errors?.surname && errors.surname.message}</span>
                        <br/>
                        <label htmlFor="gender">Gender</label>
                        <br/>
                        <select
                            name="gender"
                            {...register("gender", registerOptions.gender)}
                        >
                            <option value="false">M</option>
                            <option value="true">F</option>
                        </select>
                        <br/>
                        <label htmlFor='birthday'>Birthday</label>
                        <br/>
                        <Controller
                            name="birthday"
                            control={control}
                            defaultValue={selectedDate}
                            render={() => (
                                <DatePicker
                                    showIcon
                                    selected={selectedDate}
                                    onChange={handleDateInputChange}
                                    id="birthday"
                                    dateFormat='dd/MM/yyyy'
                                    maxDate={new Date()}
                                    showYearDropdown
                                    showMonthDropdown
                                />
                            )}
                        />

                        <br/>
                        <label htmlFor='workAddress'>Work Address</label>
                        <br/>
                        <input
                            type="text"
                            name="workAddress"
                            {...register("workAddress", registerOptions.address)}
                        ></input>
                        <br/>
                        <span> {errors?.workAddress && errors.workAddress.message}</span>
                        <br/>
                        <label htmlFor="homeAddress">Home Address</label>
                        <br/>
                        <input
                            type="text"
                            name="homeAddress"
                            {...register("homeAddress", registerOptions.address)}
                        ></input>
                        <br/>
                        <span> {errors?.homeAddress && errors.homeAddress.message}</span>
                        <br/>
                        <button type="submit">Add</button>
                    </form>
                </>
            ) : null}

        </>
    )
}

export default AddEmployee;