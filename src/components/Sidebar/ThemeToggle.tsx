import { useTheme } from 'next-themes';
import { HiSun, HiMoon } from 'react-icons/hi2';

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="flex items-center justify-center rounded-lg bg-gray-100 p-2 transition-colors hover:bg-purple-500  dark:bg-gray-900 dark:hover:bg-purple-500"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? (
        <HiMoon size={20} className="h-5 w-5 text-blue-900" />
      ) : (
        <HiSun className="h-5 w-5 text-orange-300" />
      )}
    </button>
  );
};
export default ThemeToggle;
