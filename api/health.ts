export default function handler(req: any, res: any) {
  res.status(200).json({ 
    status: 'ok', 
    lineTokenConfigured: !!process.env.LINE_CHANNEL_ACCESS_TOKEN 
  });
}
