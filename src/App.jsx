import Table from "./pages/Table.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import NotFound from "./pages/404.jsx";
import Contact from "./pages/Contact.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Nav from "./component/Nav.jsx";



function App() {


  return (
    <>

        <BrowserRouter>
            <Routes>
            <Route path="/" element=<Table />/>
            <Route path="/login" element=<Login />/>
            <Route path="/signup" element=<Signup />/>
            <Route path="/signup" element=<Contact />/>
            <Route path="*" element=<NotFound />/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App;