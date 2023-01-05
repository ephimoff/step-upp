import ProgressBar from '@/components/ProgressBar';
import Sidebar from '@/components/Sidebar';
import UserInfo from '@/components/UserInfo';
import { dataFull, dataEmpty } from '@/data/data';
import prisma from '@/utils/prisma';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

const ProfilePage = ({ profile }: any) => {
  const router = useRouter();
  return (
    <>
      <Sidebar title={`${profile.name}'s profile on StepUpp`}>
        {router.isFallback ? <div>Loading...</div> : null}
        {profile ? (
          <div className="h-max">
            <UserInfo
              name={profile.name}
              title={profile.title}
              team={profile.team}
              email={profile.email}
            />
            {dataFull.map((item, index) => {
              return (
                <section
                  className="my-10 grid grid-cols-5 gap-4 rounded-xl bg-slate-900 py-4 px-6 drop-shadow-2xl"
                  key={index}
                >
                  <div className="col-span-5">
                    <h2 className="text-xl text-purple-400">{item.name}</h2>
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
                      <React.Fragment key={skillIndex}>
                        <div className="col-span-2 font-normal">
                          {skill.name}
                        </div>
                        <ProgressBar value={skill.score} type="self" />
                        <ProgressBar value={skill.score360} type="360" />
                        <div>
                          <button className="w-1/4 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 shadow-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-l">
                            +{skill.actions}
                          </button>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </section>
              );
            })}
          </div>
        ) : (
          <div>A profile with such slug doesn't exist</div>
        )}
      </Sidebar>
    </>
  );
};
export default ProfilePage;

export const getServerSideProps = async (context: any) => {
  const slug = context.query.slug.toLowerCase();
  const profile = await prisma.profile.findUnique({
    where: {
      slug: slug,
    },
  });

  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }

  return {
    props: { session, profile },
  };
};
