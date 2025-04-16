import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from 'uuidv7';


export const users = pgTable("users", {
  id: text('id')
        .primaryKey()
        .$defaultFn(() => uuidv7()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  avatarUrl: text("avatar_url"),
  role: text("role").default("user").notNull(),
  provider: text("provider").notNull(), // e.g., "google", "facebook"
  providerId: text("provider_id").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});