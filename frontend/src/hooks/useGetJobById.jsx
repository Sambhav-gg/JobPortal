import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';

const useGetJobById = (jobId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!jobId) return; // Prevent running if jobId is not provided

        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job)); // ✅ Correct key
                    console.log("Job fetched successfully");
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch]);
};

export default useGetJobById;
