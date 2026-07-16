import { pgSchema, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core'

export const mariberdoa = pgSchema('mariberdoa')

export const categories = mariberdoa.table('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  icon: text('icon'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const doas = mariberdoa.table('doas', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  arabic: text('arabic').notNull(),
  latin: text('latin').notNull(),
  translation: text('translation').notNull(),
  source: text('source'),
  categoryId: uuid('category_id').notNull().references(() => categories.id),
  imageUrl: text('image_url'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
