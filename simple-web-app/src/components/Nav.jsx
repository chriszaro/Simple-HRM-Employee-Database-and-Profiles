import Menu from "./Menu.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Nav(props) {
    const [input, setInput] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            navigate(`/search?keyword=${input}`);
        }
    }

    return (
        <>
            <Menu direction={props.direction}/>
            <input onChange={handleChange}
                   placeholder="Search"
                   onKeyUp={handleKeyPress}
                   value={input}/>
        </>
    )
}