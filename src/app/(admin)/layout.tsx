// src/app/(dashboard)/admin/layout.tsx
import React from "react";
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <div className="admin-layout">
        <header className="flex justify-end items-center p-4 gap-4 h-16">
          {/* When signed out */}
          <SignedOut>
            <SignInButton />
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          {/* When signed in */}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>

        <div className="mb-6 border-b pb-4">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage users, departments, roles, and system settings
          </p>
        </div>


        {children}
      </div>
    </ClerkProvider>
  );
}
