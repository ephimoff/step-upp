type SpinnerProps = {
  props?: string;
};

const Spinner = ({ props }: SpinnerProps) => {
  return (
    <div className="flex items-center">
      <span className="block h-6 w-6 animate-spin rounded-full border-2 border-purple-600 border-t-gray-800"></span>
    </div>
  );
};
export default Spinner;
