import { TeamResources, EgoData, Passive } from '@/types/data';

// Obtain TeamResources from consuming the context and pass it here.
function passiveSufficient(resources: TeamResources, passive?: Passive) {
  if (!passive) return false;

  const resource = resources.get(passive.affinity);
  if (!resource) return false;

  return resource >= passive.cost;
}

function egoSufficient(resources: TeamResources, ego?: EgoData) {
  if (!ego) return false;

  for (const cost of ego.costs) {
    const resource = resources.get(cost.affinity);
    if (!resource) return false;

    if (resource < cost.cost) return false;
  }

  return true;
}

function getEgoResourcesMap(egoData: EgoData[]) {
  const resources : TeamResources = new Map();
  for (const ego of egoData) {
    for (const cost of ego.costs) {
      const old = resources.get(cost.affinity) ?? 0;
      resources.set(cost.affinity, old + cost.cost);
    }
  }

  return resources;
}


export {
  passiveSufficient, egoSufficient,
  getEgoResourcesMap,
}