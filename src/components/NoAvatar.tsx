type NoAvatarProps = {
  name: string;
  size: number;
};

const LIST_OF_GRADIENTS = [
  `from-[#f953c6] to-[#b91d73]`,
  `from-[#b92b27] to-[#b92b27]`,
  `from-[#8E2DE2] to-[#4A00E0]`,
  `from-[#f12711] to-[#f12711]`,
  `from-[#ED213A] to-[#93291E]`,
  `from-[#4e54c8] to-[#8f94fb]`,
  `from-[#22c1c3] to-[#fdbb2d]`,
  `from-[#000000] to-[#0f9b0f]`,
];

function getInitials(name: string) {
  const arr = name.split(' ');
  let initials = '';
  if (arr.length < 1) {
    return name;
  } else if (arr.length >= 2) {
    initials = arr[0].charAt(0).toUpperCase() + arr[1].charAt(0).toUpperCase();
  } else {
    initials = arr[0].charAt(0).toUpperCase();
  }
  return initials;
}

// function generateGradient(arr: string[]) {
//   const randomNumber = Math.floor(Math.random() * (arr.length - 1));
//   return arr[randomNumber];
// }

const NoAvatar = ({ name, size }: NoAvatarProps) => {
  const randomGradient = `from-[#f953c6] to-[#b91d73]`;
  const width = `w-${size}`;
  const height = `h-${size}`;
  return (
    <div
      className={`${randomGradient} ${width} ${height} flex items-center justify-center rounded-full bg-gradient-to-br text-3xl font-bold text-white shadow-lg`}
    >
      {getInitials(name)}
    </div>
  );
};
export default NoAvatar;
