import axios from "axios";
import {useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

export default function SignUp() {

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

    const [credentials] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const submitHandler = (data) => {
        //console.log(data);

        credentials.username = data.username;
        credentials.password = data.password;

        axios
            .post("http://localhost:8080/api/create_credentials", credentials, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            // eslint-disable-next-line no-unused-vars
            .then((response) => {
                //localStorage.setItem("sessionToken", btoa(str));
                console.log(response.data);
                //localStorage.setItem("sessionToken", response.data);
                navigate('/login');
            })
            .catch(() => {
                console.log(JSON.stringify(credentials));
                alert("error");
            })
    }

    const goToLogin = () => {
        navigate("/login");
    }

    return (
        <>
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit(submitHandler)}>
                <label htmlFor='username'>Username</label>
                <br/>
                <input type='text' name='username' {...register("username", registerOptions.username)}/>
                <br/>
                <label htmlFor='password'>Password</label>
                <br/>
                <input type='password' name='password' {...register("password", registerOptions.password)}/>
                <br/>
                <button type='submit'>Sign up</button>
            </form>
            <button onClick={goToLogin} style={{background:"none", color:"pink"}}>Log in</button>
        </>
    )
}