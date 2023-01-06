import Card from '../Card';

type ProfileCardProps = {
  name: string;
  title: string;
  team: string;
  email: string;
};

const ProfileCard = ({ name, title, team, email }: ProfileCardProps) => {
  return (
    <Card>
      <img
        src="https://thispersondoesnotexist.com/image"
        alt="profile picture"
        className="mr-5 h-20 w-20 rounded-full"
      />
      <div className="">
        <h2 className="text-sky-500 sm:text-xl md:text-2xl">{name}</h2>
        <h3 className="text-slate-600 sm:text-sm md:text-base">{title}</h3>
        <h4 className="font-light text-slate-400 sm:text-xs md:text-base">{`${team}, ${email}`}</h4>
      </div>
    </Card>
  );
};
export default ProfileCard;
