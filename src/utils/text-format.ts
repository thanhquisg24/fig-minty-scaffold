export function formatShortTx(text: string) {
  if (text.length > 13) {
    return `${text.substring(0, 4)}...${text.substring(text.length - 8, text.length)}`;
  }
  return text;
}
