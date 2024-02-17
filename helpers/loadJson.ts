import { promises as fs } from 'fs';
import { IdentityData, EgoData } from '@/types/data';
import path from 'path';

const ID_JSON = "identities.json"
const EGO_JSON = "egos.json"

export async function importIdentities() : Promise<IdentityData[]> {
  const idFile = path.join(process.cwd(), 'public', ID_JSON);
  const data = await fs.readFile(idFile, "utf-8");
  const identities = JSON.parse(data);

  return fixIdStringCosts(identities);
}
export async function importEgos() : Promise<EgoData[]> {
  const egoFile = path.join(process.cwd(), 'public', EGO_JSON);
  const data = await fs.readFile(egoFile, "utf-8");
  const egos = JSON.parse(data);

  return fixEgoStringCosts(egos);
}


/**
 * Extra type casting for the numbers to be safe.
 * The JSONs should be correct but slips have happened before.
 */
function fixIdStringCosts(ids: IdentityData[]) : IdentityData[] {
  for (const id of ids) {
    id.active.cost = Number(id.active.cost);
    id.passive.cost = Number(id.passive.cost);

    for (const skill of id.skills) {
      skill.base = Number(skill.base);
      skill.plus = Number(skill.plus);
      skill.coins = Number(skill.coins);
    }
  }
  return ids;
}
function fixEgoStringCosts(egos: EgoData[]) : EgoData[] {
  for (const ego of egos) {
    for (const sinCost of ego.costs) {
      sinCost.cost = Number(sinCost.cost);
    }
  }
  return egos;
}
