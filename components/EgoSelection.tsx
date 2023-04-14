import { useContext } from 'react';
import { TeamContext, TeamDispatchContext, EgoDispatchFunctions } from '@/hooks/teamContext';
import Modal from '@/components/Modal';
import { getSinnerEgoSrcImg } from '@/helpers/sinnerData';
import { getEgoRarityLabelAsset, getSinTypeAsset } from '@/helpers/assets'
import { EgoData } from '@/types/data';
import styles from './EgoSelection.module.scss';


interface EgoSelectionProps {
  egoData : EgoData[];
  setModalOpen: (open : boolean) => void;
}

export default function IdentitySelection({egoData, setModalOpen} : EgoSelectionProps) {
  const team = useContext(TeamContext);
  const teamDispatch = useContext(TeamDispatchContext);
  const [egoSelected] = EgoDispatchFunctions(teamDispatch);

  function egoCard(ego: EgoData) {
    return (
      <div key={ego.name} className={styles["ego-container"]}>
        <div key={ego.name} className={styles["ego-container-main"]}
            onClick={() => egoSelected(ego)}>
          <img className={styles["ego-rarity"]}
              src={getEgoRarityLabelAsset(ego.rarity)}
              alt={String(ego.rarity)}/>
          <img className={styles["ego-affinity"]}
              src={getSinTypeAsset(ego.affinity)}
              alt={String(ego.affinity)}/>
          <div className={styles["ego-image-container"]}>
            <img className={styles["ego-image"]}
              src={getSinnerEgoSrcImg(ego)}
              alt={`picture of ${ego.name}`}/>
          </div>
          <p className={styles["ego-name"]}>{ego.name}</p>
          <div className={styles["ego-costs"]}>
          { ego.costs.map((cost, index) =>
              <div key={index} className={styles["cost-and-text"]}>
                <img src={getSinTypeAsset(cost.affinity)} alt={cost.affinity}/>
                <p>{`x${cost.cost}`}</p>
              </div>
          )}
        </div>
        </div>
      </div>
    )
  }

  return (
    <Modal closeModal={() => setModalOpen(false)}>
      <div className={`${styles.board} board-dark`}>
        <div className={`${styles.container} sleek-scrollbar`}>
          { egoData.map((ego) => egoCard(ego))}
        </div>
      </div>
    </Modal>
  )
}