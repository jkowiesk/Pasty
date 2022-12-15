export const BREAKPOINTS = {
  phone: 576,
  tablet: 960,
  laptop: 1440,
};

export const phoneAndSmaller = `(max-width: ${BREAKPOINTS.phone / 16}rem)`;

export const tabletAndSmaller = `(max-width: ${BREAKPOINTS.tablet / 16}rem)`;

export const laptopAndSmaller = `(max-width: ${BREAKPOINTS.laptop / 16}rem)`;

export const isMobile = "(pointer:coarse)";
