import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { serverRequests } from "requests";
import { serverErrorHandler } from "helpers";
import { ILocationWithWeather } from "types";

type ResponseData =
  | ILocationWithWeather
  | ILocationWithWeather[]
  | {
      message?: string;
      error?: string;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const token = await getToken({ req });

  if (req.method === "GET") {
    try {
      const data = await serverRequests.getAllLocations(token?.accessToken as string);
      res.status(201).send(data);
    } catch (err) {
      serverErrorHandler(err, res);
    }
  }

  if (req.method === "POST") {
    try {
      const data = await serverRequests.createLocation(req.body, token?.accessToken as string);
      res.status(201).send(data);
    } catch (err) {
      serverErrorHandler(err, res);
    }
  }
}
