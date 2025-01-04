import './App.css'
import './components/pages/DisplayUsers.jsx'
import DisplayUsers from "./components/pages/DisplayUsers.jsx";
import DisplayUser from "./components/pages/DisplayUser.jsx";
import RegisterUser from "./components/pages/RegisterUser.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import SearchResults from "./components/pages/SearchResults.jsx";
import Login from "./components/pages/Login.jsx";
import Logout from "./components/pages/Logout.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home/>}></Route>
                    <Route exact path="/users" element={<DisplayUsers/>}/>
                    <Route exact path="/users/:id" element={<DisplayUser/>}/>
                    <Route exact path="/add_user" element={<RegisterUser/>}/>
                    <Route exact path="/search" element={<SearchResults/>}/>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/logout" element={<Logout/>}/>
                    <Route path="/*" element={<Home/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
