import { useState } from 'react';
import Modal from '../Modal';
import { packs } from 'prisma/packsData';

type Props = {
  props?: any;
};

const CompetencyPacks = ({ props }: Props) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div>
      <h1>Competency Packs</h1>
      <div className="">
        {packs.map(({ name, description, competencies }, index) => {
          return (
            <div
              key={index}
              className="group mb-2 cursor-pointer rounded-md border border-purple-600 p-4 text-sm shadow hover:bg-purple-200 dark:border-purple-500 dark:hover:bg-gray-900 dark:hover:text-black"
            >
              <div className="flex items-baseline justify-between">
                <h2 className="mb-4 font-semibold text-purple-600 dark:text-purple-500">
                  {name}
                </h2>
                <div className="flex items-baseline ">
                  <button
                    className="btn btn-sm items-center dark:group-hover:text-white"
                    onClick={openModal}
                  >
                    Preview
                  </button>
                  <button className="btn btn-sm btn-primary">Enable</button>
                </div>
              </div>

              <h3 className="text-gray-500 dark:text-gray-400 ">
                {description}
              </h3>
              <Modal closeModal={closeModal} isOpen={isOpen}>
                <h2 className="my-4 text-lg font-semibold text-purple-600">
                  {name}
                </h2>
                {competencies.map(({ name, description, skills }, ind) => {
                  return (
                    <div key={ind} className="mb-4">
                      <div className="mb-1">
                        <strong className="mr-2">{name}:</strong>
                        <span>{description}</span>
                      </div>
                      <ul className="list-disc">
                        {skills.map((skill, skillIndex) => {
                          return (
                            <li
                              className="ml-4 text-sm text-gray-500"
                              key={skillIndex}
                            >
                              {skill}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </Modal>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CompetencyPacks;
