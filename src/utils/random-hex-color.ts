export const randomHexColor = () =>
  '#' +
  (0x1000000 + Math.random() * 0xffffff)
    .toString(16)
    .slice(0, 6)
