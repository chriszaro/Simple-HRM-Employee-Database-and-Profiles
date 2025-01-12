import {Link} from "react-router-dom";

export default function Menu(props) {
    return (
        <>
            <h1>Human Resources App</h1>
            <div className="menu" style={{flexDirection: props.direction}}>
                <Link to="/">
                    <button className="menuButton">Home</button>
                </Link>

                <Link to="/users">
                    <button className="menuButton">Display Employees</button>
                </Link>

                <Link to="/add">
                    <button className="menuButton">Add Employee</button>
                </Link>

                <Link to="/logout">
                    <button className="menuButton">Logout</button>
                </Link>
            </div>
        </>
    )
}