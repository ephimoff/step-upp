import Card from '../Card';
import NoAvatar from '../NoAvatar';

type ProfileCardProps = {
  name: string;
  title: string;
  team: string;
  email: string;
  userpic: string;
};

const ProfileCard = ({
  name,
  title,
  team,
  email,
  userpic,
}: ProfileCardProps) => {
  return (
    <Card>
      <div className="flex">
        <div className="mr-5">
          {userpic ? (
            <img
              src={userpic}
              alt="profile picture"
              className="h-20 w-20 rounded-full"
            />
          ) : (
            <NoAvatar name={name} size={20} />
          )}
        </div>

        <div className="">
          <h2 className="text-sky-500 sm:text-xl md:text-2xl">{name}</h2>
          <h3 className="text-slate-600 sm:text-sm md:text-base">{title}</h3>
          <h4 className="font-light text-slate-400 sm:text-xs md:text-base">
            {team ? `${team}, ` : null} {email}
          </h4>
        </div>
      </div>
    </Card>
  );
};
export default ProfileCard;
