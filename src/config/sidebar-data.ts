import {
  LayoutDashboard ,
  Users,
  Box,
  ShoppingCart,
  FileOutput ,
  ClipboardList,
  Settings,
  HelpCircle,
  Search,
  BarChart2,
} from "lucide-react";

export type UserRole = "ADMIN" | "VENDOR" | "CUSTOMER";

export const getSidebarData = (role: UserRole) => ({
  user: {
    name: "Urvil Patel",
    email: "urvil@example.com",
    avatar: "/avatars/user.jpg",
  },

  navMain:
    role === "ADMIN"
      ? [
          { title: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard  },
          { title: "Vendors", url: "/dashboard/vendors", icon: Users },
          { title: "Products", url: "/dashboard/products", icon: Box },
          { title: "Orders", url: "/dashboard/orders", icon: ShoppingCart },
          { title: "Invoices", url: "/dashboard/invoices", icon: FileOutput  },
          { title: "Reservations", url: "/dashboard/reservations", icon: ClipboardList },
        ]
      : role === "VENDOR"
      ? [
          { title: "Dashboard", url: "/dashboard/vendor", icon: LayoutDashboard },
          { title: "My Products", url: "/dashboard/products", icon: Box },
          { title: "Orders", url: "/dashboard/orders", icon: ShoppingCart },
          { title: "Invoices", url: "/dashboard/invoices", icon: FileOutput },
          { title: "Reservations", url: "/dashboard/reservations", icon: ClipboardList },
        ]
      : [
          { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
          { title: "Browse Products", url: "/dashboard/products", icon: Box },
          { title: "My Orders", url: "/dashboard/orders", icon: ShoppingCart },
          { title: "My Invoices", url: "/dashboard/invoices", icon: FileOutput  },
          { title: "My Reservations", url: "/dashboard/reservations", icon: ClipboardList },
        ],

  navSecondary: [
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
    { title: "Help", url: "/dashboard/help", icon: HelpCircle },
    { title: "Search", url: "/dashboard/search", icon: Search },
  ],

  documents:
    role === "ADMIN"
      ? [
          { name: "Orders Report", url: "/dashboard/reports/orders", icon: BarChart2 },
          { name: "Revenue Report", url: "/dashboard/reports/revenue", icon: BarChart2 },
        ]
      : role === "VENDOR"
      ? [
          { name: "My Orders Report", url: "/dashboard/reports/orders", icon: BarChart2 },
          { name: "Earnings Report", url: "/dashboard/reports/revenue", icon: BarChart2 },
        ]
      : [{ name: "My Rentals Report", url: "/dashboard/reports/rentals", icon: BarChart2 }],
});
