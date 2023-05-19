import respondToForm from "@/respondToEnhancedForm";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { location, job, position, phone } = req.body;

  if (!location || !job || !position || !phone) {
    return respondToForm(req, res).redirect("confirm", 307);
  }

  const pos = "senior " + position;

  return respondToForm(req, res).data({ pos });
}
