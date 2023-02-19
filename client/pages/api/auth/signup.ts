import type { NextApiRequest, NextApiResponse } from "next";

import { serverRequests } from "requests";
import { serverErrorHandler } from "helpers";
import { ISignUpResponse } from "types";

type ResponseData =
  | ISignUpResponse
  | {
      message?: string;
      error?: string;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === "POST") {
    try {
      const data = await serverRequests.signUp(req.body);
      res.status(201).send(data);
    } catch (err) {
      serverErrorHandler(err, res);
    }
  }
}
