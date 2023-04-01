type CardProps = {
  children: React.ReactNode;
  grid?: boolean;
};

const Card = ({ children, grid = false }: CardProps) => {
  return (
    <section
      className={`${
        grid && 'grid grid-cols-7 gap-4'
      } mb-10 rounded-lg bg-white px-6 pt-8 pb-4 drop-shadow-xl transition duration-300 ease-in-out dark:bg-slate-800`}
    >
      {children}
    </section>
  );
};
export default Card;
