import Sidebar from './Sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

// const description = 'Generic description variable';
// export const siteTitle = 'Generic description title';

export default function Layout({ children }: LayoutProps) {
  return <Sidebar children={children} />;
}
