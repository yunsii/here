import { Popup } from 'reactjs-popup';
import { MenuOutlined } from '@ant-design/icons';
import { Observer } from 'mobx-react-lite';

import windows from '@/models/windows';
import Registry from '@/extensions/core/registry';
import IconWrapper from '@/components/IconWrapper';

import Panel from './Panel';
import AboutPopup from './AboutPopup';

export interface PopupAction {
  close: () => void;
  open: () => void;
  toggle: () => void;
}

export default function TaskBar() {
  const popupRef = useRef<PopupAction>(null);

  const fixedExtensions = Registry.extension.getFixedToTaskBar();
  const aboutPopupRef = useRef<PopupAction>(null);

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
      <Observer>
        {() => {
          return (
            <>
              {fixedExtensions.map((item) => {
                return (
                  <IconWrapper
                    key={item.key}
                    icon={item.icon}
                    iconStyle={{
                      height: 24,
                    }}
                    onClick={() => {
                      const targetWindow = windows.find(
                        (windowItem) => windowItem.key === item.key,
                      );
                      if (targetWindow) {
                        if (targetWindow.minimized) {
                          targetWindow.active();
                        } else {
                          targetWindow.minimize();
                        }
                      } else {
                        windows.open(item.key);
                      }
                    }}
                  />
                );
              })}
            </>
          );
        }}
      </Observer>
      <Observer>
        {() => {
          return (
            <>
              {windows
                .filter((item) => !fixedExtensions.some((ext) => ext.key === item.key))
                .map((item) => {
                  const ext = Registry.extension.get(item.key)!;
                  return (
                    <IconWrapper
                      key={item.key}
                      icon={ext.icon}
                      iconStyle={{
                        height: 24,
                      }}
                      onClick={() => {
                        const targetWindow = windows.find(
                          (windowItem) => windowItem.key === item.key,
                        );
                        if (targetWindow) {
                          targetWindow.minimize();
                        } else {
                          windows.open(item.key);
                        }
                      }}
                    />
                  );
                })}
            </>
          );
        }}
      </Observer>
    </div>
  );
}
