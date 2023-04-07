import { useState } from 'react';
import SkillHexagon from '@/components/skillHexagon';
import { IdentityData, EgoData, TeamMember, Skill, Passive } from '@/types/data';
import { getRarityAsset, getSinTypeAsset, getSinCSSColor } from '@/helpers/assets';
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
  const passive = isSelected ? identity.active : identity.passive;

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

function passiveDiv(passive: Passive) {
  return (
    <div className={styles["passive-div"]}>
      <img src={getSinTypeAsset(passive.affinity)}/>
      {`${passive.activation.substring(0, 3)}\n ${passive.cost}`}
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