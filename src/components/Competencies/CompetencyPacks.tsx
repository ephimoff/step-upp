import { useState } from 'react';
import { packs } from 'prisma/packsData';
import Modal from '../Modal';

type Props = {
  createCompetency: any;
};

type PackType = {
  id: number;
  name: string;
  description: string;
  competencies: {
    name: string;
    description: string;
    skills: {
      name: string;
    }[];
  }[];
};

const CompetencyPacks = ({ createCompetency }: Props) => {
  let [isOpen, setIsOpen] = useState(false);
  let [previewPack, setPreviewPack] = useState<PackType | undefined>(packs[0]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const getPack = (id: Number): PackType | undefined => {
    const pack = packs.find((e) => {
      return e.id === id;
    });
    return pack;
  };

  const togglePackPreview = (id: Number) => {
    setPreviewPack(getPack(id));
    openModal();
  };

  return (
    <div>
      <h1>Competency Packs</h1>
      <div className="">
        {packs.map(({ id, name, description }, index) => {
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
                    onClick={() => togglePackPreview(id)}
                  >
                    Preview
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => createCompetency(getPack(id))}
                  >
                    Enable
                  </button>
                </div>
                <Modal closeModal={closeModal} isOpen={isOpen}>
                  <h2 className="my-4 text-lg font-semibold text-purple-600">
                    {previewPack?.name}
                  </h2>
                  {previewPack?.competencies.map(
                    ({ name, description, skills }, ind) => {
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
                                  {skill.name}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    }
                  )}
                </Modal>
              </div>

              <h3 className="text-gray-500 dark:text-gray-400 ">
                {description}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CompetencyPacks;
