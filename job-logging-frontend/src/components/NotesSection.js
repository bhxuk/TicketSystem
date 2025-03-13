import React, { useState, useEffect } from 'react';
import { addNote, getNotes } from '../services/api';

const NotesSection = ({ jobId }) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const data = await getNotes(jobId);
            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const handleAddNote = async () => {
        if (!newNote.trim()) return;
        await addNote(jobId, newNote);
        fetchNotes(); // Reload notes after adding
        setNewNote("");
    };

    return (
        <div>
            <h3>Job Notes</h3>
            <ul>
                {notes.map((note, index) => (
                    <li key={index}>
                        <strong>{note.timestamp}:</strong> {note.note}
                    </li>
                ))}
            </ul>
            <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
            />
            <button onClick={handleAddNote}>Add Note</button>
        </div>
    );
};

export default NotesSection;
