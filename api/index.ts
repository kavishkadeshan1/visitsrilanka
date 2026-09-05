import app from '../server/index';

// Export handler function for Vercel Serverless Function
export default function handler(req: any, res: any) {
  return app(req, res);
}
