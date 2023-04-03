import { IdentityData, EgoData } from "@/types/data";

function sinnerNumberToName(number: number) {
  switch(number) {
    case 1: return "yi sang";
    case 2: return "faust";
    case 3: return "don quixote";
    case 4: return "ryoshu";
    case 5: return "meursault";
    case 6: return "hong lu";
    case 7: return "heathcliff";
    case 8: return "ishmael";
    case 9: return "rodion";
    case 10: return "dante";
    case 11: return "sinclair";
    case 12: return "outis";
    case 13: return "gregor";
  }
}

function getSinnerEgoSrcImg(ego: EgoData) {
  const sinner = sinnerNumberToName(ego.sinner);
  const egoName = ego.name.toLowerCase();
  return `/sinners/${sinner}/ego/${egoName}.webp`;
}

function getSinnerIdSrcImg(id: IdentityData) {
  const sinner = sinnerNumberToName(id.sinner);
  const idName = id.name.toLocaleLowerCase();
  return `/sinners/${sinner}/identities/${idName}.webp`;
}


export {
  sinnerNumberToName,
  getSinnerEgoSrcImg,
  getSinnerIdSrcImg,
}