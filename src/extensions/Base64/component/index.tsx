import { useControllableValue } from 'ahooks';
import classNames from 'classnames';
import * as Base64 from 'js-base64';
import { MessageBar, MessageBarType } from '@fluentui/react';

import Container from '@/extensions/components/Container';
import CopyButton from '@/components/CopyButton';

interface InputProps {
  name: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

function Input(props: InputProps) {
  const { name, className } = props;

  const [value, setValue] = useControllableValue<string>(props);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  return (
    <div className={classNames('relative flex flex-col', className)}>
      <div className='h-32px flex items-center'>
        <span className='mr-8px'>{name}</span>
        {copied && (
          <div className='flex-1'>
            <MessageBar messageBarType={MessageBarType.success}>Copied</MessageBar>
          </div>
        )}
      </div>
      <textarea
        className='outline-none flex-1 min-h-240px p-4px resize-none'
        value={value || ''}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <CopyButton
        className='absolute right-4px bottom-4px w-30px h-30px'
        text={value || ''}
        onCopy={(text, done) => {
          setCopied(done);
        }}
      />
    </div>
  );
}

export default function Base64Extension() {
  const [decodeText, setDecodeText] = useState<string>();
  const [encodeText, setEncodeText] = useState<string>();

  const handleDecodeTextChange = (text = '') => {
    setDecodeText(text);
    setEncodeText(Base64.encode(text));
  };

  const handleEncodeTextChange = (text = '') => {
    setEncodeText(text);
    setDecodeText(Base64.decode(text));
  };

  return (
    <Container>
      <Input
        name='原始文本'
        className='flex-1 mr-4px <xl:mr-0 <xl:mb-8px'
        value={decodeText}
        onChange={handleDecodeTextChange}
      />
      <Input
        name='编码后文本'
        className='flex-1 ml-4px <xl:ml-0'
        value={encodeText}
        onChange={handleEncodeTextChange}
      />
    </Container>
  );
}
