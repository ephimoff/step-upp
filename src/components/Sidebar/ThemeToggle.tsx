import { useTheme } from 'next-themes';
import { HiSun, HiMoon } from 'react-icons/hi2';

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      aria-lable="Toggle Dark Mode"
      type="button"
      className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-purple-500"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? (
        <HiSun className="h-5 w-5 text-orange-300" />
      ) : (
        <HiMoon size={20} className="h-5 w-5 text-blue-900" />
      )}
    </button>
  );
};
export default ThemeToggle;
