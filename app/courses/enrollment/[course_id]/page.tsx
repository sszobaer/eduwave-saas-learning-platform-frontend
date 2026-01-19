"use client";

import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import { api } from "@/app/lib/axios";

interface PaymentFormData {
  cus_name: string;
  cus_email: string;
  cus_add1: string;
  cus_city: string;
  cus_country: string;
  cus_phone: string;
}

export default function EnrollmentPaymentPage() {
  const { user, loading } = useContext(AuthContext);
  const { course_id } = useParams() as { course_id: string };

  const [formData, setFormData] = useState<PaymentFormData>({
    cus_name: "",
    cus_email: "",
    cus_add1: "",
    cus_city: "",
    cus_country: "",
    cus_phone: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Auto-fill form when user data is available
  useEffect(() => {
    if (!loading && user) {
      setFormData({
        cus_name: user.full_name || "",
        cus_email: user.email || "",
        cus_add1: user.address || "N/A",
        cus_city: user.city || "N/A",
        cus_country: user.country || "Bangladesh",
        cus_phone: user.phone || "N/A",
      });
    }
  }, [loading, user]);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/login";
    }
  }, [loading, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!user || !course_id) {
      setError("Invalid user or course.");
      setSubmitting(false);
      return;
    }

    try {
      // Replace amount with your real course price
      const amount = 5000;

      const response = await api.post(
        "/payment/create",
        {
          userId: Number(user.user_id),
          courseId: Number(course_id),
          amount,
          ...formData,
        },
        { withCredentials: true }
      );

      // Backend returns GatewayPageURL as string
      const paymentUrl = response.data as string;

      if (!paymentUrl || !paymentUrl.startsWith("http")) {
        console.error("Payment backend response:", response.data);
        throw new Error("Payment URL not returned correctly");
      }

      // Redirect user to SSLCommerz
      window.location.href = paymentUrl;

    } catch (err: any) {
      console.error("Payment error:", err.response?.data || err.message);
      setError("Failed to start payment. Please check the form.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!course_id) return <p className="p-6 text-red-500">Invalid course.</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-[#0f172a] p-8 rounded-xl shadow-lg border border-white/10">
      <h2 className="text-2xl font-semibold text-white mb-6">Confirm Your Payment</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            name="cus_name"
            value={formData.cus_name}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-[#020617] border border-white/20 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="cus_email"
            value={formData.cus_email}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-[#020617] border border-white/20 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Address</label>
          <input
            type="text"
            name="cus_add1"
            value={formData.cus_add1}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-[#020617] border border-white/20 text-white"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-1">City</label>
            <input
              type="text"
              name="cus_city"
              value={formData.cus_city}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-[#020617] border border-white/20 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Country</label>
            <input
              type="text"
              name="cus_country"
              value={formData.cus_country}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-[#020617] border border-white/20 text-white"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Phone</label>
          <input
            type="text"
            name="cus_phone"
            value={formData.cus_phone}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-[#020617] border border-white/20 text-white"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition"
        >
          {submitting ? "Redirecting..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}
