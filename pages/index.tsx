import { Noto_Sans_KR } from 'next/font/google'
import { GetStaticPropsContext } from 'next';
import { useEffect, useContext } from 'react';
import { TeamContext, TeamDispatchContext,
  TeamDispatchFunctions, EgoDispatchFunctions } from '@/hooks/teamContext';
import TeamBoard from '@/components/TeamBoard';
import Button from '@/components/Button';
import { importEgos, importIdentities } from '@/helpers/loadJson';
import { sinnerNumberToName } from '@/helpers/sinnerData';
import { SINNER_NUMBERS, IdentityData, EgoData } from '@/types/data';
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
  const teamDispatch = useContext(TeamDispatchContext);
  const [setActive, updateId] = TeamDispatchFunctions(teamDispatch)
  const [_, setEgos] = EgoDispatchFunctions(teamDispatch);

  // Set initial team.
  useEffect(() => {
    setInitialTeam();
  }, [])

  function setInitialTeam() {
    for (const num of SINNER_NUMBERS) {
      const firstId = idData.find((id) => id.sinner === num);
      if (firstId) updateId(firstId);

      const firstEgo = egoData.find((ego) => ego.sinner === num);
      if (firstEgo) setEgos([firstEgo]);

      // Let Yi Sang be active to show how it works.
      setActive(num, num === 1);
    }
  }

  return (
    <>
      <main className={`${NotoSansKR.className} ${styles.main}`}>
          <TeamBoard idData={idData} egoData={egoData}/>
          <div className={styles["board-buttons-container"]}>
            <Button onClick={() => setInitialTeam()}>
              Reset Team
            </Button>
          </div>
          <TeamList/>
      </main>
    </>
  )
}


function TeamList()  {
  const team = useContext(TeamContext);

  return (
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
  )
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
