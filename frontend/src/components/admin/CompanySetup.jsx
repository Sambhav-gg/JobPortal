import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    });

    const singleCompany = useSelector(store => store.company?.singleCompany);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changefilehandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: null,
            });
        }
    }, [singleCompany]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-900">
            <Navbar />
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-6">
                <form onSubmit={submitHandler} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
                    <div className="flex items-center gap-5 mb-6">
                        <Button
                            type="button"
                            onClick={() => navigate("/admin/companies")}
                            variant="outline"
                            className="flex items-center gap-2 hover:bg-gray-100"
                        >
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className="font-bold text-3xl text-gray-800">Company Setup</h1>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Label className="text-gray-700">Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                placeholder="Enter Company Name"
                                className="mt-2 bg-gray-100 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                            />
                        </div>

                        <div>
                            <Label className="text-gray-700">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Enter Description"
                                className="mt-2 bg-gray-100 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                            />
                        </div>

                        <div>
                            <Label className="text-gray-700">Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                placeholder="Enter Website"
                                className="mt-2 bg-gray-100 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                            />
                        </div>

                        <div>
                            <Label className="text-gray-700">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                placeholder="Enter Location"
                                className="mt-2 bg-gray-100 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                            />
                        </div>

                        <div>
                            <Label className="text-gray-700">Company Logo</Label>
                            <Input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={changefilehandler}
                                className="cursor-pointer bg-gray-100 text-gray-800 p-1 rounded-md mt-2"
                            />
                        </div>

                        {loading ? (
                            <Button className="w-full my-4 flex justify-center items-center gap-2" disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please Wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4 bg-blue-500 hover:bg-blue-600 text-white transition">
                                Update
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
