import useGetJobById from "@/hooks/useGetJobById";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";

const JobSetup = () => {
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
    });

    useGetJobById(id); // You are already handling if id is undefined

    const singleJob = useSelector((store) => store.job?.singleJob);    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id && singleJob) {
            setInput({
                title: singleJob.title || "",
                description: singleJob.description || "",
                requirements: singleJob.requirements || "",
                salary: singleJob.salary || "",
                location: singleJob.location || "",
                jobType: singleJob.jobType || "",
                experience: singleJob.experienceLevel || "",
                position: singleJob.position || 0,
            });
        }
    }, [singleJob, id]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res;

            if (id) {
                // Update job
                res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, input, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
            } else {
                // Post new job
                res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
            }

            if (res.data.success) {
                console.log(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center w-screen my-5">
                <form
                    onSubmit={submitHandler}
                    className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
                >
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="number"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <Button className="w-full my-4" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {id ? "Updating..." : "Posting..."}
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">
                            {id ? "Update Job" : "Post New Job"}
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default JobSetup;
