import { memo } from 'react';
import SinnerCard, { SinnerCardProps } from '@/components/SinnerCard';
import { useTeamContext, useTeamDispatchContext } from '@/hooks/teamContext';
import { SINNER_NUMBERS, SinnerNumber, IdentityData, EgoData } from '@/types/data';

import styles from './TeamBoard.module.scss';


// Important. Make sure the BOARD does NOT consume team context.
// The individual components should unless we wanna enter the rerender blender zone.
export default function TeamBoard({idData, egoData} : {idData: IdentityData[], egoData: EgoData[]}) {
  const sinnerCards = SINNER_NUMBERS.map((num) => SinnerCardForMember(SinnerCard, num));

  return (
    <section className={`${styles["sinner-board"]} board`}>
      { sinnerCards.map((Card, index) => {
        const num = convertIndexToSinnerNum(index);
         return (
            <Card key={num}
                  idData={idData.filter(filterIdData(num))}
                  egoData={egoData.filter(filterEgoData(num))}
            />
         )
        }
      )}
    </section>
  )
}


// Higher order component to use part of team context.
// - Avoid ALL cards rerendering when one team member changes id/ego.
function SinnerCardForMember(WrappedSinnerCard: React.ComponentType<SinnerCardProps>, sinner: SinnerNumber) {
  const MemoisedSinnerCard = memo(WrappedSinnerCard);

  const SinnerCardForMember =  (props: any) => {
    const index = sinner >= 10 ? sinner - 2 : sinner - 1;
    const member = useTeamContext()[index];

    return (
      <MemoisedSinnerCard {...props} member={member}/>
    )
  }
  SinnerCardForMember.displayName = `SinnerCardForMember-${sinner}`

  return SinnerCardForMember;
}


function filterIdData(sinner: SinnerNumber) {
  return (data: IdentityData) => data.sinner == sinner;
}

function filterEgoData(sinner: SinnerNumber) {
  return (data: EgoData) => data.sinner == sinner;
}

function convertIndexToSinnerNum(index: number) : SinnerNumber {
  const res = index <= 8 ? index + 1 : index + 2;
  return res as SinnerNumber;
}