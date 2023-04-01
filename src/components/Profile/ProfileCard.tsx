import { Phone, Twitter, Github } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import {
  parseLinkedinUrl,
  parseTwitterUrl,
  parseGithubUrl,
} from '@/utils/functions';
import Image from 'next/image';
import Card from '../Card';
import NoAvatar from '../NoAvatar';
import CopyToClipboard from '../CopyToClipboard';
import Link from 'next/link';

type Props = {
  name: string;
  title: string;
  team: string;
  email: string;
  userpic: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  phone?: string;
  isSameProfile: boolean;
};

const ProfileCard = ({
  name,
  title,
  team,
  email,
  userpic,
  github,
  linkedin,
  twitter,
  phone,
  isSameProfile,
}: Props) => {
  return (
    <Card>
      <div className="flex">
        <div className="mr-5">
          {userpic ? (
            <Image
              src={userpic}
              alt="profile picture"
              className="h-20 w-20 rounded-full"
              width={80}
              height={80}
            />
          ) : (
            <NoAvatar size={20} />
          )}
        </div>

        <div className="">
          <h2 className="flex items-center font-semibold text-[#1ca965] sm:text-xl md:text-2xl">
            {name}
            {isSameProfile && (
              <span className="ml-4 whitespace-nowrap rounded-lg bg-slate-500 px-3 py-1 text-xs text-slate-200">
                Your profile
              </span>
            )}
          </h2>
          <h3 className="text-slate-400 sm:text-sm md:text-base">
            {title}
            {team ? ` in ${team}` : null}
          </h3>
          {email ? (
            <h4 className="flex items-center font-light  text-purple-500 sm:text-xs md:text-sm">
              {email} <CopyToClipboard copyText={email} />
            </h4>
          ) : null}
          <div className="my-2 flex text-xs font-thin dark:text-gray-300">
            {linkedin ? (
              <span className="mr-4 flex items-center">
                <FaLinkedin size={12} className="mr-1" />
                <Link href={linkedin} className="underline underline-offset-2">
                  {parseLinkedinUrl(linkedin)}
                </Link>
              </span>
            ) : null}
            {github ? (
              <span className="mr-4 flex items-center">
                <Github size={12} className="mr-1" />
                <Link
                  href={'https://github.com/' + parseGithubUrl(github)}
                  className="underline underline-offset-2"
                >
                  {parseGithubUrl(github)}
                </Link>
              </span>
            ) : null}
            {twitter ? (
              <span className="mr-4 flex items-center">
                <Twitter size={12} className="mr-1" />
                <Link
                  href={'https://twitter.com/' + parseTwitterUrl(twitter)}
                  className="underline underline-offset-2"
                >
                  @{parseTwitterUrl(twitter)}
                </Link>
              </span>
            ) : null}
            {phone ? (
              <span className="mr-4 flex items-center">
                <Phone size={12} className="mr-1" />
                <span>{phone}</span>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
};
export default ProfileCard;
