import classNames from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Container from '@/extensions/components/Container';

import { emoji, kaomoji } from './data';

export interface CellProps {
  name: string;
  data: string[];
  className?: string;
}

function Panel(props: CellProps) {
  const { name, data, className } = props;

  return (
    <div className='w-full h-full flex flex-col'>
      <div>{name}</div>
      <div className={classNames('flex-1', className)}>
        {data.map((item) => {
          return (
            <CopyToClipboard key={item} text={item}>
              <div className='py-16px flex justify-center items-center bg-light-50 hover:bg-light-400 active:bg-light-800'>
                {item}
              </div>
            </CopyToClipboard>
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
        <Panel
          name='emoji'
          data={emoji}
          className='text-size-48px grid grid-cols-10 auto-rows-min <md:text-size-40px <md:grid-cols-6'
        />
      </div>
      <div className='flex-1 pl-4px <xl:pl-0'>
        <Panel
          name='颜文字'
          data={kaomoji}
          className='text-size-36px grid grid-cols-4 auto-rows-min <md:text-size-24px <md:grid-cols-2'
        />
      </div>
    </Container>
  );
}
