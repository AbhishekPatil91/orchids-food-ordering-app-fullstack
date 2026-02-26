"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase";
import { CalendarDays, Clock, Users, MessageSquare, CheckCircle } from "lucide-react";
import AuthModal from "@/components/AuthModal";

export default function ReservePage() {
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    date: "",
    time: "",
    people: "",
    request: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Get today's date in YYYY-MM-DD format for min date validation
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setAuthOpen(true);
      return;
    }

    // Validate no past dates
    if (form.date < today) {
      setError("Please select a future date.");
      return;
    }

    // Validate minimum 1 person
    const numPeople = parseInt(form.people);
    if (!numPeople || numPeople < 1) {
      setError("Minimum 1 person required.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error: dbError } = await supabase.from("reservations").insert({
      user_id: user.id,
      reservation_date: form.date,
      reservation_time: form.time,
      num_people: numPeople,
      special_request: form.request || null,
    });

    setLoading(false);

    if (dbError) {
      setError("Failed to book table. Please try again.");
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Table Reserved!</h1>
        <p className="text-gray-500 mb-4">
          Your table has been booked for {form.people} {parseInt(form.people) === 1 ? "person" : "people"} on{" "}
          {new Date(form.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} at{" "}
          {form.time}.
        </p>
        <button
          onClick={() => { setSuccess(false); setForm({ date: "", time: "", people: "", request: "" }); }}
          className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition"
        >
          Book Another Table
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Reserve a Table</h1>
      <p className="text-gray-500 mb-8">
        Book your table in advance and enjoy a hassle-free dining experience.
      </p>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-6">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Date */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <CalendarDays className="w-4 h-4" /> Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              min={today}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Time */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4" /> Time
            </label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Number of People */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4" /> Number of People
          </label>
          <select
            name="people"
            value={form.people}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
          >
            <option value="">Select</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "person" : "people"}
              </option>
            ))}
          </select>
        </div>

        {/* Special Request */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4" /> Special Request (Optional)
          </label>
          <textarea
            name="request"
            value={form.request}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            placeholder="Any dietary restrictions, birthday celebration, etc."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition disabled:opacity-50"
        >
          {loading ? "Booking..." : user ? "Reserve Table" : "Sign in to Reserve"}
        </button>
      </form>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
