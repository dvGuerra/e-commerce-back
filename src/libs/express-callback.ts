import type { Request, Response } from 'express';
import adaptRequest from './adapt-request';

export default function makeExpressCallback<T>(controller: any) {
  return async (req: Request, res: Response) => {
    const httpRequest = adaptRequest<T>(req);

    try {
      const { headers, statusCode, data } = await controller(httpRequest);

      if (headers) {
        res.set(headers);
      }

      res.type('json');
      res.status(statusCode).send(data);
    } catch (error) {
      res
        .status(500)
        .send({ success: false, message: 'An unknown error ocurred.' });
    }
  };
}
