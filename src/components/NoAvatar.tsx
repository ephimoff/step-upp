import { User } from 'lucide-react';

type Props = {
  // name: string;
  size: number;
};

// const LIST_OF_GRADIENTS = [
//   `from-[#f953c6] to-[#b91d73]`,
//   `from-[#b92b27] to-[#b92b27]`,
//   `from-[#8E2DE2] to-[#4A00E0]`,
//   `from-[#f12711] to-[#f12711]`,
//   `from-[#ED213A] to-[#93291E]`,
//   `from-[#4e54c8] to-[#8f94fb]`,
//   `from-[#22c1c3] to-[#fdbb2d]`,
//   `from-[#000000] to-[#0f9b0f]`,
// ];

// function getInitials(name: string) {
//   let initials = '';
//   if (name) {
//     const arr = name.split(' ');

//     if (arr.length < 1) {
//       return name;
//     } else if (arr.length >= 2) {
//       initials =
//         arr[0].charAt(0).toUpperCase() + arr[1].charAt(0).toUpperCase();
//     } else {
//       initials = arr[0].charAt(0).toUpperCase();
//     }
//   }

//   return initials;
// }

// function generateGradient(arr: string[]) {
//   const randomNumber = Math.floor(Math.random() * (arr.length - 1));
//   return arr[randomNumber];
// }

const NoAvatar = ({ size }: Props) => {
  const width = `w-${size}`;
  const height = `h-${size}`;
  return (
    // <div className=" bg-yellow-500">
    <User
      className={`mr-8 ${width} ${height} relative left-1/2  -translate-x-1/2 rounded-full bg-gradient-to-br from-purple-300 to-green-300 p-1 text-center text-black`}
      strokeWidth={3}
    />
    // </div>
  );
};
export default NoAvatar;
