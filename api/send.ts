import type { VercelRequest, VercelResponse } from '@vercel/node';
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) return res.status(500).json({ error: 'Token not set' });
  const { to, messages } = req.body;
  const r = await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ to, messages })
  });
  return r.ok ? res.json({ success: true }) : res.status(500).json({ error: await r.text() });
}
