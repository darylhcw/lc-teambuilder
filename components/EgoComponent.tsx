import { useState, useContext } from 'react';
import { TeamContext, TeamDispatchContext, EgoDispatchFunctions } from '@/hooks/teamContext';
import EgoSelection from '@/components/EgoSelection';
import { getSinCSSColor, getEgoRarityAsset } from '@/helpers/assets';
import { getSinnerEgoSrcImg } from '@/helpers/sinnerData'
import { TeamMember, EgoData, EgoRarity, EGO_RARITIES } from '@/types/data';
import styles from './EgoComponent.module.scss';

interface EgoComponentProps {
  member: TeamMember;
  egoData : EgoData[];
}

export default function EgoComponent({member, egoData} : EgoComponentProps) {
  const memberEgos = member.egos;

  const dispatch = useContext(TeamDispatchContext);
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

    return (
      <div key={egoRarity} className={styles["ego-row"]} onClick={() => ego ? egoSelected(ego) : {} }>
        <div className={styles["char-block"]}>
          <img src={getEgoRarityAsset(egoRarity)}
               alt={egoRarity}/>
        </div>
        <div className={styles["ego-name"]}
             style={ ego ? {color: getSinCSSColor(ego.affinity)} : {} }>
          { ego?.name }
        </div>
          { ego &&
              <img src={getSinnerEgoSrcImg(ego)}
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
      <div className={styles.container}
           tabIndex={0}
           onKeyDown={handleKeyDown}
           onClick={() => setShowEgoModal(!showEgoModal)}
           onMouseDown={e => e.preventDefault()}>
        { EGO_RARITIES.map((item) => egoRow(item)) }
      </div>
    </>
  )
}
