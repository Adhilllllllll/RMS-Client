import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchMyAvailability,
    addAvailability,
    removeAvailability,
} from "../../features/availability/availabilitySlice";
import Loader from "../../components/Loader";

// Map day names to numbers (backend expects 0-6)
const DAYS = [
    { value: 0, label: "Sunday" },
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
];

// Convert 24h time (HH:MM) to 12h format with AM/PM
const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
};

const Availability = () => {
    const dispatch = useDispatch();
    const { list, loading } = useSelector((state) => state.availability);
    const [formData, setFormData] = useState({
        dayOfWeek: 1, // Default to Monday
        startTime: "",
        endTime: "",
    });

    useEffect(() => {
        dispatch(fetchMyAvailability());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "dayOfWeek" ? Number(value) : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.startTime || !formData.endTime) return;
        dispatch(addAvailability(formData));
        setFormData({ ...formData, startTime: "", endTime: "" });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this slot?")) {
            dispatch(removeAvailability(id));
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Manage Availability</h2>
                <p className="text-slate-500">Set your weekly recurring slots.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ADD FORM */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Add Slot</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Day</label>
                                <select name="dayOfWeek" value={formData.dayOfWeek} onChange={handleChange} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-purple-500 focus:outline-none">
                                    {DAYS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Start</label>
                                    <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-purple-500 focus:outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">End</label>
                                    <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-purple-500 focus:outline-none" required />
                                </div>
                            </div>
                            <button type="submit" disabled={loading} className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg text-sm shadow-sm transition-colors flex justify-center items-center">
                                {loading ? "Adding..." : "Add Slot"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* TABLE */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col min-h-[400px]">
                        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-xl">
                            <h3 className="font-bold text-slate-900">Current Slots</h3>
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">{list?.length || 0} Slots</span>
                        </div>
                        <div className="overflow-x-auto flex-1">
                            {loading && !list?.length ? <div className="flex h-40 items-center justify-center"><Loader /></div> :
                                list?.length === 0 ? <div className="p-8 text-center text-slate-400">No slots created yet.</div> :
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                                            <tr>
                                                <th className="px-6 py-3">Day</th>
                                                <th className="px-6 py-3">Start Time</th>
                                                <th className="px-6 py-3">End Time</th>
                                                <th className="px-6 py-3 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {list.map((slot) => (
                                                <tr key={slot._id} className="hover:bg-slate-50">
                                                    <td className="px-6 py-4 font-medium text-slate-900">{DAYS.find(d => d.value === slot.dayOfWeek)?.label || slot.dayOfWeek}</td>
                                                    <td className="px-6 py-4 text-slate-600">{formatTime(slot.startTime)}</td>
                                                    <td className="px-6 py-4 text-slate-600">{formatTime(slot.endTime)}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button onClick={() => handleDelete(slot._id)} className="text-red-500 hover:text-red-700 font-medium text-xs bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded transition-colors">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Availability;
