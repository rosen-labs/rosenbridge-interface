export const blueTemplate = "rgba(31, 31, 65, ops)";
export const pinkTemplate = "rgba(212, 45, 111, ops)";

export const withOpacity = (colorTemplate: string, opacity: number): string => {
  return colorTemplate.replace("ops", `${opacity}`);
};

export const colors = {
  blue: withOpacity(blueTemplate, 1),
  darkBlue: withOpacity(blueTemplate, 1),
  lightBlue: withOpacity(blueTemplate, 0.07),
  fadedBlue: withOpacity(blueTemplate, 0.7),
  pink: withOpacity(pinkTemplate, 1),
  fadedPink: withOpacity(pinkTemplate, 0.7),
};
