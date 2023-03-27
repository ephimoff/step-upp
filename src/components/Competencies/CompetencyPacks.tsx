type Props = {
  props?: any;
};

const packs = [
  {
    name: 'Product Management Pack',
    description:
      '4 competencies and 12 skills that are the must for every Product Manager',
    competencies: [
      {
        name: 'Product Strategy',
        description:
          'The ability to drive business impact via product innovation',
        skills: [
          'Strategic Impact',
          'Product Vision & Roadmapping',
          'Business Outcome Ownership',
        ],
      },
      {
        name: 'Product Execution',
        description: 'The ability to build exceptional products',
        skills: [
          'Feature Specification',
          'Product Delivery',
          'Quality Assurance',
        ],
      },
      {
        name: 'Influencing People',
        description: 'The ability to rally people around the team’s work',
        skills: ['Managing Up', 'Team Leadership', 'Stakeholder Management'],
      },
      {
        name: 'Customer Insight',
        description: 'The ability to understand and deliver on customer needs',
        skills: [
          'Fluency with the Data',
          'Voice of the Customer',
          'User Experience Design',
        ],
      },
    ],
  },
  {
    name: 'Software Development Pack',
    description:
      '4 competencies and 12 skills that are the must for every Product Manager',
    competencies: [
      {
        name: 'Product Strategy',
        description:
          'The ability to drive business impact via product innovation',
        skills: [
          'Strategic Impact',
          'Product Vision & Roadmapping',
          'Business Outcome Ownership',
        ],
      },
      {
        name: 'Product Execution',
        description: 'The ability to build exceptional products',
        skills: [
          'Feature Specification',
          'Product Delivery',
          'Quality Assurance',
        ],
      },
      {
        name: 'Influencing People',
        description: 'The ability to rally people around the team’s work',
        skills: ['Managing Up', 'Team Leadership', 'Stakeholder Management'],
      },
      {
        name: 'Customer Insight',
        description: 'The ability to understand and deliver on customer needs',
        skills: [
          'Fluency with the Data',
          'Voice of the Customer',
          'User Experience Design',
        ],
      },
    ],
  },
];

const CompetencyPacks = ({ props }: Props) => {
  return (
    <div>
      <h1>Competency Packs</h1>
      <div className="">
        {packs.map(({ name, description }, index) => {
          return (
            <div
              key={index}
              className="group mb-2 cursor-pointer rounded-md border border-purple-600 p-4 text-sm shadow hover:bg-purple-200 dark:border-purple-500 dark:hover:text-black"
            >
              <div className="flex items-baseline justify-between">
                <h2 className="mb-4 font-semibold text-purple-600 dark:text-purple-500">
                  {name}
                </h2>
                <button className="btn btn-sm px-2 py-1 font-semibold hover:bg-purple-600 hover:text-white ">
                  Enable
                </button>
              </div>

              <h3 className="text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-600">
                {description}
              </h3>

              {/* {PMPack.competencies.map((competency, index) => {
            return (
              <div key={index}>
                <h2>{competency.name}</h2>
                <h3>{competency.description}</h3>
                {competency.skills.map((skill, ind) => {
                  return <div key={ind}>{skill}</div>;
                })}
              </div>
            );
          })} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CompetencyPacks;
