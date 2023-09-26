export const copyTextToClipboard = (text: string) => {
  try {
    navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    return false;
  }
};
