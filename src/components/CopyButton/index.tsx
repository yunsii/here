import { CopyOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export interface CopyButtonProps {
  className?: string;
  text: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  onCopy?: (text: string, result: boolean) => void;
}

export default function CopyButton(props: CopyButtonProps) {
  const { className, text, onCopy, ...rest } = props;

  return (
    <CopyToClipboard text={text} onCopy={onCopy}>
      <CopyOutlined
        className={classNames(
          'flex justify-center items-center text-primary-color border border-gray-300 cursor-pointer bg-light-50 hover:bg-light-400 active:bg-light-800',
          className,
        )}
        {...rest}
      />
    </CopyToClipboard>
  );
}
