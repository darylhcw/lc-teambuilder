import { useContext } from 'react';
import { TeamContext, TeamDispatchContext, TeamDispatchFunctions } from '@/hooks/teamContext';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { getSinnerIdSrcImg, identityEquals } from '@/helpers/sinnerData';
import { getRarityAsset, getSinTypeAsset } from '@/helpers/assets'
import { IdentityData } from '@/types/data';
import styles from './IdentitySelection.module.scss';


interface IdSelectionProps {
  idData : IdentityData[];
  setModalOpen: (open : boolean) => void;
}

// Use setIdentity instead of just SinnerCard consuming context is just to prevent rerendering all 12 cards.
// More of an exercise -- it's actually super fast either way.
export default function IdentitySelection({idData, setModalOpen} : IdSelectionProps) {
  const team = useContext(TeamContext);
  const teamDispatch = useContext(TeamDispatchContext);
  const [_, updateId] = TeamDispatchFunctions(teamDispatch);

  const sinner = idData[0]?.sinner;
  const activeId = team.find((member) => member.sinner === sinner)?.id;

  function setId(id: IdentityData) {
    setModalOpen(false);
    updateId(id);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, id: IdentityData) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setId(id);
    }
  }

  function idCard(identity: IdentityData) {
    const active = identityEquals(identity, activeId);

    return (
      <div key={identity.name}
           className={`${styles["id-container"]} ${active ? styles.active : ""}`}
           onClick={() => setId(identity)}
           onMouseDown={e => e.preventDefault()}
           tabIndex={0}
           onKeyDown={ (e) => handleKeyDown(e, identity)}>
        <div className={styles["id-container-left"]}>
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
        <div className={styles["id-container-right"]}>
          { identity.skills.map((skill, index) =>
              index < 3 &&
                <div key={index}>
                  <img src={getSinTypeAsset(skill.affinity)} alt={skill.affinity}/>
                  <p>{`x${3-index}`}</p>
                </div>
          )}
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
        <div className={`${styles.container} sleek-scrollbar`}>
          { idData.map((identity) => idCard(identity))}
        </div>
        <Button onClick={() => setModalOpen(false)}>
          Done
        </Button>
      </div>
    </Modal>
  )
}
