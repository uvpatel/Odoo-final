import { pgTable, uuid, varchar, integer } from "drizzle-orm/pg-core";
import { analyticalAccounts } from "./accounting";
import { products } from "./products";

export const autoAnalyticalModels = pgTable("auto_analytical_models", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    analyticalAccountId: uuid("analytical_account_id").references(() => analyticalAccounts.id).notNull(),
    // Criteria: Simple for now - if product matches, use this account
    matchProductId: uuid("match_product_id").references(() => products.id),
    matchCategory: varchar("match_category", { length: 100 }), // e.g. "Wood"
    priority: integer("priority").default(0),
});
