import { Popup } from 'reactjs-popup';
import { MenuOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';

import windows from '@/models/windows';
import Registry from '@/extensions/core/registry';
import IconWrapper from '@/components/IconWrapper';

import TaskItem from './TaskItem';
import Panel from './Panel';
import AboutPopup from './AboutPopup';

export interface PopupAction {
  close: () => void;
  open: () => void;
  toggle: () => void;
}

const TaskBar = observer(() => {
  const popupRef = useRef<PopupAction>(null);

  const fixedExtensions = Registry.extension.getFixedToTaskBar();
  const aboutPopupRef = useRef<PopupAction>(null);

  const fixedWindows = windows.filter((item) =>
    fixedExtensions.some((ext) => ext.key === item.key && !!ext.fixedToTaskBar),
  );
  const generalWindows = windows.filter((item) =>
    fixedExtensions.some((ext) => ext.key === item.key && !ext.fixedToTaskBar),
  );

  return (
    <div className='w-full h-task-bar-size bg-primary-color flex select-none'>
      <Popup
        ref={popupRef}
        trigger={<IconWrapper highlight icon={<MenuOutlined />} />}
        position='top left'
        arrow={false}
      >
        <Panel
          onClickAbout={() => {
            aboutPopupRef.current?.open();
          }}
          afterClick={() => popupRef.current?.close()}
        />
      </Popup>
      <AboutPopup actionRef={aboutPopupRef} />
      {fixedExtensions.map((item) => {
        const targetWindow = fixedWindows.find((windowItem) => windowItem.key === item.key);
        return (
          <TaskItem
            key={item.key}
            activated={!!targetWindow}
            focused={targetWindow && windows.isFocus(targetWindow)}
            icon={item.icon}
            iconStyle={{
              height: 24,
            }}
            className='not-last:mr-2px'
            onClick={() => {
              if (targetWindow) {
                if (windows.isFocus(targetWindow)) {
                  windows.minimize(targetWindow.handle);
                } else {
                  windows.open(targetWindow.key);
                }
              } else {
                windows.open(item.key);
              }
            }}
          />
        );
      })}
      {generalWindows.map((item) => {
        const ext = Registry.extension.get(item.key)!;
        return (
          <TaskItem
            key={item.key}
            activated
            focused={windows.isFocus(item)}
            icon={ext.icon}
            iconStyle={{
              height: 24,
            }}
            onClick={() => {
              if (windows.isFocus(item)) {
                windows.minimize(item.key);
              } else {
                windows.open(item.key);
              }
            }}
          />
        );
      })}
    </div>
  );
});

export default TaskBar;
