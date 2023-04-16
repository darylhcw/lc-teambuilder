import { DEFENSE_TYPES, AttackType, DefenseType, Sin, EgoRarity } from '@/types/data';
import css from './assets.module.scss';


function getRarityAsset(rarity: number) {
  return `/assets/${rarity}star.webp`;
}

function getSkillTypeAsset(type: AttackType | DefenseType, defense: boolean) {
  if (defense && !DEFENSE_TYPES.includes(type)) {
    type = "counter";
  }
  return `/assets/${type.toLowerCase()}.webp`;
}

function getSinTypeHexAsset(affinity?: Sin) {
  const name = affinity ? affinity : "none";
  return `/assets/hex-${name.toLowerCase()}.svg`;
}

function getSinTypeAsset(sin: Sin) {
  switch(sin) {
    case 'Wrath': return '/assets/wrath.webp';
    case 'Lust': return '/assets/lust.webp';
    case 'Sloth': return '/assets/sloth.webp';
    case 'Gluttony': return '/assets/gluttony.webp';
    case 'Gloom': return '/assets/gloom.webp';
    case 'Pride': return '/assets/pride.webp';
    case 'Envy': return '/assets/envy.webp';
  }
}

function getSinCSSColor(sin: Sin, alpha: number=255) {
  let color = "";
  switch(sin) {
    case 'Wrath': color = css.wrath; break;
    case 'Lust': color = css.lust; break;
    case 'Sloth': color = css.sloth; break;
    case 'Gluttony': color = css.gluttony; break;
    case 'Gloom': color = css.gloom; break;
    case 'Pride': color = css.pride; break;
    case 'Envy': color = css.envy; break;
  }

  return color + alpha.toString(16);
}

function getEgoRarityAsset(egoRarity: EgoRarity, bright : boolean=false) {
  let name;
  switch(egoRarity) {
    case "ZAYIN": name = "zayin"; break;
    case "TETH": name = "teth"; break;
    case "HE": name = "he"; break;
    case "WAW": name = "waw"; break;
    case "ALEPH": name = "aleph"; break;
  }
  if (bright) name += "-bright"

  return `/assets/${name}.webp`;
}

function getEgoRarityLabelAsset(egoRarity: EgoRarity, bright : boolean=false) {
  let name;
  switch(egoRarity) {
    case "ZAYIN": name = "zayin"; break;
    case "TETH": name = "teth"; break;
    case "HE": name = "he"; break;
    case "WAW": name = "waw"; break;
    case "ALEPH": name = "aleph"; break;
  }

  return `/assets/${name}-label.webp`;
}



export {
  getRarityAsset,
  getEgoRarityAsset, getEgoRarityLabelAsset,
  getSkillTypeAsset,
  getSinTypeHexAsset,
  getSinTypeAsset,
  getSinCSSColor,
}