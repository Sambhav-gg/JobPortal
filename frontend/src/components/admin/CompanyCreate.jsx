import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Company name is required");
            return;
        }
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-900">
            <Navbar />
            <div className="max-w-4xl mx-auto p-4 flex items-center justify-center min-h-[calc(100vh-64px)]">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full md:w-[500px]">
                    <div className="mb-6">
                        <h1 className="font-bold text-3xl text-gray-800 mb-2">Your Company Name</h1>
                        <p className="text-gray-500">
                            What would you like to name your company? You can change this later.
                        </p>
                    </div>

                    <Label className="text-gray-700">Company Name</Label>
                    <Input
                        type="text"
                        className="my-2 bg-gray-100 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                        placeholder="BootRider, JobHunt, Microsoft"
                        onChange={(e) => setCompanyName(e.target.value)}
                    />

                    <div className="flex items-center justify-end gap-4 mt-8">
                        <Button
                            variant="outline"
                            onClick={() => navigate("/admin/companies")}
                            className="hover:bg-gray-100"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={registerNewCompany}
                            className="bg-blue-500 hover:bg-blue-600 text-white transition"
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
