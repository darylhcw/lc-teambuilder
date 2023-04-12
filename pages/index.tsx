import { Noto_Sans_KR } from 'next/font/google'
import { GetStaticPropsContext } from 'next';
import { useContext, memo } from 'react';
import { TeamContext } from '@/hooks/teamContext';
import TeamBoard from '@/components/TeamBoard';
import { importEgos, importIdentities } from '@/helpers/loadJson';
import { sinnerNumberToName } from '@/helpers/sinnerData';
import { IdentityData, EgoData } from '@/types/data';
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
  return (
    <>
      <main className={`${NotoSansKR.className} ${styles.main}`}>
          <TeamBoard idData={idData} egoData={egoData}/>
          <TeamList/>
      </main>
    </>
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