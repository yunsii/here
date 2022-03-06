import { emoji, kaomoji } from './data';

export interface CellProps {
  name: string;
  data: string[];
}

function Panel(props: CellProps) {
  const { name, data } = props;

  return (
    <div className='w-full h-full flex flex-col'>
      <div>{name}</div>
      <div className='flex-1 text-size-36px grid grid-cols-5 grid-rows-[repeat(auto-fill,64px)] gap-6px'>
        {data.map((item) => {
          return (
            <div key={item} className='flex justify-center items-center bg-light-50'>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function EmoticonExtension() {
  return (
    <div className='flex p-8px w-full min-h-240px h-60vh'>
      <div className='flex-1 pr-4px'>
        <Panel name='emoji' data={emoji} />
      </div>
      <div className='flex-1 pl-4px'>
        <Panel name='颜文字' data={kaomoji} />
      </div>
    </div>
  );
}
