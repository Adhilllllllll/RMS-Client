import React, { useState, useEffect } from "react";
import api from "../../api/axios";

const NotesTemplates = () => {
    const [activeTab, setActiveTab] = useState("notes");

    // Notes state
    const [notes, setNotes] = useState([]);
    const [notesLoading, setNotesLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [noteForm, setNoteForm] = useState({ studentId: "", title: "", content: "" });
    const [noteFile, setNoteFile] = useState(null);
    const [noteSaving, setNoteSaving] = useState(false);
    const [editingNote, setEditingNote] = useState(null);

    // Templates state
    const [templates, setTemplates] = useState([]);
    const [templatesLoading, setTemplatesLoading] = useState(false);
    const [templateForm, setTemplateForm] = useState({ name: "", description: "", criteria: [] });
    const [criterionInput, setCriterionInput] = useState("");
    const [templateSaving, setTemplateSaving] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);

    useEffect(() => {
        fetchNotes();
        fetchTemplates();
        fetchStudents();
    }, []);

    /* ======== NOTES FUNCTIONS ======== */
    const fetchNotes = async () => {
        try {
            setNotesLoading(true);
            const res = await api.get("/advisor/notes");
            setNotes(res.data.notes || []);
        } catch (err) {
            console.error("Failed to fetch notes:", err);
        } finally {
            setNotesLoading(false);
        }
    };

    const fetchStudents = async () => {
        try {
            const res = await api.get("/advisor/students");
            setStudents(res.data.students || []);
        } catch (err) {
            console.error("Failed to fetch students:", err);
        }
    };

    const handleNoteSubmit = async (e) => {
        e.preventDefault();
        if (!noteForm.studentId || !noteForm.title || !noteForm.content) {
            alert("Please fill in all required fields");
            return;
        }

        try {
            setNoteSaving(true);
            const formData = new FormData();
            formData.append("studentId", noteForm.studentId);
            formData.append("title", noteForm.title);
            formData.append("content", noteForm.content);
            if (noteFile) formData.append("attachment", noteFile);

            if (editingNote) {
                await api.put(`/advisor/notes/${editingNote._id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            } else {
                await api.post("/advisor/notes", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }

            setNoteForm({ studentId: "", title: "", content: "" });
            setNoteFile(null);
            setEditingNote(null);
            fetchNotes();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to save note");
        } finally {
            setNoteSaving(false);
        }
    };

    const handleEditNote = (note) => {
        setEditingNote(note);
        setNoteForm({
            studentId: note.studentId?._id || "",
            title: note.title,
            content: note.content,
        });
        setNoteFile(null);
    };

    const handleDeleteNote = async (id) => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;
        try {
            await api.delete(`/advisor/notes/${id}`);
            fetchNotes();
        } catch (err) {
            alert("Failed to delete note");
        }
    };

    const cancelNoteEdit = () => {
        setEditingNote(null);
        setNoteForm({ studentId: "", title: "", content: "" });
        setNoteFile(null);
    };

    /* ======== TEMPLATES FUNCTIONS ======== */
    const fetchTemplates = async () => {
        try {
            setTemplatesLoading(true);
            const res = await api.get("/advisor/templates");
            setTemplates(res.data.templates || []);
        } catch (err) {
            console.error("Failed to fetch templates:", err);
        } finally {
            setTemplatesLoading(false);
        }
    };

    const handleTemplateSubmit = async (e) => {
        e.preventDefault();
        if (!templateForm.name) {
            alert("Template name is required");
            return;
        }

        try {
            setTemplateSaving(true);
            if (editingTemplate) {
                await api.put(`/advisor/templates/${editingTemplate._id}`, templateForm);
            } else {
                await api.post("/advisor/templates", templateForm);
            }
            setTemplateForm({ name: "", description: "", criteria: [] });
            setEditingTemplate(null);
            fetchTemplates();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to save template");
        } finally {
            setTemplateSaving(false);
        }
    };

    const addCriterion = () => {
        if (!criterionInput.trim()) return;
        if (templateForm.criteria.includes(criterionInput.trim())) return;
        setTemplateForm({ ...templateForm, criteria: [...templateForm.criteria, criterionInput.trim()] });
        setCriterionInput("");
    };

    const removeCriterion = (criterion) => {
        setTemplateForm({ ...templateForm, criteria: templateForm.criteria.filter(c => c !== criterion) });
    };

    const handleEditTemplate = (template) => {
        setEditingTemplate(template);
        setTemplateForm({
            name: template.name,
            description: template.description || "",
            criteria: template.criteria || [],
        });
    };

    const handleDeleteTemplate = async (id) => {
        if (!window.confirm("Are you sure you want to delete this template?")) return;
        try {
            await api.delete(`/advisor/templates/${id}`);
            fetchTemplates();
        } catch (err) {
            alert("Failed to delete template");
        }
    };

    const cancelTemplateEdit = () => {
        setEditingTemplate(null);
        setTemplateForm({ name: "", description: "", criteria: [] });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Notes & Templates</h2>
                <p className="text-slate-500">Manage your private notes and scoring templates</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200">
                <button
                    onClick={() => setActiveTab("notes")}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "notes" ? "border-green-600 text-green-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                >
                    Notes
                </button>
                <button
                    onClick={() => setActiveTab("templates")}
                    className={`px-4 py-2 text-sm font-medium ml-4 border-b-2 transition-colors ${activeTab === "templates" ? "border-green-600 text-green-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                >
                    Templates
                </button>
            </div>

            {/* Notes Tab */}
            {activeTab === "notes" && (
                <div className="space-y-6">
                    {/* Note Form */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="font-semibold text-slate-900 mb-4">{editingNote ? "Edit Note" : "Create Note"}</h3>
                        <form onSubmit={handleNoteSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Student</label>
                                <select
                                    value={noteForm.studentId}
                                    onChange={(e) => setNoteForm({ ...noteForm, studentId: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                >
                                    <option value="">Select a student...</option>
                                    {students.map((s) => (
                                        <option key={s._id} value={s._id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={noteForm.title}
                                    onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                                    placeholder="e.g., Mid-term Progress Check"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Note</label>
                                <textarea
                                    value={noteForm.content}
                                    onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
                                    placeholder="Write your note here..."
                                    rows={4}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Attach File (Optional)</label>
                                <input
                                    type="file"
                                    onChange={(e) => setNoteFile(e.target.files[0])}
                                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                    accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.zip"
                                />
                                <p className="text-xs text-slate-400 mt-1">Allowed: PDF, DOC, PPT, Images, ZIP</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    disabled={noteSaving}
                                    className="flex-1 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50"
                                >
                                    {noteSaving ? "Saving..." : (editingNote ? "Update Note" : "Save Note")}
                                </button>
                                {editingNote && (
                                    <button type="button" onClick={cancelNoteEdit} className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Notes List */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-4 border-b border-slate-200">
                            <h3 className="font-semibold text-slate-900">Your Notes</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {notesLoading ? (
                                <div className="p-6 text-center text-slate-400">Loading...</div>
                            ) : notes.length === 0 ? (
                                <div className="p-6 text-center text-slate-400">No notes yet</div>
                            ) : (
                                notes.map((note) => (
                                    <div key={note._id} className="p-4 hover:bg-slate-50">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-green-600">{note.studentId?.name || "Student"}</p>
                                                <h4 className="font-semibold text-slate-900">{note.title}</h4>
                                                <p className="text-xs text-slate-400 mt-0.5">{new Date(note.createdAt).toLocaleDateString()}</p>
                                                <p className="text-sm text-slate-600 mt-2 line-clamp-2">{note.content}</p>
                                                {note.attachmentName && (
                                                    <a href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${note.attachmentPath}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 mt-2 hover:underline">
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                                        {note.attachmentName}
                                                    </a>
                                                )}
                                            </div>
                                            <div className="flex gap-2 ml-4">
                                                <button onClick={() => handleEditNote(note)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                </button>
                                                <button onClick={() => handleDeleteNote(note._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Templates Tab */}
            {activeTab === "templates" && (
                <div className="space-y-6">
                    {/* Template Form */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="font-semibold text-slate-900 mb-4">{editingTemplate ? "Edit Scoring Template" : "Create Scoring Template"}</h3>
                        <form onSubmit={handleTemplateSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Template Name</label>
                                <input
                                    type="text"
                                    value={templateForm.name}
                                    onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                                    placeholder="e.g., Code Review Template"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea
                                    value={templateForm.description}
                                    onChange={(e) => setTemplateForm({ ...templateForm, description: e.target.value })}
                                    placeholder="Template description..."
                                    rows={3}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Scoring Criteria</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={criterionInput}
                                        onChange={(e) => setCriterionInput(e.target.value)}
                                        placeholder="Add criterion..."
                                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCriterion())}
                                    />
                                    <button type="button" onClick={addCriterion} className="px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg text-sm font-medium">
                                        + Add Another Criterion
                                    </button>
                                </div>
                                {templateForm.criteria.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {templateForm.criteria.map((c, idx) => (
                                            <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                                                {c}
                                                <button type="button" onClick={() => removeCriterion(c)} className="ml-1 text-green-600 hover:text-green-800">×</button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    disabled={templateSaving}
                                    className="flex-1 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50"
                                >
                                    {templateSaving ? "Saving..." : (editingTemplate ? "Update Template" : "Save Template")}
                                </button>
                                {editingTemplate && (
                                    <button type="button" onClick={cancelTemplateEdit} className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Templates List */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-4 border-b border-slate-200">
                            <h3 className="font-semibold text-slate-900">Your Templates</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {templatesLoading ? (
                                <div className="p-6 text-center text-slate-400">Loading...</div>
                            ) : templates.length === 0 ? (
                                <div className="p-6 text-center text-slate-400">No templates yet</div>
                            ) : (
                                templates.map((template) => (
                                    <div key={template._id} className="p-4 hover:bg-slate-50">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-slate-900">{template.name}</h4>
                                                        <p className="text-xs text-slate-500">{template.criteria?.length || 0} criteria</p>
                                                    </div>
                                                </div>
                                                {template.criteria?.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-3 ml-13">
                                                        {template.criteria.map((c, idx) => (
                                                            <span key={idx} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">{c}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEditTemplate(template)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                </button>
                                                <button onClick={() => handleDeleteTemplate(template._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotesTemplates;
