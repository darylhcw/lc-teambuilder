import { useState, useContext } from 'react';
import IdentitySelection from '@/components/IdentitySelection';
import SkillHexagon from '@/components/SkillHexagon';
import EgoComponent from '@/components/EgoComponent';
import { TeamDispatchContext, TeamResourcesContext, TeamDispatchFunctions } from '@/hooks/teamContext';
import { getRarityAsset, getSinTypeAsset} from '@/helpers/assets';
import { getSinnerIdSrcImg } from '@/helpers/sinnerData'
import { TeamMember, IdentityData, EgoData, Skill, Passive, Sin, SinnerNumber } from '@/types/data';
import styles from './SinnerCard.module.scss';

export interface SinnerCardProps {
  member: TeamMember;
  idData: IdentityData[];
  egoData: EgoData[];
}

export default function SinnerCard(
 {
  member,
  idData,
  egoData,
 }: SinnerCardProps
) {
  const identity = member.id;

  const teamDispatch = useContext(TeamDispatchContext);
  const [setActive, _] = TeamDispatchFunctions(teamDispatch);

  const [showIdModal, setShowIdModal] = useState(false);

  function handleKeyDownChkBox(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      setActive(identity.sinner, !member.active);
    }
  }

  function handleKeyDownTop(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key == 'Enter') {
      e.preventDefault();
      setShowIdModal(!showIdModal);
    }
  }

  function sinnerProfile() {
    return (
      <>
        <img className={styles["sinner-rarity"]}
             src={getRarityAsset(identity.rarity)}
             alt={`${identity.rarity}-star rarity`}
        />
        <div className={styles["sinner-img-container"]}>
          <img className={styles["sinner-img"]}
              src={getSinnerIdSrcImg(identity)}
              alt={identity.name}
          />
          <div className={styles["sinner-name"]}>
            <p>{identity.name}</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className={`${styles.container} ${member.active ? styles.selected : ""}`}>
        {/* Modals -- layout independent of rest of content. */}
              { showIdModal
           && <IdentitySelection idData={idData}
                                 setModalOpen={setShowIdModal}/>
        }
        <div className={styles["top-container"]}
             onMouseDown={(e) => e.preventDefault()}
             onClick={() => setShowIdModal(!showIdModal)}
             tabIndex={0}
             onKeyDown={handleKeyDownTop}>
          { sinnerProfile() }
          { skillRow(identity) }
          <PassiveRow active={identity.active} passive={identity.passive}/>
        </div>
        <input className={styles.checkbox}
               type="checkbox"
               checked={member.active}
               onMouseDown={(e) => e.preventDefault()}
               onKeyDown={handleKeyDownChkBox}
               onChange={() => setActive(identity.sinner, !member.active)}/>
        <EgoComponent member={member} egoData={egoData}/>
    </div>
  )
}


function skillRow(identity: IdentityData) {
  return (
    <div className={styles["skill-row"]}>
      { identity.skills.map((skill, index) =>
          index < 3 && sinHexCombo(skill, index)
      )}
    </div>
  )
}

function sinHexCombo(skill: Skill, index: number) {
  return (
    <div key={index} className={styles["skill-container"]}>
      <div className={styles["skill-container-icons"]}>
        <img className={styles["skill-affinity-icon"]}
             src={getSinTypeAsset(skill.affinity)}
             alt={skill.affinity}/>
        { index <= 1
            && <img className={`${styles["skill-affinity-icon"]} ${styles["stack-1"]}`}
                    src={getSinTypeAsset(skill.affinity)}
                    alt={skill.affinity}/>
        }
        { index === 0
            && <img className={`${styles["skill-affinity-icon"]} ${styles["stack-2"]}`}
                    src={getSinTypeAsset(skill.affinity)}
                    alt={skill.affinity}/>
        }
        <div className={styles.hex}>
          <SkillHexagon affinity={skill.affinity} type={skill.type}/>
        </div>
      </div>
    </div>
  )
}

function PassiveRow({active, passive} : {active: Passive, passive: Passive}) {
  const resources = useContext(TeamResourcesContext);

  function sufficient(sin: Sin, cost: number) {
    const resource = resources.get(sin);
    if (!resource) return false;

    return resource >= cost;
  }

  return (
    <div className={styles["passive-row"]}>
      { [active, passive].map((item, index) =>
        <div key={index}
             className={sufficient(item.affinity, item.cost)
                        ? styles["passive-div"]
                        : `${styles["passive-div"]} ${styles["passive-insufficient"]}`}>
          <img src={getSinTypeAsset(item.affinity)} alt={item.affinity}/>
          {`${item.activation.substring(0, 3)}\n x${item.cost}`}
        </div>
      )}
    </div>
  )
}
