import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class HttpResponse {
  static ok = (
    res: Response,
    data: { [x: string]: any } | { [x: string]: any }[],
    message: string,
    status = HttpStatus.OK,
  ) => {
    return res.status(status).json({ data, message });
  };
  static created = (
    res: Response,
    data: { [x: string]: any },
    message: string,
    status = HttpStatus.CREATED,
  ) => {
    return res.status(status).json({ data, message });
  };
}
