let enabled = true;

export const enum SupportLevel {
  none,
  ansi,
  ansi256,
}

let supportLevel: SupportLevel = SupportLevel.none;

export let options: any = {
  enabled,
  supportLevel,
};

function colour(
  start: number | string,
  end: number | string,
  level: SupportLevel = SupportLevel.ansi
) {
  const open = `\x1b[${start}m`;
  const close = `\x1b[${end}m`;
  const regex = new RegExp(`\\x1b\\[${end}m`, "g");

  return (str: string | number) => {
    return options.enabled && options.supportLevel >= level
      ? open + ("" + str).replace(regex, open) + close
      : "" + str;
  };
}

export function stripColours(str: string | number) {
  return ("" + str)
    .replace(/\x1b\[[0-9;]+m/g, "")
    .replace(/\x1b\]8;;.*?\x07(.*?)\x1b\]8;;\x07/g, (_, group) => group);
}

export const reset = colour(0, 0);
export const bold = colour(1, 22);
export const dim = colour(2, 22);
export const italic = colour(3, 23);
export const underline = colour(4, 24);
export const inverse = colour(7, 27);
export const hidden = colour(8, 28);
export const strikethrough = colour(9, 29);

export const black = colour(30, 39);
export const red = colour(31, 39);
export const green = colour(32, 39);
export const yellow = colour(33, 39);
export const blue = colour(34, 39);
export const magenta = colour(35, 39);
export const cyan = colour(36, 39);
export const white = colour(97, 39);
export const gray = colour(90, 39);

export const lightGray = colour(37, 39);
export const lightRed = colour(91, 39);
export const lightGreen = colour(92, 39);
export const lightYellow = colour(93, 39);
export const lightBlue = colour(94, 39);
export const lightMagenta = colour(95, 39);
export const lightCyan = colour(96, 39);

// background colors
export const bgBlack = colour(40, 49);
export const bgRed = colour(41, 49);
export const bgGreen = colour(42, 49);
export const bgYellow = colour(43, 49);
export const bgBlue = colour(44, 49);
export const bgMagenta = colour(45, 49);
export const bgCyan = colour(46, 49);
export const bgWhite = colour(107, 49);
export const bgGray = colour(100, 49);

export const bgLightRed = colour(101, 49);
export const bgLightGreen = colour(102, 49);
export const bgLightYellow = colour(103, 49);
export const bgLightBlue = colour(104, 49);
export const bgLightMagenta = colour(105, 49);
export const bgLightCyan = colour(106, 49);
export const bgLightGray = colour(47, 49);

const OSC = "\u001B]";
const BEL = "\u0007";
const SEP = ";";

export const ansi256 = (n: number) =>
  colour("38;5;" + n, 0, SupportLevel.ansi256);
export const ansi256Bg = (n: number) =>
  colour("48;5;" + n, 0, SupportLevel.ansi256);

export function link(text: string, url: string) {
  return options.enabled
    ? OSC + "8" + SEP + SEP + url + BEL + text + OSC + "8" + SEP + SEP + BEL
    : `${text} (\u200B${url}\u200B)`;
}
