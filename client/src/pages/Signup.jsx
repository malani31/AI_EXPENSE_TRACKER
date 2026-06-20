import { useState,useEffect } from "react";
import { useDispatch,useSelector} from "react-redux";
import {signupUser}from '../redux/slices/authSlice';
import {useNavigate,Link} from 'react-router-dom';
import logo from '../assets/logo.png';
import loginImage from '../assets/login.png';

function Register(){
    const dispatch  =   useDispatch();
    const navigate = useNavigate();

    const {loading,error,user}= useSelector((state)=> state.auth);
    const [formData,setFormData]=useState({
        name:"",email:"", password:"",
    })   

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(signupUser(formData));
    };

    useEffect(()=>{
        if(user){
            navigate('/dashboard');
        }
    },[user,navigate]);

    return(
        <div className="min-h-screen flex items-center justify-between bg-gray-50 px-4">
            <div>
                <img src={loginImage} className="w-140 h-full md:block hidden " alt="Login Image"/>
            </div>
            <div className='max-w-lg w-full bg-white shadow-lg rounded-2xl p-6'>
                <div className='flex flex-col items-center justify-center'>
                <h2 className='text-2xl font-bold text-center text-gray-900 mb-6'>
                    Join ExpenseIQ Today
                </h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className=" block text-sm font-medium text-gray-700">Name</label>
                        <input 
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your name"
                            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm outline-0 text-[#111827] focus:border-[#2563EB] focus:border-2"
                        />
                    </div>

                    <div>
                        <label className=" block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="you@example.com "
                            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm outline-0 text-[#111827] focus:border-[#2563EB] focus:border-2"
                        />
                    </div>

                    <div>
                        <label className=" block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder=". . ."
                            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm outline-0 text-[#111827] focus:border-[#2563EB] focus:border-2"
                        />
                    </div>
                    {error && (
                        <p className="text-rose-500 text-sm mt-2">{error}</p>
                    )}

                    <button type="submit " disabled={loading} className="w-full bg-[#2563EB] text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 cursor-pointer transition duration-300 ">
                        {loading ? "CREATING..." :"CREATE ACCOUNT"}
                    </button>
                </form>

                <p className='text-center text-sm text-gray-600 mt-4'>
                    Already have an account?{" "}
                    <Link to="/login" className='text-[#2563EB] hover:underline'>Log in</Link>
                </p>

                <p className='text-center text-xs text-gray-600 mt-4 italic'>
                    Your data is encrypted and never shared without your consent
                </p>
            </div>

        </div>
    )
}

export default Register;