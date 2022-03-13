import classNames from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MessageBar, MessageBarType } from '@fluentui/react';

import Container from '@/extensions/components/Container';

import { emoji, kaomoji } from './data';

export interface PanelProps {
  name: string;
  data: Record<string, string[] | string>;
  className?: string;
  itemClassName?: string;
}

function Panel(props: PanelProps) {
  const { name, data, className, itemClassName } = props;

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='h-32px flex items-center'>
        <span className='mr-8px'>{name}</span>
        {copied && (
          <div className='flex-1'>
            <MessageBar messageBarType={MessageBarType.success}>Copied</MessageBar>
          </div>
        )}
      </div>
      <div className={classNames('flex flex-wrap', className)}>
        {Object.keys(data).map((key) => {
          const processedValue =
            typeof data[key] === 'string'
              ? ([...(data[key] as string)] as string[])
              : (data[key] as string[]);
          console.log('processedValue', processedValue);
          return (
            <div key={key} className='flex flex-wrap'>
              {processedValue.map((item) => {
                return (
                  <CopyToClipboard
                    key={item}
                    text={item}
                    onCopy={(text, done) => {
                      setCopied(done);
                    }}
                  >
                    <div
                      className={classNames(
                        'px-24px py-16px flex justify-center items-center hover:bg-light-50 active:bg-light-800',
                        itemClassName,
                      )}
                    >
                      {item}
                    </div>
                  </CopyToClipboard>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function EmoticonExtension() {
  return (
    <Container>
      <div className='flex-1 pr-4px <xl:pr-0'>
        <Panel name='emoji' data={emoji} className='text-size-48px' />
      </div>
      <div className='flex-1 pl-4px <xl:pl-0'>
        <Panel name='颜文字' data={kaomoji} className='text-size-36px' />
      </div>
    </Container>
  );
}
