import { useContext } from 'react';
import { TeamContext, TeamDispatchContext, TeamDispatchFunctions } from '@/hooks/teamContext';
import Modal from '@/components/Modal';
import { getSinnerIdSrcImg } from '@/helpers/sinnerData';
import { getRarityAsset } from '@/helpers/assets'
import { IdentityData } from '@/types/data';
import styles from './IdentitySelection.module.scss';


interface IdSelectionProps {
  identity: IdentityData;
  idData : IdentityData[];
  setIdentity: (identity: IdentityData) => void;
  setModalOpen: (open : boolean) => void;
}

// Use setIdentity instead of just SinnerCard consuming context is just to prevent rerendering all 12 cards.
// More of an exercise -- it's actually super fast either way.
export default function IdentitySelection({identity, idData, setIdentity, setModalOpen} : IdSelectionProps) {
  const team = useContext(TeamContext);
  const teamDispatch = useContext(TeamDispatchContext);
  const [_, updateId] = TeamDispatchFunctions(teamDispatch);

  function idUpdate(identity: IdentityData) {
    setIdentity(identity);
    updateId(identity);
  }

  function idCard(identity: IdentityData) {
    return (
      <div key={identity.name} className={styles["id-container"]}
           onClick={() => idUpdate(identity)}>
        <img className={styles["id-rarity"]}
             src={getRarityAsset(identity.rarity)}
             alt={String(identity.rarity)}/>
        <div className={styles["id-name"]}>
          <p>{identity.name}</p>
        </div>
        <img className={styles["id-image"]}
             src={getSinnerIdSrcImg(identity)}
             alt={`picture of ${identity.name}`}/>
      </div>
    )
  }

  return (
    <Modal closeModal={() => setModalOpen(false)}>
      <div className={`${styles.board} board-dark`}>
        <div className={`${styles.container} sleek-scrollbar`}>
          { idData.map((identity) => idCard(identity))}
        </div>
      </div>
    </Modal>
  )
}
