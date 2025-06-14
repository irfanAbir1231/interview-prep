"use client";
import { useState } from "react";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    title: "Frontend Developer",
    location: "San Francisco, CA",
    bio: "Passionate about building beautiful UIs and delightful user experiences.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  });
  const [form, setForm] = useState(profile);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(form);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center py-16 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full animate-fade-in border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={profile.avatar}
              alt="avatar"
              className="w-36 h-36 rounded-full border-4 border-purple-400 shadow-lg object-cover"
            />
            <span className="absolute bottom-2 right-2 bg-green-400 border-2 border-white w-6 h-6 rounded-full block"></span>
          </div>
          <h2 className="mt-4 text-4xl font-bold text-gray-800">
            {profile.name}
          </h2>
          <p className="text-purple-600 font-medium text-lg">{profile.title}</p>
          <p className="text-gray-500 text-base">{profile.location}</p>
        </div>
        <div className="mb-8 text-center">
          <p className="text-gray-700 italic text-lg">{profile.bio}</p>
        </div>
        {editing ? (
          <div className="space-y-4">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
            />
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
            />
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Bio"
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-purple-700"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-full flex flex-col items-center space-y-2 mb-4">
              <span className="text-gray-600 text-base">
                <b>Email:</b> {profile.email}
              </span>
              <span className="text-gray-600 text-base">
                <b>Title:</b> {profile.title}
              </span>
              <span className="text-gray-600 text-base">
                <b>Location:</b> {profile.location}
              </span>
            </div>
            <button
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-purple-700 transition-all"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
