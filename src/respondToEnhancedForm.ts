import { NextApiRequest, NextApiResponse } from "next";

export const FORM_DATA_PARAM_PREFIX = "__data-";
export const FORM_PATH_INPUT_NAME = "__form-path";
export const ENHANCED_FORM_FETCH_HEADER = "x-enhanced-form-fetch";

type DataResponse = {
  type: "DATA";
  status: number;
  data: Record<string, unknown>;
};

type RedirectReponse = {
  type: "REDIRECT";
  location: string;
};

type ErrorResponse = {
  type: "ERROR";
  status: number;
  data: Record<string, unknown>;
};

export default function respondToEnhancedForm(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new EnhancedFormResponder(req, res);
}

export class EnhancedFormResponder {
  private req: NextApiRequest;
  private res: NextApiResponse;

  private isJsEnabled: boolean;
  private formPath: string;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;

    this.isJsEnabled = this.req.headers[ENHANCED_FORM_FETCH_HEADER] === "1";
    this.formPath = this.req.body[FORM_PATH_INPUT_NAME];
  }

  public async error(data: Record<string, string>, status = 400) {
    if (this.isJsEnabled) {
      return this.res
        .status(status)
        .setHeader("content-type", "application/json")
        .json({ type: "ERROR", data });
    } else {
      return this.res.redirect(
        307,
        `${this.formPath}?${buildPrefixedParams(data)}`
      );
    }
  }

  public async data(data: Record<string, string>, status = 200) {
    if (this.isJsEnabled) {
      return this.res
        .status(status)
        .setHeader("content-type", "application/json")
        .json({ type: "DATA", data });
    } else {
      return this.res.redirect(
        307,
        `${this.formPath}?${buildPrefixedParams(data)}`
      );
    }
  }

  public async redirect(location: string, status: number = 307) {
    if (this.isJsEnabled) {
      return this.res
        .status(200)
        .setHeader("content-type", "application/json")
        .json({ type: "REDIRECT", location, status });
    } else {
      return this.res.redirect(status, location);
    }
  }
}

function buildPrefixedParams(data: Record<string, string>) {
  const params = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    params.append(`${FORM_DATA_PARAM_PREFIX}${key}`, value);
  });

  return params.toString();
}
