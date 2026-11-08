/**
 * Lightweight filter for overly explicit / pornographic submissions.
 * Blocks hardcore sexual content; mild or non-sexual content is allowed.
 */

const EXPLICIT_PATTERNS: RegExp[] = [
  // English hardcore / porn terms
  /\b(porn|porno|xxx|nsfw|onlyfans)\b/i,
  /\b(fuck\s*(me|you|her|him|ing)?|fucking|fucked)\b/i,
  /\b(cock|dick|pussy|vagina|penis|clit|orgasm|cumming|ejaculat)\b/i,
  /\b(blowjob|handjob|deepthroat|anal\s*sex|gangbang|threesome)\b/i,
  /\b(nude|naked|sex\s*tape|hardcore|erotic\s*video)\b/i,
  // Traditional Chinese explicit
  /色情|A片|av片|黃片|成人片|限制級影片/i,
  /口交|肛交|內射|中出|射精|自慰|手淫|高潮|性愛影片/i,
  /裸體|全裸|露點|露陰|裸照|裸聊|約炮|援交/i,
  /鸡巴|陰莖|陰道|陰唇|陰蒂|乳房|奶子|乳頭|屁眼/i,
  /做愛做的事|打炮|操逼|操她|操他|插進去|抽插/i,
];

export function isOverlySexual(text: string): boolean {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return false;

  let hits = 0;
  for (const re of EXPLICIT_PATTERNS) {
    if (re.test(normalized)) {
      hits += 1;
      if (hits >= 1) return true;
    }
  }
  return false;
}
