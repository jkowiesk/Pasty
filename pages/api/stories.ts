import type { NextApiRequest, NextApiResponse } from "next";
import type { Story } from "../../utils/types.utils";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Story[]>
) {
  res.status(200).json({ name: "John Doe" });
}
