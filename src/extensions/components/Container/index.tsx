export interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Container(props: ContainerProps) {
  const { className, ...rest } = props;

  return <div className='flex px-8px pt-8px w-full min-h-360px <xl:flex-col' {...rest} />;
}
