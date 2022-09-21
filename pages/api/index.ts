import type { NextApiRequest, NextApiResponse } from "next";
import { getNewStories } from "../../utils/firebase.utils";
import { Story } from "../../utils/types.utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Story[]>
) {
  const oldStoriesId = JSON.parse(req.body) as string[];
  const newStories = await getNewStories(oldStoriesId);
  res.status(200).json(newStories);
}
