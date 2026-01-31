// src/app/(dashboard)/user/layout.tsx
import React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="user-layout">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
        <p className="text-sm text-gray-600">
          View your attendance, payslips, profile, and requests
        </p>
      </div>
      {children}
    </div>
  );
}