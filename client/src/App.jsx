import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Landing from './pages/Landing.jsx';
import Register from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ExpenseList from './pages/ExpenseList';
import Reports from "./pages/Reports.jsx";
import ProfileSettings from "./pages/ProfileSettings.jsx";
import {  useEffect } from "react";
import { useDispatch,useSelector  } from "react-redux";
import { addNotification } from "./redux/slices/notificationSlice.js";
import ProtectedRoutes from './components/ProtectRoutes';

import { initSocket } from "./socket.js";

function App() {
  const {user}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  useEffect(()=>{
    if(user){
      const socket=initSocket(localStorage.getItem("token"));
      socket.emit("register",user._id);

      socket.on("newNotification",(notif)=>{
        dispatch(addNotification(notif))
      });

      return ()=>{
        socket.off("newNotification")
      };
    }
  },[user,dispatch])

  return (
   <Router>
    <Routes>
      <Route path="/" element={<Landing/>} /> 
      <Route path="/register" element={<Register/>} />
      <Route path="/login"  element={<Login/>} />


      <Route path="/dashboard" element={<ProtectedRoutes> <Dashboard/> </ProtectedRoutes>}/>
      <Route path="expense-list" element={<ProtectedRoutes> <ExpenseList/></ProtectedRoutes>}/>
      <Route path="reports" element={<ProtectedRoutes>  <Reports/> </ProtectedRoutes>}/>
      <Route path="/settings" element={<ProtectedRoutes> <ProfileSettings/> </ProtectedRoutes>}/>
    </Routes>
   </Router>
  )
}

export default App
