import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const avatar = "https://randomuser.me/api/portraits/women/44.jpg";

export default function AvatarDropdown() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-4 right-6 z-50" ref={avatarRef}>
      <img
        src={avatar}
        alt="avatar"
        className="w-12 h-12 rounded-full border-2 border-purple-400 shadow cursor-pointer object-cover"
        onClick={() => setDropdownOpen((v) => !v)}
      />
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100 animate-fade-in">
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800 font-medium"
            onClick={() => {
              setDropdownOpen(false);
              router.push("/profile");
            }}
          >
            Profile
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 font-medium"
            onClick={() => {
              setDropdownOpen(false); /* TODO: implement logout */
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
