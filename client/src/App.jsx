import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Landing from './pages/Landing.jsx';
import Register from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import { useEffect } from "react";
import { useDispatch,useSelector  } from "react-redux";

function App() {
  // const {user}=useSelector((state)=>state.auth);
  // const dispatch=useDispatch();

  return (
   <Router>
    <Routes>
      <Route path="/" element={<Landing/>} /> 
      <Route path="/register" element={<Register/>} />
      <Route path="/login"  element={<Login/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
   </Router>
  )
}

export default App
