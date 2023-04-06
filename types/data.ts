export const SINNER_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13] as const
export const SINS = ["Wrath", "Lust", "Sloth", "Gluttony", "Gloom", "Pride", "Envy"] as const
export const DEFENSE_TYPES = ["Guard", "Dodge", "Counter"]

export type SinnerNumber = typeof SINNER_NUMBERS[number];
export type Sin = typeof SINS[number]
export type Cost = `x${number}`;
export type Plus = `+${number}`;
export type AttackType = "Slash" | "Blunt" | "Pierce";
export type DefenseType = typeof DEFENSE_TYPES[number];
export type EgoRarity = "ZAYIN" | "TETH" | "HE" | "WAW" | "ALEPH";
export type Activation = "Owned" | "Res";

export interface TeamMember {
  id: IdentityData;
  egos: EgoData[];
}

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

export interface Passive {
  affinity: Sin;
  cost: Cost;
  activation: Activation;
}

export interface EgoCost {
  affinity: Sin;
  cost: Cost;
}

export interface Skill {
  affinity: Sin;
  base: number;
  plus: Plus;
  coins: number;
  type: AttackType | DefenseType
}
