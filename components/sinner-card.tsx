import { useState } from 'react';
import { IdentityData, EgoData, TeamMember } from '@/types/data';
import { getSinnerEgoSrcImg, getSinnerIdSrcImg } from '@/helpers/sinnerData'
import styles from './sinner-card.module.scss';

interface SinnerCardProps {
  idData: IdentityData[];
  egoData: EgoData[];
  setActiveSinner(member: TeamMember) : void;
  unsetActiveSinner(member: TeamMember) : void;
}

export default function SinnerCard(
 {
  idData,
  egoData,
  setActiveSinner,
  unsetActiveSinner,
 }: SinnerCardProps
) {
  const [identity, setIdentity] = useState(getDefaultId(idData));
  const [isSelected, setIsSelected] = useState(false);

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
    <div className={`${styles.container} ${isSelected ? styles.selected : ""}`}
         onClick={ () => sinnerSelected() }>
        <img className={styles["sinner-img"]}
            src={getSinnerIdSrcImg(identity)}
        />
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