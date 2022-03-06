import styles from './index.module.less';

export interface TileProps {
  icon?: string | JSX.Element;
  name: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function Tile(props: TileProps) {
  const { icon, name, onClick } = props;

  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <img className='h-full' src={icon} />;
    }
    return icon;
  };

  return (
    <div
      className={`relative w-120px h-120px flex justify-center items-center bg-[#4e4e4e]
      hover:bg-[#545454] ${styles.tile}`}
      onClick={onClick}
    >
      <div className='w-40px h-40px'>{renderIcon()}</div>
      <span className='absolute right-4px bottom-1px left-4px text-white text-xs whitespace-nowrap font-light'>
        {name}
      </span>
    </div>
  );
}
