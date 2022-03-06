import { Popup } from 'reactjs-popup';
import { useKeyPress, useThrottle } from 'ahooks';
import { Observer } from 'mobx-react-lite';

import Input from '@/components/Input';
import Registry from '@/extensions/core/registry';
import IconWrapper from '@/components/IconWrapper';
import windows from '@/models/windows';
import type { ExtensionConfig } from '@/extensions/core';

import type { PopupAction } from '../TaskBar';

export interface SearchBarProps {
  onClick?: () => void;
  /** reactjs-popup 不能直接挂载到父节点，导致给定弹出窗口宽度来对齐输入框 */
  width?: React.CSSProperties['width'];
}

export default function SearchBar(props: SearchBarProps) {
  const { width } = props;

  const extensions = Registry.extension.getAll();
  const popupRef = useRef<PopupAction>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>();
  const throttleInput = useThrottle(input?.trim(), {
    wait: 24,
  });

  const result = useMemo(() => {
    if (!throttleInput) {
      return [];
    }
    return extensions.filter((item) => {
      if (
        [item.shortName, item.displayName, item.displayName]
          .map((value) => value.toLowerCase())
          .some((value) => value.includes(throttleInput))
      ) {
        return true;
      }
      if (
        item.keywords
          ?.map((keyword) => keyword.toLowerCase())
          .some((value) => value.includes(throttleInput))
      ) {
        return true;
      }
      return false;
    });
  }, [extensions, throttleInput]);

  useEffect(() => {
    if (throttleInput && result.length) {
      popupRef.current?.open();
    } else {
      popupRef.current?.close();
    }
  }, [throttleInput, result]);

  useKeyPress('ctrl.k', (event) => {
    event.preventDefault();
    if (inputRef.current === document.activeElement) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  });

  const handleOpen = (extension: ExtensionConfig) => {
    setInput('');
    windows.open(extension.key);
  };

  return (
    <Popup
      trigger={
        <Input
          inputRef={inputRef}
          addonBefore='💡'
          addonAfter={
            <>
              <span className='ml-auto mr-10px'>
                <span className='key not-last:m-2px'>Ctrl</span>
                <span className='key'>K</span>
              </span>
            </>
          }
          placeholder='在 here 中搜索'
          value={input}
          onChange={setInput}
          onKeyDown={(event) => {
            if (event.key.toLowerCase() === 'enter' && result[0]) {
              handleOpen(result[0]);
            }
          }}
        />
      }
      arrow={false}
      offsetY={8}
      onClose={() => {
        setInput('');
      }}
      ref={popupRef}
      on={[]}
    >
      <Observer>
        {() => {
          return (
            <div className='rounded-8px p-8px bg-light-300 shadow-md' style={{ width }}>
              {result.map((item) => {
                return (
                  <div
                    key={item.key}
                    className='h-32px flex items-center rounded-8px cursor-default hover:bg-light-800 first:bg-light-800'
                    onClick={() => {
                      handleOpen(item);
                    }}
                  >
                    <IconWrapper
                      icon={item.icon}
                      style={{
                        width: 16,
                        height: 16,
                        marginLeft: 8,
                        marginRight: 8,
                      }}
                    />
                    {item.displayName}
                  </div>
                );
              })}
            </div>
          );
        }}
      </Observer>
    </Popup>
  );
}
