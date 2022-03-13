import { MinusOutlined, CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';

export interface WindowProps {
  name: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  canMinimize?: boolean;
  minimized?: boolean;
  onMinimized?: React.MouseEventHandler<HTMLSpanElement>;
  onClose?: React.MouseEventHandler<HTMLSpanElement>;
}

export default function Window(props: WindowProps) {
  const { name, className, children, canMinimize = true, minimized, onMinimized, onClose } = props;

  return (
    <div
      className={classNames(
        'w-full flex flex-col bg-[#f3f3f3] border-width-1px border-[#dddddd]',
        className,
      )}
      style={{
        overflow: 'hidden',
        height: minimized ? '0' : 'calc(100% - 48px)',
        visibility: minimized ? 'hidden' : 'visible',
      }}
    >
      <div className='h-36px flex justify-between items-center pl-4px border-b border-[#dddddd]'>
        <div>{name}</div>
        <div className='flex self-stretch'>
          {canMinimize && (
            <MinusOutlined
              className='w-48px self-stretch flex justify-center items-center hover:bg-gray-300'
              onClick={onMinimized}
            />
          )}
          <CloseOutlined
            className='w-48px self-stretch flex justify-center items-center hover:bg-red-600 svg:hover:text-white'
            onClick={onClose}
          />
        </div>
      </div>
      <div className='flex-1 overflow-auto'>{children}</div>
    </div>
  );
}
