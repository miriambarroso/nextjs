// Create a PDF viewer API route

// Path: src/pages/api/pdf-viewer.ts
import axios from '@/utils/axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  axios
    .get(url as string, {
      responseType: 'arraybuffer',
    })
    .then((response) => {
      const buffer = Buffer.from(response.data, 'binary');
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Length', buffer.length);
      res.send(buffer);
    })
    .catch((error) => {
      res.status(error.response.status).send(error.message);
    });
}
