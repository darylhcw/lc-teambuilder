import { Sin, AttackType, DefenseType } from '@/types/data';
import { getSkillTypeAsset, getSinTypeHexAsset } from '@/helpers/assets';
import styles from './skillHexagon.module.scss';

interface SkillHexagonProps {
  affinity: Sin;
  type: AttackType | DefenseType;
  defense?: boolean;
}

export default function SkillHexagon({affinity, type, defense=false} : SkillHexagonProps) {
  return (
    <div className={styles.container}>
      <img className={styles.hexagon}
           src={getSinTypeHexAsset(affinity)}/>
      <img className={styles.skill}
           src={getSkillTypeAsset(type, defense)}/>
    </div>
  )
}
