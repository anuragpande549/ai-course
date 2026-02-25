import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const conn = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
const db = drizzle(conn);

async function main() {
    const res = await db.execute(sql`SELECT * FROM course_list LIMIT 1`);
    console.log(res);
}
main();
