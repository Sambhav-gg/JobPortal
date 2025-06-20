import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { setSingleCompany } from "../redux/companySlice";


const useGetCompanyById = (companyId) => {
    const dispatch=useDispatch();

    useEffect(()=>{
        const fetchSingleCompany= async()=>{
            try{
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                    console.log("successfulll");
                    
                }


            }catch(error){
                console.log(error);
            }
        }
        fetchSingleCompany();


    },[companyId,dispatch])
}

export default useGetCompanyById