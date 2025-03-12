import React, { useEffect, useState } from 'react';
import { getJobs } from '../services/api';

const JobList = ({ refresh }) => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, [refresh]); // Reload jobs when `refresh` changes

    const fetchJobs = async () => {
        try {
            const data = await getJobs();
            setJobs(data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    return (
        <div>
            <h2>Job List</h2>
            {jobs.length === 0 ? (
                <p>No jobs available. Add a new job.</p>
            ) : (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Works Number</th>
                            <th>Site</th>
                            <th>Engineers</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.id}>
                                <td>{job.works_number}</td>
                                <td>{job.site_description}</td>
                                <td>{job.engineers}</td>
                                <td>{job.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default JobList;
