import { DEFENSE_TYPES, AttackType, DefenseType, Sin } from '@/types/data';
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

function getSinTypeHexAsset(affinity: Sin) {
  return `/assets/hex-${affinity.toLowerCase()}.svg`;
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


export {
  getRarityAsset,
  getSkillTypeAsset,
  getSinTypeHexAsset,
  getSinTypeAsset,
  getSinCSSColor,
}