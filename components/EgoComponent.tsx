import { useState } from 'react';
import { useTeamResourcesContext, useTeamDispatchContext, EgoDispatchFunctions } from '@/hooks/teamContext';
import EgoSelection from '@/components/EgoSelection';
import { getSinCSSColor, getEgoRarityAsset } from '@/helpers/assets';
import { getSinnerEgoSrcImg } from '@/helpers/sinnerData'
import { egoSufficient } from '@/helpers/costCalcs'
import { TeamMember, EgoData, EgoRarity, EGO_RARITIES } from '@/types/data';
import styles from './EgoComponent.module.scss';

interface EgoComponentProps {
  member: TeamMember;
  egoData : EgoData[];
}

export default function EgoComponent({member, egoData} : EgoComponentProps) {
  const memberEgos = member.egos;

  const resources = useTeamResourcesContext();
  const dispatch = useTeamDispatchContext();
  const [egoSelected] = EgoDispatchFunctions(dispatch);

  const [showEgoModal, setShowEgoModal] = useState(false);

  function getEgo(rarity: EgoRarity) {
    return memberEgos?.find((ego) => ego.rarity === rarity);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key == 'Enter') {
      e.preventDefault();
      setShowEgoModal(!showEgoModal);
    }
  }

  function egoRow(egoRarity: EgoRarity) {
    const ego = getEgo(egoRarity);
    const sufficient = egoSufficient(resources, ego);

    return (
      <div key={egoRarity}
           className={`${styles["ego-row"]} ${sufficient ? "" : styles.insufficient}`}
           onClick={() => ego ? egoSelected(ego) : {} }>
        <div className={styles["char-block"]}>
          <img src={getEgoRarityAsset(egoRarity, sufficient)}
               alt={egoRarity}/>
        </div>
        <div className={styles["ego-name"]}
             style={ ego && sufficient ? {color: getSinCSSColor(ego.affinity)} : {} }>
          { ego?.name }
        </div>
          { ego &&
              <img className={styles["ego-img"]}
                   src={getSinnerEgoSrcImg(ego)}
                   alt={ego.name}/>
          }
      </div>
    )
  }

  return (
    <>
      {/* Modals -- layout independent of rest of content. */}
      { showEgoModal && <EgoSelection egoData={egoData}
                                      setModalOpen={setShowEgoModal}/>
      }
      <div className={`${styles.container} ${member.active ? "" : styles.inactive}`}
           tabIndex={0}
           onKeyDown={handleKeyDown}
           onClick={() => setShowEgoModal(!showEgoModal)}
           onMouseDown={e => e.preventDefault()}>
        { EGO_RARITIES.map((item) => egoRow(item)) }
      </div>
    </>
  )
}
