// /pages/api/hello.ts

import { NextApiRequest, NextApiResponse } from 'next';

// Define the API handler
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check the HTTP method (GET, POST, etc.)
  if (req.method === 'GET') {
    // Return a JSON response
    res.status(200).json({ message: 'Hello, World!' });
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
