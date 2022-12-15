type UserInfoProps = {
  name: string;
  title: string;
  team: string;
  email: string;
};

const UserInfo = ({ name, title, team, email }: UserInfoProps) => {
  return (
    <section className="mx-auto flex flex-wrap rounded-xl bg-slate-900 p-8 align-bottom shadow-lg sm:w-full md:w-3/5">
      <img
        src="https://thispersondoesnotexist.com/image"
        alt="profile picture"
        className="mr-5 h-20 w-20 overflow-visible rounded-full"
      />
      <div className="">
        <h2 className="text-sky-500 sm:text-xl md:text-2xl">{name}</h2>
        <h3 className="text-slate-600 sm:text-sm md:text-base">{title}</h3>
        <h4 className="font-light text-slate-400 sm:text-xs md:text-base">{`${team}, ${email}`}</h4>
      </div>
      {/* <div className="mx-5 text-sm font-normal">
        <p></p>
        <p></p>
      </div> */}
    </section>
  );
};
export default UserInfo;
