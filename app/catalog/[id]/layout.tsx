import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function CamperLayout({ children }: Props) {
  return <div style={{ padding: '2rem' }}>{children}</div>;
}
