import { useState } from 'react';
import { IdentityData, EgoData } from '@/types/data';
import { getSinnerEgoSrcImg, getSinnerIdSrcImg } from '@/helpers/loadAssets'
import styles from './sinner-card.module.scss';

interface SinnerCardProps {
  idData: IdentityData[];
  egoData: EgoData[];
  sinner: number;
}

export default function SinnerCard(
 {
  idData,
  egoData,
  sinner,
 }: SinnerCardProps
) {
  const [identity, setIdentity] = useState(idData[0]);

  return (
    <div className={styles.container}>
        <img className={styles["sinner-img"]}
            src={getSinnerIdSrcImg(identity)}
        />
    </div>
  )
}
