import { initializeIcons } from '@fluentui/font-icons-mdl2';
initializeIcons();

import '@/extensions/Base64/register';
import '@/extensions/Emoticon/register';

export interface IRootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout(props: IRootLayoutProps) {
  const { children } = props;

  return children;
}
