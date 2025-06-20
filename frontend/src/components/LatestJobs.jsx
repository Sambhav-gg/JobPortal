import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h1 className="text-4xl font-bold my-5 text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          Latest & Top
        </span>{" "}
        Job Openings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {allJobs.length <= 0 ? (
          <span className="text-gray-500 text-lg text-center col-span-full">
            No Job Available
          </span>
        ) : (
          allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
