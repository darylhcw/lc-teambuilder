import { Noto_Sans_KR } from 'next/font/google'
import { GetStaticPropsContext } from 'next';
import { useEffect, useContext, useMemo } from 'react';
import Board from '@/components/board';
import SinnerCard from '@/components/sinner-card';
import { TeamContext, TeamDispatchContext, TeamDispatchFunctions } from '@/hooks/teamContext';
import { importEgos, importIdentities } from '@/helpers/loadJson';
import { sinnerNumberToName } from '@/helpers/sinnerData';
import { SINNER_NUMBERS, IdentityData, EgoData, TeamMember } from '@/types/data';
import styles from '../styles/index.module.scss';


const NotoSansKR = Noto_Sans_KR({
  weight: ['400', '700'],
  subsets: ['latin'],
})


interface HomeProps {
  idData : IdentityData[];
  egoData: EgoData[];
}

function getDefaultTeam(idData: IdentityData[], egoData: EgoData[]) : TeamMember[] {
  const lcbYiSang = {
    id: idData[0],
    egos: egoData.filter(filterEgoData(1)),
  }
  return [lcbYiSang];
}

export default function Home({idData, egoData} : HomeProps) {
  const team = useContext(TeamContext);
  const dispatchTeam = useContext(TeamDispatchContext);
  const [addMember, updateMember, removeMember] = TeamDispatchFunctions(dispatchTeam);

  // Select 1 default sinner just to show how it works.
  useEffect(() => {
    for (const member of getDefaultTeam(idData, egoData)) {
      addMember(member);
    }
  }, [])

  const sinnerBoard = useMemo(() => {
    return (
      <Board>
        <div className={styles["board-container"]}>
          { SINNER_NUMBERS.map((num) =>
            <SinnerCard key={num}
                        idData={idData.filter(filterIdData(num))}
                        egoData={egoData.filter(filterEgoData(num))}
                        setActiveSinner={addMember}
                        unsetActiveSinner={removeMember}
                        updateActiveSinner={updateMember}
            />
          )}
        </div>
      </Board>
    )
  }, [idData, egoData]);

  return (
    <>
      <main className={`${NotoSansKR.className} ${styles.main}`}>
        { sinnerBoard }
        <ul>
          { team.map((member, index) =>
            <li key={index}>{member.id.name} {sinnerNumberToName(member.id.sinner, true)}</li>
          )}
        </ul>
      </main>
    </>
  )
}

function filterIdData(sinner: number) {
  return (data: IdentityData) => data.sinner == sinner;
}

function filterEgoData(sinner: number) {
  return (data: EgoData) => data.sinner == sinner;
}


// We can actually import the JSON directly, but this makes it easier to
// change if we want to import from somewhere else for each weekly update.
export async function getStaticProps(context: GetStaticPropsContext) {
  const identities = await importIdentities();
  const egos = await importEgos();

  return {
    props: {
      idData: identities,
      egoData: egos,
    }
  }
}
