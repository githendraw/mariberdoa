import type { Config } from 'drizzle-kit'

export default {
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  schemaFilter: ['mariberdoa'],
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://menuadmin:menupass123@localhost:5432/menuonline',
  },
} satisfies Config
