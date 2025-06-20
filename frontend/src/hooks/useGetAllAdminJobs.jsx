import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { setAllAdminJobs } from '@/redux/jobSlice';

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs)); // ✅ correct action and correct data
        }
      } catch (error) {
        console.error("Failed to fetch admin jobs:", error);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;
