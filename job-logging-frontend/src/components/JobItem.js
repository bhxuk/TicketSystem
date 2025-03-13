import React, { useState } from 'react';
import { updateJob } from '../services/api';
import NotesSection from './NotesSection';

const JobItem = ({ job, onJobUpdated }) => {
    const [status, setStatus] = useState(job.status);
    const [showNotes, setShowNotes] = useState(false);

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        await updateJob(job.id, { status: newStatus });
        onJobUpdated();
    };

    return (
        <>
            <tr>
                <td>{job.works_number}</td>
                <td>{job.site_description}</td>
                <td>{job.engineers}</td>
                <td>
                    <select value={status} onChange={handleStatusChange}>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Waiting">Waiting</option>
                        <option value="Closed">Closed</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Major">Major</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <button onClick={() => setShowNotes(!showNotes)}>📄 Notes</button>
                </td>
            </tr>
            {showNotes && (
                <tr>
                    <td colSpan="4">
                        <NotesSection jobId={job.id} />
                    </td>
                </tr>
            )}
        </>
    );
};

export default JobItem;
