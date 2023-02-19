import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { serverRequests } from "requests";
import { serverErrorHandler } from "helpers";
import { ILocation } from "types";

type ResponseData =
  | ILocation
  | {
      message?: string;
      error?: string;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const token = await getToken({ req });
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const data = await serverRequests.deleteLocation(Number(id), token?.accessToken as string);
      res.status(201).send(data);
    } catch (err) {
      serverErrorHandler(err, res);
    }
  }
}
