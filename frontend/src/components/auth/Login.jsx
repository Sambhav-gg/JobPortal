import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setAuthUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    console.log("Login started");
    const navigate = useNavigate();

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Something went wrong";
            console.log(errorMessage);
            toast.error(errorMessage);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 flex flex-col">
            <Navbar />
            <div className="flex items-center justify-center flex-1 p-4">
                <form onSubmit={submitHandler} className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md transition-transform hover:scale-[1.02] duration-300">
                    <h1 className='font-bold text-4xl mb-6 text-center text-white'>Login</h1>

                    <div className="mb-5">
                        <Label className="text-white text-sm mb-2 block">Email</Label>
                        <Input
    type="email"
    value={input.email}
    name="email"
    onChange={changeEventHandler}
    placeholder="sambhav@gmail.com"
    className="mt-2 bg-white text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
/>
                    </div>

                    <div className="mb-5">
                        <Label className="text-white text-sm mb-2 block">Password</Label>
                        <Input
    type="password"
    value={input.password}
    name="password"
    onChange={changeEventHandler}
    placeholder="*******"
    className="mt-2 bg-white text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
/>
                    </div>

                    <RadioGroup className="flex items-center justify-between my-5">
                        <div className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform">
                            <Input
                                type="radio"
                                name="role"
                                value="student"
                                checked={input.role === "student"}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <Label className="text-white cursor-pointer">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform">
                            <Input
                                type="radio"
                                name="role"
                                value="recruiter"
                                checked={input.role === "recruiter"}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <Label className="text-white cursor-pointer">Recruiter</Label>
                        </div>
                    </RadioGroup>

                    {loading ? (
                        <Button className="w-full my-4 bg-blue-600 hover:bg-blue-700 transition-colors" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please Wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 bg-blue-600 hover:bg-blue-700 transition-colors hover:scale-[1.02] duration-300">
                            Login
                        </Button>
                    )}

                    <span className='text-sm block text-center text-white'>
                        Don't have an account? <Link to="/signup" className="text-blue-300 font-semibold hover:underline hover:text-blue-200 transition-colors">Sign Up</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Login
