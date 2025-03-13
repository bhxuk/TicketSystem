import React, { useEffect, useState } from "react";
import { getJobs } from "../services/api";

const JobList = ({ refresh, setSelectedJob, filter }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, [refresh]);

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const filteredJobs = jobs.filter(job => filter === "All" || job.status === filter);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 overflow-auto max-h-[60vh]">
      <h2 className="text-xl font-semibold mb-4">Job List</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Works Number</th>
            <th className="p-2">Site</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.length === 0 ? (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-500">
                No jobs available.
              </td>
            </tr>
          ) : (
            filteredJobs.map((job) => (
              <tr
                key={job.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedJob(job)}
              >
                <td className="p-2">{job.works_number}</td>
                <td className="p-2">{job.site_description}</td>
                <td className="p-2">{job.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
