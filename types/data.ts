export const SINNER_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13] as const
const SINS = ["Wrath", "Lust", "Sloth", "Gluttony", "Gloom", "Pride", "Envy"] as const

type SinnerNumber = typeof SINNER_NUMBERS[number];
type Sin = typeof SINS[number]
type Cost = `x${number}`;
type Plus = `+${number}`;
type AttackType = "Slash" | "Blunt" | "Pierce";
type DefenseType = "Guard" | "Dodge" | "Counter";
type EgoRarity = "ZAYIN" | "TETH" | "HE" | "WAW" | "ALEPH";

export interface IdentityData {
  sinner: SinnerNumber;
  name: string;
  rarity: 1 | 2 | 3;
  active: Passive;
  passive: Passive;
  skills: Skill[];
}

export interface EgoData {
  sinner: SinnerNumber;
  name: string;
  rarity: EgoRarity;
  affinity: Sin;
  type: AttackType;
  costs: EgoCost[]
}

interface Passive {
  affinity: Sin;
  cost: Cost;
}

interface EgoCost {
  affinity: Sin;
  cost: Cost;
}

interface Skill {
  affinity: Sin;
  base: number;
  plus: Plus;
  coins: number;
  type: AttackType | DefenseType
}
