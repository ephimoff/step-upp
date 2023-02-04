type CardProps = {
  children: React.ReactNode;
  grid?: boolean;
};

const Card = ({ children, grid = false }: CardProps) => {
  return (
    <section
      className={`${
        grid && 'grid grid-cols-7 gap-4'
      } mb-10 rounded-xl bg-white py-4 px-6 drop-shadow-2xl dark:bg-slate-800`}
    >
      {children}
    </section>
  );
};
export default Card;
