import Nav from "../Nav.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("sessionToken") == null) {
            navigate("/login");
        }
    }, []);

    return (
        <>
            {localStorage.getItem("sessionToken") != null ? (<Nav direction="column"/>) : null}
        </>
    )
}

export default Home
