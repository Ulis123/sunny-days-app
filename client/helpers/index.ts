import { AxiosError } from "axios";
import { NextApiResponse } from "next";

import { AppPages } from "types";

interface IAxiosData {
  message?: string;
  error?: string;
}

export const returnAxiosError = (error: AxiosError<IAxiosData>) => {
  return error.response?.data.message ?? error.response?.data.error ?? error.message;
};

export const serverErrorHandler = (err: unknown, res: NextApiResponse) => {
  if (err instanceof AxiosError) {
    if (err.response?.status === 401) {
      return res.redirect(AppPages.SIGN_IN);
    }

    return res.status(err.response?.status ?? 400).send(err.response?.data ?? err);
  }
  return res.status(400).send(err);
};
