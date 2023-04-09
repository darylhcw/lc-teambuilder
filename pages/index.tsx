import { Noto_Sans_KR } from 'next/font/google'
import { GetStaticPropsContext } from 'next';
import { useContext, useMemo } from 'react';
import Board from '@/components/Board';
import SinnerCard from '@/components/SinnerCard';
import { TeamContext, TeamDispatchContext, TeamDispatchFunctions } from '@/hooks/teamContext';
import { importEgos, importIdentities } from '@/helpers/loadJson';
import { sinnerNumberToName } from '@/helpers/sinnerData';
import { SINNER_NUMBERS, SinnerNumber, IdentityData, EgoData, TeamMember } from '@/types/data';
import styles from '../styles/index.module.scss';


const NotoSansKR = Noto_Sans_KR({
  weight: ['400', '700'],
  subsets: ['latin'],
})


interface HomeProps {
  idData : IdentityData[];
  egoData: EgoData[];
}


export default function Index({idData, egoData} : HomeProps) {
  const team = useContext(TeamContext);
  const dispatchTeam = useContext(TeamDispatchContext);
  const [setActive, updateId] = TeamDispatchFunctions(dispatchTeam);

  const sinnerBoard = useMemo(() => {
    return (
      <Board>
        <div className={styles["board-container"]}>
          { SINNER_NUMBERS.map((num) =>
            <SinnerCard key={num}
                        idData={idData.filter(filterIdData(num))}
                        egoData={egoData.filter(filterEgoData(num))}
                        setSinnerActive={setActive}
                        updateSinnerId={updateId}
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
          { team.filter((member) => member.active)
                .map((member, index) =>
                  (
                    <div key={index}>
                      <li>{member.id.name} {sinnerNumberToName(member.sinner, true)}</li>
                      { member.egos.map((ego) => <p key={ego.name}>{ego.name}</p>) }
                    </div>
                  )
          )}
        </ul>
      </main>
    </>
  )
}

function filterIdData(sinner: SinnerNumber) {
  return (data: IdentityData) => data.sinner == sinner;
}

function filterEgoData(sinner: SinnerNumber) {
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
