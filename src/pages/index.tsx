import Sidebar from '@/components/Sidebar';
import Head from 'next/head';
import UserInfo from '@/components/UserInfo';
import { getSession } from 'next-auth/react';
import ProgressBar from '@/components/ProgressBar';
import { dataFull, dataEmpty } from '@/data/data';

export default function Home() {
  return (
    <>
      <Head>
        <title>Step-Upp. A tool to help you advance you career</title>
      </Head>

      <Sidebar>
        <div className="h-max">
          <UserInfo
            name={'J. Appleseed'}
            title={'Senior Product Manager'}
            team={'Payment platfrom'}
            email={'john.appleseed@company.com'}
          />
          {dataFull.map((item, index) => {
            return (
              <section className="my-20 grid grid-cols-5 gap-4">
                <div className="col-span-5">
                  <h2>{item.name}</h2>
                </div>
                <div className="col-span-2 text-sm text-slate-400">
                  <h2>Competency</h2>
                </div>
                <div className=" text-sm text-slate-400">
                  <h2>Self-score</h2>
                </div>
                <div className=" text-sm text-slate-400">
                  <h2>360-score</h2>
                </div>
                <div className=" text-sm text-slate-400">
                  <h2>Actions</h2>
                </div>
                {item.skills.map((skill, skillIndex) => {
                  return (
                    <>
                      <div className="col-span-2 font-normal">{skill.name}</div>
                      <button className="">
                        <ProgressBar value={skill.score} />
                      </button>
                      <button>
                        <ProgressBar value={skill.score360} />
                      </button>
                      <div>
                        <button className="w-1/4 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 shadow-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-l">
                          +{skill.actions}
                        </button>
                      </div>
                    </>
                  );
                })}
              </section>
            );
          })}
        </div>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }
  return {
    props: { session },
  };
};
