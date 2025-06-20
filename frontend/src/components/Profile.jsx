import React, { useState, useRef } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Contact, Mail, Pen, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector, useDispatch } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { setAuthUser } from "@/redux/authSlice";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);


    try {
      setLoading(true);
      const res = await axios.put(`${USER_API_END_POINT}/update-profile-photo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setAuthUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 bg-white border border-gray-200 rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-5 relative">
            <div onClick={handleAvatarClick} className="cursor-pointer group relative">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  className="rounded-full object-cover h-20 w-20"
                  src={user?.profile?.profilePhoto}
                  alt={user?.fullname}
                />
              </Avatar>
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {loading ? (
                  <Loader2 className="h-5 w-5 text-white animate-spin" />
                ) : (
                  <Pen className="h-5 w-5 text-white" />
                )}
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handlePhotoChange}
            />
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {user?.fullname}
              </h1>
              <p className="text-gray-600">{user?.profile?.bio || "No bio provided"}</p>
            </div>
          </div>

          <Button onClick={() => setOpen(true)} variant="outline" className="hover:scale-105 transition-transform">
            <Pen className="h-4 w-4 mr-1" /> Edit
          </Button>
        </div>

        <div className="mt-6 space-y-2 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-blue-600" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="h-5 w-5 text-blue-600" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length > 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index} className="bg-blue-100 text-blue-800">{item}</Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Label className="font-semibold text-gray-800">Resume</Label>
          <div className="mt-1">
            {user?.profile?.resume ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={user?.profile?.resume}
                className="text-blue-600 hover:underline"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 bg-white border border-gray-200 rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Applied Jobs</h2>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
