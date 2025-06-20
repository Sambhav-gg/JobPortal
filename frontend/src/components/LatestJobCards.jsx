import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`jobs/description/${job._id}`)}
            className='p-6 rounded-2xl shadow-lg bg-white border border-gray-200 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between min-h-[250px]'
        >
            <div>
                <h1 className='font-semibold text-lg text-gray-800'>{job?.company?.name}</h1>
                <p className="text-sm text-gray-500">India</p>
            </div>

            <div className='mt-4'>
                <h1 className="font-bold text-xl mb-2 text-gray-900">{job?.title}</h1>
                <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-3 mt-4'>
                <Badge className="bg-blue-100 text-blue-700 font-medium py-1 px-3 rounded-full">
                    {job?.position}
                </Badge>
                <Badge className="bg-red-100 text-red-700 font-medium py-1 px-3 rounded-full">
                    {job?.jobType}
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 font-medium py-1 px-3 rounded-full">
                    {job?.salary}
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
