"use client";

import { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/reduxStore/store";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state?.auth?.user) || {username: ''};

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch({ type: "auth/logout" });
    // redirect to login page
    router.push("/login");
    setOpen(false);
  };

  return (
    <div ref={menuRef} className="relative inline-block">
      {/* Avatar button */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-cente  gap-2 rounded-full bg-gray-200 p-2 hover:bg-gray-300"
      >
        <User className="w-6 h-6 text-gray-600" />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg border border-gray-200 z-50">
          {/* Header hiển thị username */}
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-center">
            <span className="text-sm text-gray-500">Signed in as</span>
            <span className="text-base font-semibold text-gray-800 pl-4">
              {user?.username}
            </span>
          </div>
          {/* Logout button */}
          <div
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-gray-700 text-base hover:bg-gray-100 rounded-md cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
