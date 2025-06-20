import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { setAllCompany } from '@/redux/companySlice';



const useGetAllCompany = () => {
    const dispatch=useDispatch();

    useEffect(()=>{
        const fetchAllCompany= async()=>{
            try{
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                if(res.data.success){
                    dispatch(setAllCompany(res.data.companies));
                }


            }catch(error){
                console.log(error);
            }
        }
        fetchAllCompany();


    },[])
}

export default useGetAllCompany
