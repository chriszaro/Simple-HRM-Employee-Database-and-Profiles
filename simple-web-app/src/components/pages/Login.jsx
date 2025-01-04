import axios from "axios";
import {useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import {useNavigate} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";

export default function Login() {

    const {register, handleSubmit, control, setValue, formState: {errors}} = useForm();

    const registerOptions = {
        username: {
            required: "Cannot be empty",
            minLength: {value: 2, message: "Enter at least 2 letters"},
            pattern: {value: /^[A-Za-z0-9._-]+$/, message: "Only letters are allowed"}
        },
        password: {
            pattern: {value: /^[A-Za-z0-9@!%*#$&?]*$/, message: "Unsupported characters"}
        }
    }

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const submitHandler = (data) => {
        //console.log(data);

        credentials.username = data.username;
        credentials.password = data.password;

        const str = credentials.username + ":" + credentials.password;

        axios
            .post("http://localhost:8080/api/login", credentials, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Basic ' + btoa(str)
                },
            })
            // eslint-disable-next-line no-unused-vars
            .then((response) => {
                localStorage.setItem("basicToken", btoa(str));
                navigate('/');
            })
            .catch((error) => {
                console.error("Error adding user", error);
                console.log(JSON.stringify(credentials));
                alert("Error adding user");
            })
    }

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(submitHandler)}>
                <label htmlFor='username'>Username</label>
                <br/>
                <input type='text' name='username' {...register("username", registerOptions.username)}/>
                <br/>
                <label htmlFor='password'>Password</label>
                <br/>
                <input type='password' name='password' {...register("password", registerOptions.password)}/>
                <br/>
                <button type='submit'>Login</button>
            </form>
        </>
    )
}