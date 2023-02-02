import { Story, UserSimple } from "../utils/types.utils";
import { StoryCardFull, StoryCardPreview } from "./story-cards.component";

type Props = {
  full?: boolean;
  story: Story;
  user: UserSimple;
  className?: any;
};

export default function StoryCard({ full, story, user, className }: Props) {
  if (user.username) {
    if (full) {
      return <StoryCardFull {...{ story, user, className }} />;
    } else {
      return <StoryCardPreview {...{ story, user, className }} />;
    }
  } else {
    return null;
  }
}
