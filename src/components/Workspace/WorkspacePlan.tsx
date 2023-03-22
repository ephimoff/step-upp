type Props = {
  id: string;
  name: string;
};

const WorkspacePlan = ({ name, id }: Props) => {
  return (
    <div className="mt-10 mb-4">
      <h2 className="text-lg">Plan</h2>
      <div>
        <span className="mr-4 rounded-lg bg-purple-600 px-4 py-1 text-white">
          {name}
        </span>
        <button className="text-sm font-thin text-gray-500  hover:underline dark:text-gray-300">
          Upgrade
        </button>
      </div>
    </div>
  );
};
export default WorkspacePlan;
