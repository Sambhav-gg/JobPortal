import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from "../ui/button";
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompany from '@/hooks/useGetAllCompany';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
    const navigate = useNavigate();
    useGetAllCompany();

    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-900">
            <Navbar />
            <div className="max-w-6xl mx-auto my-10 p-4">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className='flex flex-col md:flex-row items-center justify-between mb-6 gap-4'>
                        <Input
                            className="w-full md:w-1/3 bg-gray-100 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                            placeholder="Filter by company name"
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button
                            onClick={() => navigate("/admin/companies/create")}
                            className="bg-blue-500 hover:bg-blue-600 text-white transition"
                        >
                            New Company
                        </Button>
                    </div>

                    <CompaniesTable />
                </div>
            </div>
        </div>
    );
};

export default Companies;
