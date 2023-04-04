import { promises as fs } from 'fs';
import { IdentityData, EgoData } from '@/types/data';
import path from 'path';

const ID_JSON = "identities.json"
const EGO_JSON = "egos.json"

export async function importIdentities() : Promise<IdentityData[]> {
  const idFile = path.join(process.cwd(), 'public', ID_JSON);
  const data = await fs.readFile(idFile, "utf-8");
  const identities = JSON.parse(data);

  return identities;
}

export async function importEgos() : Promise<EgoData[]> {
  const egoFile = path.join(process.cwd(), 'public', EGO_JSON);
  const data = await fs.readFile(egoFile, "utf-8");
  const egos = JSON.parse(data);

  return egos;
}
