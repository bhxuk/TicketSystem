import React, { useState, useEffect } from "react";
import { addNote, getNotes } from "../services/api";

const JobDetails = ({ job }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Fetch Notes when job is selected
  useEffect(() => {
    fetchNotes();
  }, [job]);

  const fetchNotes = async () => {
    try {
      const data = await getNotes(job.id);
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    await addNote(job.id, newNote);
    fetchNotes(); // Reload notes after adding
    setNewNote("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Job Details</h2>
      <p className="mb-2"><strong>Works Number:</strong> {job.works_number}</p>
      <p className="mb-2"><strong>Site:</strong> {job.site_description}</p>
      <p className="mb-2"><strong>Engineers:</strong> {job.engineers}</p>
      <p className="mb-2"><strong>Account Manager:</strong> {job.account_manager}</p>
      <p className="mb-2"><strong>Status:</strong> {job.status}</p>
      <p className="mb-2"><strong>Hired Equipment:</strong> {job.hired_equipment}</p>

      {/* Notes Section */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Job Notes</h3>
        <ul className="bg-gray-100 p-2 rounded max-h-32 overflow-auto">
          {notes.length === 0 ? (
            <p className="text-gray-500">No notes yet. Add one below.</p>
          ) : (
            notes.map((note, index) => (
              <li key={index} className="p-2 border-b">{note.timestamp}: {note.note}</li>
            ))
          )}
        </ul>
        <textarea
          className="w-full p-2 mt-2 border rounded"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a note..."
        />
        <button
          className="mt-2 p-2 bg-blue-600 text-white rounded w-full hover:bg-blue-700 transition"
          onClick={handleAddNote}
        >
          Save Note
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
