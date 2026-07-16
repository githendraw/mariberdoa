import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL || 'postgresql://menuadmin:menupass123@localhost:5432/menuonline'
const client = postgres(connectionString)
export const db = drizzle(client, { schema })
