import type { Request } from 'express';
import type { HttpRequest } from '../types/http-request';

export default function adaptRequest<T>(req: Request): HttpRequest<T> {
  return Object.freeze({
    path: req.path,
    method: req.method,
    pathParams: req.params,
    queryParams: req.query,
    body: req.body,
    file: req.file,
    headers: {
      'Content-Type': req.get('Content-Type') ?? '',
      Referer: req.get('referer') ?? '',
      'User-Agent': req.get('User-Agent') ?? '',
    },
  });
}
