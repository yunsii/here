import { MinusOutlined, CloseOutlined } from '@ant-design/icons';

export interface WindowProps {
  name: React.ReactNode;
  children: React.ReactNode;
  minimized?: boolean;
  onMinimized?: React.MouseEventHandler<HTMLSpanElement>;
  onClose?: React.MouseEventHandler<HTMLSpanElement>;
}

export default function Window(props: WindowProps) {
  const { name, children, minimized, onMinimized, onClose } = props;

  return (
    <div
      className='absolute top-0 right-0 bottom-48px left-0 flex flex-col bg-[#f3f3f3]'
      style={{
        overflow: 'hidden',
        height: minimized ? '0' : 'auto',
      }}
    >
      <div className='h-36px flex justify-between items-center pl-4px border-width-1px border-[#dddddd]'>
        <div>{name}</div>
        <div className='flex self-stretch'>
          <MinusOutlined
            className='w-48px self-stretch flex justify-center items-center hover:bg-gray-300'
            onClick={onMinimized}
          />
          <CloseOutlined
            className='w-48px self-stretch flex justify-center items-center hover:bg-red-600 svg:hover:text-white'
            onClick={onClose}
          />
        </div>
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  );
}
