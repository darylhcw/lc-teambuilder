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
          { identity.skills.map((skill, index) =>
              skillRow(skill, passive, index)
          )}
        {/* </div> */}
    </div>
  )
}

function skillRow(skill : Skill, passive: Passive, index: number) {
  const skillAlpha = 40;

  return (
    <div key={index}
         className={styles["skill-container"]}
         style={{background: getSinCSSColor(skill.affinity, skillAlpha)}}>
      <p className={styles.base}>{skill.base}</p>
      <SkillHexagon affinity={skill.affinity}
                    type={skill.type}
                    defense={index === 3}
      />
      <p className={styles.plus}>{skill.plus}</p>
      { index === 3 ? passiveDiv(passive) : coinsDiv(skill.coins) }
      { index < 3 ? <p className={styles.multiply}>{`x${index+1}`}</p> : null }
    </div>
  )
}

function coinsDiv(num: number) {
  const coinImages = () => {
    let coins = []
    for (let i=0; i < num; i++) {
      coins.push(
        <img src={"/assets/coin.webp"}/>
      );
    }

    return coins;
  }

  return (
    <div className={styles["coins-div"]}>
      { coinImages() }
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