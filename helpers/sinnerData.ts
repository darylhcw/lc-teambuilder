import { EGO_RARITIES, IdentityData, EgoData } from "@/types/data";

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
    return `sinners/${sinner}/ego/${ego.filename}.webp`;
  }

  const egoName = ego.name.toLowerCase().trim();
  return `sinners/${sinner}/ego/${egoName}.webp`;
}

function getSinnerIdSrcImg(id: IdentityData) {
  const sinner = sinnerNumberToName(id.sinner);

  // Special case for some egos with chars unusable in filenames.
  if (id.filename) {
    return `sinners/${sinner}/identities/${id.filename}.webp`;
  }

  const idName = id.name.toLocaleLowerCase().trim();
  return `sinners/${sinner}/identities/${idName}.webp`;
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

function egoSort(egoA: EgoData, egoB: EgoData) {
  if (!egoA && !egoB) return 0;
  if (!egoA) return 1;
  if (!egoB) return -1;

  if (egoA.sinner < egoB.sinner) return -1;
  if (egoB.sinner < egoA.sinner) return 1;

  const rarA = EGO_RARITIES.indexOf(egoA.rarity);
  const rarB = EGO_RARITIES.indexOf(egoB.rarity);
  if (rarA < rarB) return -1;
  if (rarB < rarA) return 1;

  return 0;
}

function idSort(idA: IdentityData, idB: IdentityData) {
  if (!idA && !idB) return 0;
  if (!idA) return 1;
  if (!idB) return -1;

  if (idA.sinner < idB.sinner) return -1;
  if (idB.sinner < idA.sinner) return 1;

  if (idA.rarity < idB.rarity) return -1;
  if (idB.rarity < idA.rarity) return 1;

  return idA.name.localeCompare(idB.name);
}


export {
  sinnerNumberToName,
  getSinnerEgoSrcImg, getSinnerIdSrcImg,
  identityEquals, egoEquals,
  egoSort, idSort,
}