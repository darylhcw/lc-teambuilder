import { IdentityData, EgoData } from "@/types/data";

function sinnerNumberToName(number: number, caps: boolean=false) {
  switch(number) {
    case 1: return caps ? "Yi Sang" : "yi sang";
    case 2: return caps ? "Faust" : "faust";
    case 3: return caps ? "Don Quixote" : "don quixote";
    case 4: return caps ? "Ryoshu" : "ryoshu";
    case 5: return caps ? "Meursault" : "meursault";
    case 6: return caps ? "Hong Lu" : "hong lu";
    case 7: return caps ? "HeathCliff" :  "heathcliff";
    case 8: return caps ? "Ishmael" :  "ishmael";
    case 9: return caps ? "Rodion" :  "rodion";
    case 10: return caps ? "Dante" :  "dante";
    case 11: return caps ? "Sinclair" :  "sinclair";
    case 12: return caps ? "Outis" :  "outis";
    case 13: return caps ? "Gregor" :  "gregor";
  }
}

function getSinnerEgoSrcImg(ego: EgoData) {
  const sinner = sinnerNumberToName(ego.sinner);

  // Special case for some egos with chars unusable in filenames.
  if (ego.filename) {
    return `/sinners/${sinner}/ego/${ego.filename}.webp`;
  }

  const egoName = ego.name.toLowerCase();
  return `/sinners/${sinner}/ego/${egoName}.webp`;
}

function getSinnerIdSrcImg(id: IdentityData) {
  const sinner = sinnerNumberToName(id.sinner);

  // Special case for some egos with chars unusable in filenames.
  if (id.filename) {
    return `/sinners/${sinner}/identities/${id.filename}.webp`;
  }

  const idName = id.name.toLocaleLowerCase();
  return `/sinners/${sinner}/identities/${idName}.webp`;
}

function identityEquals(a?: IdentityData, b?: IdentityData) {
  if (!a || !b) return false;

  // TODO: Use ids instead of name compares
  return a.name === b.name;
}

function egoEquals(a?: EgoData, b?: EgoData) {
  if (!a || !b) return false;

  // TODO: Use ids instead of name compares
  return a.name === b.name;
}


export {
  sinnerNumberToName,
  getSinnerEgoSrcImg, getSinnerIdSrcImg,
  identityEquals, egoEquals,
}