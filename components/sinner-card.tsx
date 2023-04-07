import { useState, useContext } from 'react';
import SkillHexagon from '@/components/skillHexagon';
import { IdentityData, EgoData, TeamMember, Skill, Passive, Sin } from '@/types/data';
import { TeamResourcesContext } from '@/hooks/teamContext';
import { getRarityAsset, getSinTypeAsset} from '@/helpers/assets';
import { getSinnerEgoSrcImg, getSinnerIdSrcImg } from '@/helpers/sinnerData'
import styles from './sinner-card.module.scss';

interface SinnerCardProps {
  idData: IdentityData[];
  egoData: EgoData[];
  setActiveSinner(member: TeamMember) : void;
  unsetActiveSinner(member: TeamMember) : void;
  updateActiveSinner(member: TeamMember) : void;
}

export default function SinnerCard(
 {
  idData,
  egoData,
  setActiveSinner,
  unsetActiveSinner,
  updateActiveSinner,
 }: SinnerCardProps
) {
  // Check first card just to let users know it's checkable.
  const [identity, setIdentity] = useState(getDefaultId(idData));
  const [isSelected, setIsSelected] = useState(identity.sinner === 1 ? true : false);

  function sinnerSelected() {
    const select = !isSelected;
    setIsSelected(!isSelected);

    const mem = { id:identity, egos:egoData};
    if (select) {
      setActiveSinner(mem);
    } else {
      unsetActiveSinner(mem);
    }
  }

  return (
    <div className={`${styles.container} ${isSelected ? styles.selected : ""}`}>
        {/* <div className={styles["id-data-container"]}> */}
          <img className={styles["sinner-rarity"]}
               src={getRarityAsset(identity.rarity)}
          />
          <input className={styles.checkbox}
                 type="checkbox"
                 checked={isSelected}
                 onChange={sinnerSelected}/>
          <img className={styles["sinner-img"]}
                src={getSinnerIdSrcImg(identity)}
          />
          { skillRow(identity) }
          <PassiveRow active={identity.active} passive={identity.passive}/>
        {/* </div> */}
    </div>
  )
}

function skillRow(identity: IdentityData) {
  return (
    <div className={styles["skill-row"]}>
      { identity.skills.map((skill, index) =>
          index < 3 ? sinHexCombo(skill, index) : null
      )}
    </div>
  )
}

function sinHexCombo(skill: Skill, index: number) {
  return (
    <div key={index} className={styles["skill-container"]}>
      <div className={styles["skill-container-icons"]}>
        <img className={styles["skill-affinity-icon"]}
             src={getSinTypeAsset(skill.affinity)}/>
        { index <= 1
          ? <img className={`${styles["skill-affinity-icon"]} ${styles["stack-1"]}`}
                 src={getSinTypeAsset(skill.affinity)}/>
          : null
        }
        { index === 0
          ? <img className={`${styles["skill-affinity-icon"]} ${styles["stack-2"]}`}
                 src={getSinTypeAsset(skill.affinity)}/>
          : null
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
          <img src={getSinTypeAsset(item.affinity)}/>
          {`${item.activation.substring(0, 3)}\n x${item.cost}`}
        </div>
      )}
    </div>
  )
}

function getDefaultId(idData: IdentityData[]) : IdentityData {
  for (const data of idData) {
    if (data.name.toLowerCase().includes("lcb ")) {
      return data;
    }
  }

  return idData[0]
}