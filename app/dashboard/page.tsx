"use client";

import { useState } from "react";
import {
  Menu,
  Users,
  Settings,
  FileText,
  Home,
  Bell,
  LogOut,
  ChevronDown,
} from "lucide-react";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-gray-800 bg-opacity-90 backdrop-blur-md transition-all duration-300 flex flex-col z-10`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-700">
          <span className={`font-bold text-lg ${sidebarOpen ? "block" : "hidden"}`}>
            Admin Panel
          </span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-md hover:bg-gray-700"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2">
          <a className="flex items-center px-2 py-2 rounded-lg hover:bg-gray-700 transition">
            <Home size={18} />
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </a>
          <a className="flex items-center px-2 py-2 rounded-lg hover:bg-gray-700 transition">
            <Users size={18} />
            {sidebarOpen && <span className="ml-3">Users</span>}
          </a>
          <a className="flex items-center px-2 py-2 rounded-lg hover:bg-gray-700 transition">
            <FileText size={18} />
            {sidebarOpen && <span className="ml-3">Reports</span>}
          </a>
          <a className="flex items-center px-2 py-2 rounded-lg hover:bg-gray-700 transition">
            <Settings size={18} />
            {sidebarOpen && <span className="ml-3">Settings</span>}
          </a>
          <a className="flex items-center px-2 py-2 rounded-lg hover:bg-gray-700 transition mt-auto">
            <LogOut size={18} />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-gray-900 bg-opacity-90 backdrop-blur-md shadow px-6 h-16">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-700 transition">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 px-2 py-1 rounded-lg transition">
              <div className="w-8 h-8 rounded-full bg-gray-600" />
              <span className="text-white font-medium">Admin</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-gray-800 rounded-xl p-5 shadow-xl flex flex-col hover:shadow-2xl transition">
              <span className="text-gray-400">Total Users</span>
              <span className="text-2xl font-bold mt-2">1,245</span>
            </div>
            <div className="bg-gray-800 rounded-xl p-5 shadow-xl flex flex-col hover:shadow-2xl transition">
              <span className="text-gray-400">Active Sessions</span>
              <span className="text-2xl font-bold mt-2">342</span>
            </div>
            <div className="bg-gray-800 rounded-xl p-5 shadow-xl flex flex-col hover:shadow-2xl transition">
              <span className="text-gray-400">Reports</span>
              <span className="text-2xl font-bold mt-2">87</span>
            </div>
            <div className="bg-gray-800 rounded-xl p-5 shadow-xl flex flex-col hover:shadow-2xl transition">
              <span className="text-gray-400">Revenue</span>
              <span className="text-2xl font-bold mt-2">$12,450</span>
            </div>
          </div>

          {/* Table */}
          <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                <tr>
                  <td className="px-6 py-4 text-white">John Doe</td>
                  <td className="px-6 py-4 text-white">john@example.com</td>
                  <td className="px-6 py-4 text-white">Admin</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full bg-green-600 text-black text-xs font-semibold">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button className="text-blue-500 hover:text-blue-400">Edit</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-white">Jane Smith</td>
                  <td className="px-6 py-4 text-white">jane@example.com</td>
                  <td className="px-6 py-4 text-white">Editor</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full bg-yellow-500 text-black text-xs font-semibold">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button className="text-blue-500 hover:text-blue-400">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
