import { NextApiHandler } from "next";
import { Client } from "pg";
import { getToken } from "next-auth/jwt";

const handler: NextApiHandler = async (req, res) => {
  const token: any = await getToken({ req });
  if (!token) {
    res.status(401).end();
    return;
  }
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
    await client.query("UPDATE users SET role = 'ADMIN' WHERE id = $1", [
      token.userId,
    ]);
    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
  } finally {
    await client.end();
  }
};

export default handler;
