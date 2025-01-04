import Nav from "../Nav.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("basicToken") == null) {
            navigate("/login");
        }
    }, []);

    return (
        <>
            {localStorage.getItem("basicToken") != null ? (<Nav direction="column"/>) : null}
        </>
    )
}

export default Home
