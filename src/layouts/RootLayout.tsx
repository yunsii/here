import '@/extensions/Base64/register';

export interface IRootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout(props: IRootLayoutProps) {
  const { children } = props;

  return children;
}
