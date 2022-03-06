import { Observer } from 'mobx-react-lite';
import { useUnmount } from 'ahooks';

import Registry from '@/extensions/core/registry';
import windows from '@/models/windows';
import IconWrapper from '@/components/IconWrapper';
import Window from '@/components/Window';

import SearchBar from './components/SearchBar';
import TaskBar from './components/TaskBar';

export default function Home() {
  useUnmount(() => {
    windows.clear();
  });

  return (
    <div
      className='w-100vw h-100vh relative'
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1645037077639-7e3d8e72f88d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
        backgroundSize: 'cover',
      }}
    >
      <div className='p-12px'>
        <SearchBar width={'calc(100vw - 24px)'} />
      </div>
      <Observer>
        {() => {
          return (
            <>
              {windows.map((item) => {
                const ext = Registry.extension.get(item.key)!;
                return (
                  <Window
                    key={item.handle}
                    className='absolute top-0 right-0 bottom-48px left-0'
                    name={
                      <div className='flex'>
                        <IconWrapper
                          icon={ext.icon}
                          style={{
                            width: 24,
                            height: 24,
                            marginRight: 4,
                          }}
                        />
                        {ext.displayName}
                      </div>
                    }
                    minimized={item.minimized}
                    onMinimized={() => windows.minimize(item.handle)}
                    onClose={() => windows.close(item.handle)}
                  >
                    {createElement(ext.component)}
                  </Window>
                );
              })}
            </>
          );
        }}
      </Observer>
      <div className='absolute right-0 bottom-0 left-0'>
        <TaskBar />
      </div>
    </div>
  );
}
