import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllAvailability,
    fetchMyStatus,
    updateMyStatus,
    addAvailability,
    addBreak,
    removeAvailability,
} from "../../features/availability/availabilitySlice";

// Day configuration
const DAYS = [
    { value: 0, label: "Sunday", short: "Sun" },
    { value: 1, label: "Monday", short: "Mon" },
    { value: 2, label: "Tuesday", short: "Tue" },
    { value: 3, label: "Wednesday", short: "Wed" },
    { value: 4, label: "Thursday", short: "Thu" },
    { value: 5, label: "Friday", short: "Fri" },
    { value: 6, label: "Saturday", short: "Sat" },
];

// Weekdays for grid (Mon-Fri)
const WEEKDAYS = DAYS.filter(d => d.value >= 1 && d.value <= 5);

// Format time from 24h to 12h
const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
};

// Format time range for grid display (using 12h AM/PM)
const formatTimeRange = (start, end) => {
    return `${formatTime(start)} - ${formatTime(end)}`;
};

const Availability = () => {
    const dispatch = useDispatch();
    const { list, breaks, status, loading, error } = useSelector((state) => state.availability);

    // Form states
    const [slotForm, setSlotForm] = useState({
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        isRecurring: true,
    });

    const [breakForm, setBreakForm] = useState({
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        label: "",
    });

    // Fetch data on mount
    useEffect(() => {
        dispatch(fetchAllAvailability());
        dispatch(fetchMyStatus());
    }, [dispatch]);

    // Handle status change
    const handleStatusChange = (newStatus) => {
        dispatch(updateMyStatus(newStatus));
    };

    // Handle slot form changes
    const handleSlotChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSlotForm({
            ...slotForm,
            [name]: type === "checkbox" ? checked : (name === "dayOfWeek" ? Number(value) : value)
        });
    };

    // Handle break form changes
    const handleBreakChange = (e) => {
        const { name, value } = e.target;
        setBreakForm({
            ...breakForm,
            [name]: name === "dayOfWeek" ? Number(value) : value
        });
    };

    // Submit slot
    const handleAddSlot = (e) => {
        e.preventDefault();
        if (slotForm.dayOfWeek === "" || !slotForm.startTime || !slotForm.endTime) return;
        dispatch(addAvailability(slotForm));
        setSlotForm({ ...slotForm, startTime: "", endTime: "" });
    };

    // Submit break
    const handleAddBreak = (e) => {
        e.preventDefault();
        if (breakForm.dayOfWeek === "" || !breakForm.startTime || !breakForm.endTime) return;
        dispatch(addBreak(breakForm));
        setBreakForm({ dayOfWeek: "", startTime: "", endTime: "", label: "" });
    };

    // Delete slot or break
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this?")) {
            dispatch(removeAvailability(id));
        }
    };

    // Build weekly grid data
    const weeklyGrid = useMemo(() => {
        const grid = {};
        WEEKDAYS.forEach(day => {
            grid[day.value] = { slots: [], breaks: [] };
        });

        // Add slots
        list.forEach(slot => {
            if (grid[slot.dayOfWeek]) {
                grid[slot.dayOfWeek].slots.push(slot);
            }
        });

        // Add breaks
        breaks.forEach(breakItem => {
            if (grid[breakItem.dayOfWeek]) {
                grid[breakItem.dayOfWeek].breaks.push(breakItem);
            }
        });

        return grid;
    }, [list, breaks]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Availability & Status</h2>
                <p className="text-slate-500">Manage your availability and review schedule</p>
            </div>

            {/* Error Display */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Current Status Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Current Status</h3>
                <div className="grid grid-cols-3 gap-4">
                    {/* Available */}
                    <button
                        onClick={() => handleStatusChange("available")}
                        className={`p-4 rounded-lg border-2 transition-all ${status === "available"
                            ? "border-green-500 bg-green-50"
                            : "border-slate-200 hover:border-green-300"
                            }`}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className={`font-medium ${status === "available" ? "text-green-700" : "text-slate-600"}`}>
                                Available
                            </span>
                        </div>
                    </button>

                    {/* Busy */}
                    <button
                        onClick={() => handleStatusChange("busy")}
                        className={`p-4 rounded-lg border-2 transition-all ${status === "busy"
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-slate-200 hover:border-yellow-300"
                            }`}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <span className={`font-medium ${status === "busy" ? "text-yellow-700" : "text-slate-600"}`}>
                                Busy
                            </span>
                        </div>
                    </button>

                    {/* Do Not Disturb */}
                    <button
                        onClick={() => handleStatusChange("dnd")}
                        className={`p-4 rounded-lg border-2 transition-all ${status === "dnd"
                            ? "border-red-500 bg-red-50"
                            : "border-slate-200 hover:border-red-300"
                            }`}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span className={`font-medium ${status === "dnd" ? "text-red-700" : "text-slate-600"}`}>
                                Do Not Disturb
                            </span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Add Availability Slot Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Add Availability Slot</h3>
                <form onSubmit={handleAddSlot} className="flex flex-wrap items-end gap-4">
                    <div className="flex-1 min-w-[140px]">
                        <select
                            name="dayOfWeek"
                            value={slotForm.dayOfWeek}
                            onChange={handleSlotChange}
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-purple-500 focus:outline-none"
                        >
                            <option value="">Select Day</option>
                            {DAYS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                        </select>
                    </div>
                    <div className="w-32">
                        <input
                            type="time"
                            name="startTime"
                            value={slotForm.startTime}
                            onChange={handleSlotChange}
                            placeholder="--:--"
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="w-32">
                        <input
                            type="time"
                            name="endTime"
                            value={slotForm.endTime}
                            onChange={handleSlotChange}
                            placeholder="--:--"
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg text-sm transition-colors flex items-center gap-2"
                    >
                        <span>+</span> Add Slot
                    </button>
                </form>
                <label className="flex items-center gap-2 mt-3 text-sm text-slate-600">
                    <input
                        type="checkbox"
                        name="isRecurring"
                        checked={slotForm.isRecurring}
                        onChange={handleSlotChange}
                        className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                    />
                    Repeat weekly
                </label>
            </div>

            {/* Available Time Slots */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Available Time Slots</h3>
                {loading && list.length === 0 ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : list.length === 0 ? (
                    <p className="text-slate-400 text-sm">No availability slots created yet.</p>
                ) : (
                    <div className="space-y-3">
                        {list.map((slot) => (
                            <div key={slot._id} className="flex items-center justify-between p-3 bg-purple-50 border border-purple-100 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="font-medium text-slate-900">
                                            {DAYS.find(d => d.value === slot.dayOfWeek)?.label}: {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                        </span>
                                        {slot.isRecurring && (
                                            <span className="ml-2 text-xs text-purple-600">Recurring weekly</span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(slot._id)}
                                    className="text-red-500 hover:text-red-700 p-2"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Break Time Blocks Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Break Time Blocks</h3>
                <form onSubmit={handleAddBreak} className="flex flex-wrap items-end gap-4 mb-4">
                    <div className="flex-1 min-w-[140px]">
                        <select
                            name="dayOfWeek"
                            value={breakForm.dayOfWeek}
                            onChange={handleBreakChange}
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-yellow-500 focus:outline-none"
                        >
                            <option value="">Select Day</option>
                            {DAYS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                        </select>
                    </div>
                    <div className="w-32">
                        <input
                            type="time"
                            name="startTime"
                            value={breakForm.startTime}
                            onChange={handleBreakChange}
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-yellow-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="w-32">
                        <input
                            type="time"
                            name="endTime"
                            value={breakForm.endTime}
                            onChange={handleBreakChange}
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-yellow-500 focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg text-sm transition-colors flex items-center gap-2"
                    >
                        <span>+</span> Add Break
                    </button>
                </form>

                {/* Break List */}
                {breaks.length === 0 ? (
                    <p className="text-slate-400 text-sm">No break blocks created yet.</p>
                ) : (
                    <div className="space-y-3">
                        {breaks.map((breakItem) => (
                            <div key={breakItem._id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="font-medium text-slate-900">
                                            {DAYS.find(d => d.value === breakItem.dayOfWeek)?.label}: {formatTime(breakItem.startTime)} - {formatTime(breakItem.endTime)}
                                        </span>
                                        {breakItem.label && (
                                            <span className="ml-2 text-xs text-yellow-700">{breakItem.label}</span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(breakItem._id)}
                                    className="text-red-500 hover:text-red-700 p-2"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Weekly Availability Grid */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Weekly Availability Grid</h3>
                <div className="grid grid-cols-5 gap-4">
                    {WEEKDAYS.map((day) => (
                        <div key={day.value}>
                            <div className="text-sm font-semibold text-slate-600 mb-2">{day.label}</div>
                            <div className="space-y-2 min-h-[80px]">
                                {/* Availability Slots (Green) */}
                                {weeklyGrid[day.value]?.slots.map((slot) => (
                                    <div
                                        key={slot._id}
                                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-medium"
                                    >
                                        {formatTimeRange(slot.startTime, slot.endTime)}
                                    </div>
                                ))}
                                {/* Break Blocks (Yellow) */}
                                {weeklyGrid[day.value]?.breaks.map((breakItem) => (
                                    <div
                                        key={breakItem._id}
                                        className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded font-medium"
                                    >
                                        {formatTimeRange(breakItem.startTime, breakItem.endTime)}
                                    </div>
                                ))}
                                {/* Empty state */}
                                {weeklyGrid[day.value]?.slots.length === 0 && weeklyGrid[day.value]?.breaks.length === 0 && (
                                    <div className="text-xs text-slate-300">-</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Availability;
