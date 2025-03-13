import React, { useState } from "react";
import JobList from "./components/JobList";
import JobForm from "./components/JobForm";
import JobDetails from "./components/JobDetails";

const App = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [refreshJobs, setRefreshJobs] = useState(false);
  const [filter, setFilter] = useState("All");

  const handleJobAdded = () => {
    setRefreshJobs((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Left Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <button
          className={`w-full p-2 rounded mb-2 ${filter === "All" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
          onClick={() => setFilter("All")}
        >
          All Jobs
        </button>
        <button
          className={`w-full p-2 rounded mb-2 ${filter === "Open" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
          onClick={() => setFilter("Open")}
        >
          Open Jobs
        </button>
        <button
          className={`w-full p-2 rounded mb-2 ${filter === "In Progress" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
          onClick={() => setFilter("In Progress")}
        >
          In Progress
        </button>
        <button
          className={`w-full p-2 rounded mb-2 ${filter === "Completed" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">KPS Work & Job Tracking System</h1>
        <JobForm onJobAdded={handleJobAdded} />
        <JobList refresh={refreshJobs} setSelectedJob={setSelectedJob} filter={filter} />
      </div>

      {/* Right Panel */}
      <div className="w-1/4 bg-white p-4 shadow-lg overflow-auto border-l border-gray-300">
        {selectedJob ? (
          <JobDetails job={selectedJob} />
        ) : (
          <p className="text-gray-500 text-center">Select a job to view details</p>
        )}
      </div>
    </div>
  );
};

export default App;
