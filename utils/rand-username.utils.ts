import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  NumberDictionary,
} from "unique-names-generator";

const numberDictionary = NumberDictionary.generate({ min: 1, max: 9999 });

const customConfig: Config = {
  dictionaries: [adjectives, ["anon"], numberDictionary],
  separator: "_",
};

export default function randUsername() {
  return uniqueNamesGenerator(customConfig);
}
