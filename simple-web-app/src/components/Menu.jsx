import {Link} from "react-router-dom";

export default function Menu(props) {
    return (
        <>
            <h1>Simple Web App</h1>
            <div className="menu" style={{flexDirection: props.direction}}>
                <Link to="/">
                    <button className="menuButton">Home</button>
                </Link>

                <Link to="/users">
                    <button className="menuButton">Display Users</button>
                </Link>

                <Link to="/add_user">
                    <button className="menuButton">Register new user</button>
                </Link>

                <Link to="/logout">
                    <button className="menuButton">Logout</button>
                </Link>
            </div>
        </>
    )
}