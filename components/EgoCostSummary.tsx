import { useTeamContext, useTeamResourcesContext } from '@/hooks/teamContext';
import { getSinTypeAsset } from '@/helpers/assets';
import { getSinnerEgoSrcImg } from '@/helpers/sinnerData';
import { egoSufficient } from '@/helpers/costCalcs';
import { EgoData, Sin } from '@/types/data';

import styles from './EgoCostSummary.module.scss';

export default function EgoCostsSummary() {
  const team = useTeamContext();
  const resources = useTeamResourcesContext();

  const activeMembers = team.filter((mem) => mem.active);
  let none = true;
  for (const mem of activeMembers) {
    if (mem.egos.length > 0) {
      none = false;
      break;
    }
  }
  if (none) return null;

  function sinSufficient(sin: Sin, cost: number) {
    const res = resources.get(sin) ?? 0;
    return cost <= res;
  }

  function egoContainer(ego: EgoData) {
    const sufficient = egoSufficient(resources, ego);
    return (
      <div key={ego.name}
           className={`${styles["ego-container"]} ${sufficient ? "" : styles["ego-insufficient"]}`}>
        <div className={styles["ego-img-container"]}>
          <img src={getSinnerEgoSrcImg(ego)}
               alt={ego.name}/>
        </div>
        <div>
          <p>{ego.name}</p>
          <div className={styles["ego-costs-container"]}>
            { ego.costs.map((cost) =>
                <div key={cost.affinity}
                     className={`${styles["ego-cost-pair"]}
                                 ${sinSufficient(cost.affinity, cost.cost) ? "" : styles["cost-insufficient"]}`}>
                  <img src={getSinTypeAsset(cost.affinity)}
                      alt={cost.affinity}/>
                  {`x${resources.get(cost.affinity) ?? 0}/${cost.cost}`}
                </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className={`${styles.container} board`}>
      <div className={styles["member-egos-container"]}>
        { activeMembers.map((member) =>
          <div key={member.sinner} className={styles["member-ego-container"]  + " " + "board-dark"}>
            { member.egos.map((ego) =>
                egoContainer(ego)
            )}
          </div>
        )}
      </div>
    </section>
  )
}
