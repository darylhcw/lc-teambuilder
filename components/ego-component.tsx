import { useState, useContext } from 'react';
import { getSinCSSColor, getEgoRarityAsset } from '@/helpers/assets';
import { getSinnerEgoSrcImg } from '@/helpers/sinnerData'
import { EgoData, EgoRarity, EGO_RARITIES } from '@/types/data';
import styles from './ego-component.module.scss';

interface EgoComponentProps {
  egoData : EgoData[];
  currentEgos: EgoData[];
  setEgos: (egos: EgoData[]) => void;
}

export default function EgoComponent({egoData, currentEgos, setEgos} : EgoComponentProps) {
  function getEgo(rarity: EgoRarity) {
    //*** CHANGE TO currentEgos later! ***/
    return egoData.find((ego) => ego.rarity === rarity);
  }

  function egoRow(egoRarity: EgoRarity) {
    const ego = getEgo(egoRarity);

    return (
      <div key={egoRarity} className={styles["ego-row"]}>
        <div className={styles["char-block"]}>
          <img src={getEgoRarityAsset(egoRarity)}
               alt={egoRarity}/>
        </div>
        <div className={styles["ego-name"]}
             style={ ego ? {color: getSinCSSColor(ego.affinity)} : {} }>
          { ego?.name }
        </div>
          { ego ? <img src={getSinnerEgoSrcImg(ego)} className={styles["ego-img"]}/> : null }
      </div>
    )
  }

  return (
    <div className={styles.container}>
      { EGO_RARITIES.map((item) => egoRow(item)) }
    </div>
  )
}
