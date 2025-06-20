import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from "../ui/button";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input]);

    return (
        <div>
            <Navbar/>
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 p-4">
            
            <div className="max-w-6xl mx-auto my-10 p-6 bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg">
                <div className='flex items-center justify-between mb-6'>
                    <Input
                        className="w-1/3 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Filter by job title"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        onClick={() => navigate("/admin/jobs/create")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                    >
                        New Job
                    </Button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    </div>
    );
}

export default AdminJobs;
