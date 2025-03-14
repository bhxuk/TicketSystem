import React, { useState } from 'react';
import { createJob } from '../services/api';

const JobForm = ({ onJobAdded }) => {
    const [jobData, setJobData] = useState({
        expected_start: '',
        deadline: '',
        works_number: '',
        site_number: '',
        site_description: '',
        engineers: '',
        account_manager: '',
        status: 'Open',
        hired_equipment: ''
    });

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedJob = {
                ...jobData,
                engineers: jobData.engineers.split(',').map(name => name.trim()),
                hired_equipment: jobData.hired_equipment.split(',').map(item => item.trim())
            };
            await createJob(formattedJob);
            onJobAdded();
            setJobData({
                expected_start: '',
                deadline: '',
                works_number: '',
                site_number: '',
                site_description: '',
                engineers: '',
                account_manager: '',
                status: 'Open',
                hired_equipment: ''
            });
        } catch (error) {
            console.error('Error adding job:', error);
        }
    };

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Add New Job</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <input className="border p-2 rounded" type="text" name="works_number" placeholder="Works Number" value={jobData.works_number} onChange={handleChange} required />
                <input className="border p-2 rounded" type="text" name="site_number" placeholder="Site Number" value={jobData.site_number} onChange={handleChange} required />
                <input className="border p-2 rounded col-span-2" type="text" name="site_description" placeholder="Site Description" value={jobData.site_description} onChange={handleChange} required />
                <input className="border p-2 rounded" type="text" name="expected_start" placeholder="Expected Start (YYYY-MM-DD HH:MM)" value={jobData.expected_start} onChange={handleChange} required />
                <input className="border p-2 rounded" type="text" name="deadline" placeholder="Deadline (YYYY-MM-DD)" value={jobData.deadline} onChange={handleChange} required />
                <input className="border p-2 rounded col-span-2" type="text" name="engineers" placeholder="Engineers (comma-separated)" value={jobData.engineers} onChange={handleChange} required />
                <input className="border p-2 rounded" type="text" name="account_manager" placeholder="Account Manager" value={jobData.account_manager} onChange={handleChange} required />
                <input className="border p-2 rounded col-span-2" type="text" name="hired_equipment" placeholder="Hired Equipment (comma-separated)" value={jobData.hired_equipment} onChange={handleChange} />
                <button className="bg-blue-500 text-white p-2 rounded col-span-2 hover:bg-blue-700 transition" type="submit">Add Job</button>
            </form>
        </div>
    );
};

export default JobForm;
