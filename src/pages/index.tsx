import Layout from '@/components/Layout';
import Head from 'next/head';
import UserInfo from '@/components/UserInfo';

export const data = [
  {
    name: 'Product strategy',
    skills: [
      { name: 'Strategic impact', score: 10, score360: 10, actions: 2 },
      {
        name: 'Product Vision & Roadmapping',
        score: 10,
        score360: 8,
        actions: 1,
      },

      {
        name: 'Business Outcome Ownership',
        score: 10,
        score360: 10,
        actions: 2,
      },
    ],
  },
  {
    name: 'Product execution',
    skills: [
      { name: 'Feature Specification', score: 10, score360: 10, actions: 2 },
      {
        name: 'Product Delivery',
        score: 10,
        score360: 8,
        actions: 1,
      },

      {
        name: 'Quality Assurance',
        score: 10,
        score360: 10,
        actions: 2,
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Step-Upp. A tool to help you advance you career</title>
      </Head>

      <Layout>
        <div className="h-max">
          <UserInfo
            name={'J. Appleseed'}
            title={'Senior Product Manager'}
            team={'Payment platfrom'}
            email={'john.appleseed@company.com'}
          />
          {data.map((item, index) => {
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
                      <div className="col-span-2 font-normal">
                        <h2>{skill.name}</h2>
                      </div>
                      <div className=" font-normal">
                        <h2>{skill.score}</h2>
                      </div>
                      <div className=" font-normal">
                        <h2>{skill.score360}</h2>
                      </div>
                      <div className=" font-normal">
                        <h2>{skill.actions}</h2>
                      </div>
                    </>
                  );
                })}
              </section>
            );
          })}
        </div>
      </Layout>
    </>
  );
}
