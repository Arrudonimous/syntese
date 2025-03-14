export default function wordsCount(str) {
  const words = str.trim().split(/\s+/);
  return words.length === 1 && words[0] === "" ? 0 : words.length;
}