export interface SearchBarProps {
  onClick?: () => void;
}

export default function SearchBar(props: SearchBarProps) {
  const {} = props;

  return (
    <div
      className='w-full h-search-bar-height flex items-center rounded-full bg-light-300 select-none'
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
      }}
    >
      <span className='text-gray-500 m-10px'>💡 在 here 中搜索</span>
      {/* <span className='ml-auto mr-10px'>
        <span className='key not-last:m-2px'>Ctrl</span>
        <span className='key'>K</span>
      </span> */}
    </div>
  );
}
