type ProgressBarProps = {
  value: number;
};

const ProgressBar = ({ value }: ProgressBarProps) => {
  return (
    <div className="flex h-full items-center gap-x-2">
      <span>
        {value <= 2
          ? '🍄'
          : value <= 4
          ? '🥕'
          : value <= 6
          ? '😎'
          : value <= 8
          ? '☘️'
          : '💎'}
      </span>
      <div className="h-2 w-1/2 rounded-xl bg-gray-300">
        <div
          style={{ width: `${value * 10}%` }}
          className={`h-full rounded-xl ${
            value <= 2
              ? 'bg-red-600'
              : value <= 4
              ? 'bg-orange-400'
              : value <= 6
              ? 'bg-yellow-400'
              : value <= 8
              ? 'bg-green-400'
              : 'bg-cyan-400'
          }`}
        ></div>
      </div>
      <span>{value}</span>
    </div>
  );
};
export default ProgressBar;
