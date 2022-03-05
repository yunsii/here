import { SettingOutlined, QuestionOutlined } from '@ant-design/icons';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import windows from '@/models/windows';
import Registry from '@/extensions/core/registry';
import IconWrapper from '@/components/IconWrapper';

import Tile from './Tile';

export interface IPanelProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function Panel(props: IPanelProps) {
  const { onClick } = props;

  const extensions = Registry.extension.getAll();

  useLayoutEffect(() => {
    const ps = new PerfectScrollbar('#tile-container');

    return () => {
      ps.destroy();
    };
  }, []);

  return (
    <div className='w-688px h-600px flex bg-[#282828]'>
      <div className='w-48px h-full flex flex-col justify-end text-white'>
        <IconWrapper icon={<QuestionOutlined />} />
        <IconWrapper icon={<SettingOutlined />} />
      </div>
      <div id='tile-container' className='relative w-full h-600px pt-15px pr-15px overflow-auto'>
        <div className='grid grid-cols-5 grid-rows-[repeat(auto-fill,120px)] gap-6px'>
          {extensions.map((item) => {
            return (
              <Tile
                key={item.key}
                icon={item.icon}
                name={item.shortName}
                onClick={(event) => {
                  windows.open(item.key);
                  onClick?.(event);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
