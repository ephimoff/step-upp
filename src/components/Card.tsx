type CardProps = {
  children: React.ReactNode;
  grid?: boolean;
};

const Card = ({ children, grid = false }: CardProps) => {
  return (
    <section
      className={`${
        grid && 'grid grid-cols-5 gap-4'
      } my-10 rounded-xl bg-slate-900 py-4 px-6 drop-shadow-2xl`}
    >
      {children}
    </section>
  );
};
export default Card;
