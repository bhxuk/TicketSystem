import React, { useState } from 'react';
import JobList from './components/JobList';
import JobForm from './components/JobForm';

function App() {
    const [refreshJobs, setRefreshJobs] = useState(false);

    const handleJobAdded = () => {
        setRefreshJobs(prev => !prev); // Toggle state to refresh JobList
    };

    return (
        <div>
            <h1>Job Logging System</h1>
            <JobForm onJobAdded={handleJobAdded} />
            <JobList refresh={refreshJobs} />
        </div>
    );
}

export default App;
