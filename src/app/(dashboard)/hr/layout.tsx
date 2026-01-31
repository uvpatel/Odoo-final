// src/app/(dashboard)/hr/layout.tsx
import React from "react";

export default function HRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="hr-layout">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">HR Dashboard</h1>
        <p className="text-sm text-gray-600">
          Manage employees, attendance, leaves, and payroll
        </p>
      </div>
      {children}
    </div>
  );
}