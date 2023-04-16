export const SINNER_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13] as const
export const SINS = ["Wrath", "Lust", "Sloth", "Gluttony", "Gloom", "Pride", "Envy"] as const
export const EGO_RARITIES = ["ZAYIN", "TETH", "HE", "WAW", "ALEPH"] as const;
export const ATTACK_TYPES = ["Slash", "Blunt", "Pierce"];
export const DEFENSE_TYPES = ["Guard", "Dodge", "Counter"]

export type SinnerNumber = typeof SINNER_NUMBERS[number];
export type Sin = typeof SINS[number]
export type AttackType = typeof ATTACK_TYPES[number];
export type DefenseType = typeof DEFENSE_TYPES[number];
export type EgoRarity = typeof EGO_RARITIES[number]
export type Activation = "Owned" | "Res";

export interface TeamMember {
  sinner: SinnerNumber;
  id: IdentityData;
  egos: EgoData[];
  active: boolean;
}

export type TeamResources = Map<Sin, number>;

export interface IdentityData {
  sinner: SinnerNumber;
  name: string;
  rarity: 1 | 2 | 3;
  active: Passive;
  passive: Passive;
  skills: Skill[];
  filename?: string;
}

export interface EgoData {
  sinner: SinnerNumber;
  name: string;
  rarity: EgoRarity;
  affinity: Sin;
  type: AttackType;
  costs: EgoCost[]
  filename?: string;
}

export interface Passive {
  affinity: Sin;
  cost: number;
  activation: Activation;
}

export interface EgoCost {
  affinity: Sin;
  cost: number;
}

export interface Skill {
  affinity: Sin;
  base: number;
  plus: number;
  coins: number;
  type: AttackType | DefenseType
}
