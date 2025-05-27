import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: 'firehouse88',
  host: 'localhost',
  port: 5432,
  database: 'personal-website',
  max: 20
});

export default pool;
