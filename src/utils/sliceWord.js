export default function sliceWord(str, maxLen = 100) {
  if (str.length > maxLen) {
    return str.slice(0, maxLen) + '...';
  }
  return str;
}
