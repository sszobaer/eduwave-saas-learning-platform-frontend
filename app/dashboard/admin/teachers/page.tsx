"use client";

import { useEffect, useState } from "react";
import { TeacherService } from "@/app/services/teacher.service";
import { Teacher } from "@/app/types/teacher.type";
import TeacherRow from "@/app/components/admin/teachers/TeacherRow";
import Topbar from "@/app/components/admin/Topbar";

export default function TeacherApprovalPage() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);

    const loadTeachers = async () => {
        setLoading(true);
        try {
            const data = await TeacherService.getPending();
            setTeachers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTeachers();
    }, []);

    if (loading) return <p className="p-6">Loading pending teachers...</p>;
    if (teachers.length === 0) return <p className="p-6">No pending teachers.</p>;

    return (
        <>
            <Topbar />
            <div className="rounded-xl m-6 overflow-hidden bg-gradient-to-br from-[#0b1220] to-[#020617]">
                <table className="w-full text-left">
                    <thead className="bg-black/40 text-gray-300">
                        <tr>
                            <th className="p-4">Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th className="text-right p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher) => (
                            <TeacherRow key={teacher.user_id} teacher={teacher} refresh={loadTeachers} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
