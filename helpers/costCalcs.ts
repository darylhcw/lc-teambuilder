import { TeamResources, EgoData, Passive } from '@/types/data';

/**
 * All cost functions here receive TeamResources which is obtained
 * from consuming TeamResourcesContext in a component and passing it here.
 */
function passiveSufficient(resources: TeamResources, passive?: Passive) {
  if (!passive) return false;

  const resource = resources.get(passive.affinity);
  if (!resource) return false;

  return resource >= passive.cost;
}

/**
 * All cost functions here receive TeamResources which is obtained
 * from consuming TeamResourcesContext in a component and passing it here.
 */
function egoSufficient(resources: TeamResources, ego?: EgoData) {
  if (!ego) return false;

  for (const cost of ego.costs) {
    const resource = resources.get(cost.affinity);
    if (!resource) return false;

    if (resource < cost.cost) return false;
  }

  return true;
}


export {
  passiveSufficient, egoSufficient
}