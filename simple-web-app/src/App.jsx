import './App.css'
import './components/pages/EmployeesList.jsx'
import EmployeesList from "./components/pages/EmployeesList.jsx";
import EmployeeProfile from "./components/pages/EmployeeProfile.jsx";
import AddEmployee from "./components/pages/AddEmployee.jsx";
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
                    <Route exact path="/users" element={<EmployeesList/>}/>
                    <Route exact path="/users/:id" element={<EmployeeProfile/>}/>
                    <Route exact path="/add" element={<AddEmployee/>}/>
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
