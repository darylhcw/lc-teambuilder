import { Sin, AttackType, DefenseType } from '@/types/data';
import { getSkillTypeAsset, getSinTypeHexAsset } from '@/helpers/assets';
import styles from './SkillHexagon.module.scss';

interface SkillHexagonProps {
  affinity?: Sin;
  type: AttackType | DefenseType;
  defense?: boolean;
}

export default function SkillHexagon({affinity, type, defense=false} : SkillHexagonProps) {
  return (
    <div className={styles.container}>
      <img className={styles.hexagon}
           alt={affinity}
           src={getSinTypeHexAsset(affinity)}/>
      <img className={styles.skill}
           alt={type}
           src={getSkillTypeAsset(type, defense)}/>
    </div>
  )
}
