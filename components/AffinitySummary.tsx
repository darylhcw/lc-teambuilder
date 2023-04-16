import { useTeamContext, useTeamResourcesContext } from '@/hooks/teamContext';
import SkillHexagon from '@/components/SkillHexagon';
import { getSinTypeAsset } from '@/helpers/assets'
import { getEgoResourcesMap } from '@/helpers/costCalcs'
import { SINS, ATTACK_TYPES, AttackType, EgoData, TeamResources } from '@/types/data';

import styles from './AffinitySummary.module.scss';


export default function AffinitySummary() {
  return (
    <>
      <SkillSummaryBoard/>
      <EgoSummaryBoard/>
    </>
  )
}

function SkillSummaryBoard() {
  const team = useTeamContext();
  const teamResources = useTeamResourcesContext();

  let slash = 0;
  let blunt = 0;
  let pierce = 0;
  for (const member of team) {
    if (!member.active) continue;

    member.id.skills.forEach((skill) => {
      const attackType = skill.type;
      switch (attackType) {
        case "Slash": slash += 1; break;
        case "Blunt": blunt += 1; break;
        case "Pierce": pierce += 1; break;
      }
    })
  }

  function attackCount(attackType : AttackType) {
    switch (attackType) {
      case "Slash": return slash;
      case "Blunt": return blunt;
      case "Pierce": return pierce
      default: return 0;
    }
  }


  return (
    <section className={`${styles["summary-board"]} board-dark`}>
      <h2>ATK AFFINITIES:</h2>
      <div className={styles["sin-container"]}>
        { SINS.map((sin) =>
            <div className={styles["image-cost-pair"]}>
              <img src={getSinTypeAsset(sin)} alt={sin}/>
              <span>{`x${teamResources.get(sin) ?? 0}`}</span>
            </div>
        )}
      </div>
      <div className={styles["attacks-container"]}>
          { ATTACK_TYPES.map((attack) =>
              <div className={styles["image-cost-pair"]}>
                <SkillHexagon type={attack}/>
                <span>{`x${attackCount(attack)}`}</span>
              </div>
          )}
      </div>
    </section>
  )
}

function EgoSummaryBoard() {
  const team = useTeamContext();

  const activeMemberEgos : EgoData[] = [];
  for (const member of team) {
    if (member.active) {
      activeMemberEgos.push(...member.egos);
    }
  }

  const egoResources = getEgoResourcesMap(activeMemberEgos);

  let slash = 0;
  let blunt = 0;
  let pierce = 0;
  for (const ego of activeMemberEgos) {
    switch (ego.type) {
      case "Slash": slash += 1; break;
      case "Blunt": blunt += 1; break;
      case "Pierce": pierce += 1; break;
    }
  }

  function attackCount(attackType : AttackType) {
    switch (attackType) {
      case "Slash": return slash;
      case "Blunt": return blunt;
      case "Pierce": return pierce
      default: return 0;
    }
  }

  return (
    <section className={`${styles["summary-board"]} board-dark`}>
      <h2>EGO AFFINITIES:</h2>
      <div className={styles["sin-container"]}>
        { SINS.map((sin) =>
            <div className={styles["image-cost-pair"]}>
              <img src={getSinTypeAsset(sin)} alt={sin}/>
              <span>{`x${egoResources.get(sin) ?? 0}`}</span>
            </div>
        )}
      </div>
      <div className={styles["attacks-container"]}>
          { ATTACK_TYPES.map((attack) =>
              <div className={styles["image-cost-pair"]}>
                <SkillHexagon type={attack}/>
                <span>{`x${attackCount(attack)}`}</span>
              </div>
          )}
      </div>
    </section>
  )
}