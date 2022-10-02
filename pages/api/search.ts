import type { NextApiRequest, NextApiResponse } from "next";
import { getNewSearchStories } from "../../utils/firebase.utils";
import { Story } from "../../utils/types.utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Story[]>
) {
  let { tags } = req.query as { tags: string[] };
  if (typeof tags === "string") {
    tags = [tags];
  }
  const oldStoriesId = JSON.parse(req.body) as string[];

  const newStories = await getNewSearchStories(oldStoriesId, tags);
  res.status(200).json(newStories);
}
