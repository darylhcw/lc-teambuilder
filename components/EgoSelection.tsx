import { useTeamContext, useTeamDispatchContext, EgoDispatchFunctions } from '@/hooks/teamContext';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { getSinnerEgoSrcImg, egoEquals } from '@/helpers/sinnerData';
import { getEgoRarityLabelAsset, getSinTypeAsset } from '@/helpers/assets'
import { EgoData } from '@/types/data';
import styles from './EgoSelection.module.scss';


interface EgoSelectionProps {
  egoData : EgoData[];
  setModalOpen: (open : boolean) => void;
}

export default function IdentitySelection({egoData, setModalOpen} : EgoSelectionProps) {
  const team = useTeamContext();
  const teamDispatch = useTeamDispatchContext();
  const [egoSelected] = EgoDispatchFunctions(teamDispatch);

  const sinner = egoData[0]?.sinner;
  const activeEgos = team.find((member) => member.sinner === sinner)?.egos;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, ego: EgoData) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      egoSelected(ego);
    }
  }

  function egoCard(ego: EgoData) {
    const active = activeEgos?.find((activeEgo) => egoEquals(activeEgo, ego)) !== undefined;

    return (
      <div key={ego.name} className={styles["ego-container"]}>
        <div key={ego.name}
             className={`${styles["ego-container-main"]} ${active ? styles.active : ""}`}
             onClick={() => egoSelected(ego)}
             onKeyDown={ (e) => handleKeyDown(e, ego)}
             tabIndex={0}
             onMouseDown={e => e.preventDefault()}>
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
        <Button onClick={() => setModalOpen(false)}>
          X
        </Button>
        <div className={`${styles.container}`}>
          { egoData.map((ego) => egoCard(ego))}
        </div>
        <Button onClick={() => setModalOpen(false)}>
          Done
        </Button>
      </div>
    </Modal>
  )
}
