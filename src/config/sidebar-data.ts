import {
  IconDashboard,
  IconUsers,
  IconCalendar,
  IconFileText,
  IconWallet,
  IconChecklist,
  IconSettings,
  IconHelp,
  IconSearch,
  IconReport,
  IconFileInvoice,
  IconUser,
} from "@tabler/icons-react";

export type UserRole = "ADMIN" | "EMPLOYEE";

export const getSidebarData = (role: UserRole) => ({
  user: {
    name: "Urvil Patel",
    email: "urvil@example.com",
    avatar: "/avatars/user.jpg",
  },

  navMain:
    role === "ADMIN"
      ? [
          {
            title: "Dashboard",
            url: "/dashboard/admin",
            icon: IconDashboard,
          },
          {
            title: "Employees",
            url: "/dashboard/employees",
            icon: IconUsers,
          },
          {
            title: "Attendance",
            url: "/dashboard/attendance",
            icon: IconCalendar,
          },
          {
            title: "Leave Approvals",
            url: "/dashboard/leaves/approvals",
            icon: IconChecklist,
          },
          {
            title: "Payroll",
            url: "/dashboard/payroll/manage",
            icon: IconWallet,
          },
        ]
      : [
          {
            title: "Dashboard",
            url: "/dashboard",
            icon: IconDashboard,
          },
          {
            title: "My Profile",
            url: "/dashboard/profile",
            icon: IconUser,
          },
          {
            title: "Attendance",
            url: "/dashboard/attendance",
            icon: IconCalendar,
          },
          {
            title: "Leaves",
            url: "/dashboard/leaves",
            icon: IconFileText,
          },
          {
            title: "Payroll",
            url: "/dashboard/payroll",
            icon: IconWallet,
          },
        ],

  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "Help",
      url: "/dashboard/help",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "/dashboard/search",
      icon: IconSearch,
    },
  ],

  documents:
    role === "ADMIN"
      ? [
          {
            name: "Attendance Report",
            url: "/dashboard/reports/attendance",
            icon: IconReport,
          },
          {
            name: "Salary Slips",
            url: "/dashboard/reports/salary",
            icon: IconFileInvoice,
          },
        ]
      : [
          {
            name: "My Salary Slips",
            url: "/dashboard/payroll/slips",
            icon: IconFileInvoice,
          },
        ],
});
