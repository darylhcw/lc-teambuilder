import { Noto_Sans_KR } from 'next/font/google'
import { GetStaticPropsContext } from 'next';
import Board from '@/components/board';
import SinnerCard from '@/components/sinner-card';
import { importEgos, importIdentities } from '@/helpers/loadData';
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


export default function Home({idData, egoData} : HomeProps) {
  return (
    <>
      <main className={`${NotoSansKR.className} ${styles.main}`}>
        <Board>
          <div className={styles["board-container"]}>
          { SINNER_NUMBERS.map((num) =>
            <SinnerCard key={num}
                        sinner={num}
                        idData={idData.filter(filterIdData(num))}
                        egoData={egoData.filter(filterEgoData(num))}
            />
          )}
          </div>
        </Board>
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
