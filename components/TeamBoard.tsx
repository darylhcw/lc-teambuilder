import { useEffect, useContext, memo } from 'react';
import SinnerCard, { SinnerCardProps } from '@/components/SinnerCard';
import { TeamContext, TeamDispatchContext, EgoDispatchFunctions } from '@/hooks/teamContext';
import { SINNER_NUMBERS, SinnerNumber, IdentityData, EgoData } from '@/types/data';

import styles from './TeamBoard.module.scss';


// Important. Make sure the BOARD does NOT consume team context.
// The individual components should unless we wanna enter the rerender blender zone.
export default function TeamBoard({idData, egoData} : {idData: IdentityData[], egoData: EgoData[]}) {
  const teamDispatch = useContext(TeamDispatchContext);
  const [_, setEgos] = EgoDispatchFunctions(teamDispatch);

  // Set initial egos.
  useEffect(() => {
    for (const num of SINNER_NUMBERS) {
      const firstEgo = egoData.find((ego) => ego.sinner === num);
      if (firstEgo) setEgos([firstEgo]);
    }
  }, [])

  const sinnerCards = SINNER_NUMBERS.map((num) => SinnerCardForMember(SinnerCard, num));

  return (
    <div className={`${styles["sinner-board"]} board`}>
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
    </div>
  )
}


// Higher order component to use part of team context.
// - Avoid ALL cards rerendering when one team member changes id/ego.
function SinnerCardForMember(WrappedSinnerCard: React.ComponentType<SinnerCardProps>, sinner: SinnerNumber) {
  const MemoisedSinnerCard = memo(WrappedSinnerCard);

  const SinnerCardForMember =  (props: any) => {
    const index = sinner >= 10 ? sinner - 2 : sinner - 1;
    const member = useContext(TeamContext)[index];

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