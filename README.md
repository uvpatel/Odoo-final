# Budget Accounting System – Shiv Furniture 


npx drizzle-kit generate


```
CREATE TABLE IF NOT EXISTS "posts_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"age" integer NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts_table" ADD CONSTRAINT "posts_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

```

npx drizzle-kit migrate


npx drizzle-kit push




#### Relations
```
User → Quotations → Orders → Invoices → Payments
        ↓
     OrderItems → Reservations
        ↓
     Pickups → Returns

Vendor → Products → Variants → Attributes

```



Goal:
Create a clean, modern, and user-friendly ERP-style web application that manages purchases, sales, payments, and cost-center–wise budget tracking with real-time budget vs actual insights.

Users & Roles:
1. Admin (Business Owner)
   - Full access: create, edit, archive all master data
   - Record all transactions
   - Configure auto analytical models
   - View dashboards, reports, and charts

2. Customer (Portal User)
   - Login to customer portal
   - View own Sales Orders, Purchase Orders, Invoices, Bills
   - Download invoice/bill PDFs
   - Pay invoices online
   - Cannot see other customers’ data

Core Features to Implement:

1. Master Data Management (Admin only)
   - Contacts (customers & vendors)
   - Products (with categories)
   - Analytical Accounts (Cost Centers)
   - Budgets (period-based, revision tracking)
   - Auto Analytical Models (rule-based cost-center assignment)

2. Transaction Management
   - Sales Orders (SO)
   - Purchase Orders (PO)
   - Customer Invoices
   - Vendor Bills
   - Payments
   - Each transaction and invoice line must be linked to an Analytical Account (manual or automatic)

3. Auto Analytical Models
   - Rule-based logic such as:
     - Product category → Cost Center
     - Vendor/Customer → Cost Center
   - Automatically assign analytical accounts during invoice creation

4. Budget Accounting Logic
   - Budgets linked to Analytical Accounts and time periods
   - Actuals calculated automatically from posted invoices/bills
   - System must compute:
     - Budgeted amount
     - Actual amount
     - Remaining balance
     - Achievement percentage
     - Variance
   - Support budget revisions with history

5. Payment & Reconciliation Logic
   - Record payments against invoices
   - Automatically update payment status:
     - Not Paid
     - Partially Paid
     - Paid
   - Status based on total invoice amount vs total paid amount

6. Dashboards & Reports (Admin)
   - Budget vs Actual charts (bar/pie)
   - Cost-center-wise spending report
   - Budget achievement line report
   - Alerts for near or over-budget cost centers
   - Clear financial summary widgets

7. Customer Portal
   - Secure authentication
   - View & download own SO, PO, invoices, bills
   - Online invoice payment using a payment provider
   - Simple and clean UI

UI / UX Requirements:
- Modern, professional ERP-style UI
- Clean layouts, cards, tables, and charts
- Responsive design (desktop & tablet friendly)
- Easy navigation between:
  - Dashboard
  - Masters
  - Transactions
  - Budgets
  - Reports
  - Customer Portal
- Clear status indicators (Paid / Partial / Unpaid)
- Visual budget progress bars and charts

Technical Requirements:
- Next.js App Router
- Server Actions or API routes
- PostgreSQL database
- Drizzle ORM with type-safe schema
- Role-based access control
- Secure data isolation for customer portal

Deliverable:
A production-style, hackathon-ready Budget Accounting web application that demonstrates real-world ERP workflows: Purchases & Sales → Budgeting → Accounting → Payments → Financial Reports.



###
UUIDs (Universally Unique Identifiers) are used to generate globally unique identifiers without requiring a central authority or database coordination. They are critical for distributed systems, database primary keys, and microservices to ensure data integrity, prevent ID collisions during merging, and enhance security by making URLs non-enumerable. 


```
antigravity://Postman.postman-for-vscode?code=f15bc6cd32214f63184924b05bc1bf76ed45fc8289f20819422afddb2a3d46a1
```