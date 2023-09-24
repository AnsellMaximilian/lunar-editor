export const getTranslateValues = (e: MouseEvent, moveValue: number) => {
  const x = (e.clientX * moveValue) / 250;
  const y = (e.clientY * moveValue) / 250;
  return { x, y };
};
