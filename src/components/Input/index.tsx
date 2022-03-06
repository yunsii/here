import { useControllableValue } from 'ahooks';

export interface InputProps {
  placeholder?: React.ReactNode;
  addonAfter?: React.ReactNode;
  addonBefore?: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  inputRef?: React.LegacyRef<HTMLInputElement>;
}

const Input = forwardRef((props: InputProps, ref?: React.LegacyRef<HTMLInputElement>) => {
  const {
    placeholder,
    addonAfter,
    addonBefore,
    value: inputValue,
    onChange,
    onBlur,
    onKeyDown,
    inputRef,
    ...rest
  } = props;

  const [value, setValue] = useControllableValue<string>(props);
  const [focused, setFocused] = useState(false);

  return (
    <div
      {...rest}
      ref={ref}
      className='relative w-full h-input-height flex items-center rounded-full bg-light-300 overflow-hidden shadow-md'
    >
      {addonBefore && <div className='mx-8px select-none'>{addonBefore}</div>}
      <div className={`relative ${addonBefore ? '' : 'ml-18px'} flex flex-1`}>
        <input
          ref={inputRef}
          className='outline-none w-full bg-transparent'
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          value={value || ''}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          onKeyDown={onKeyDown}
        />
        {placeholder && !focused && !value && (
          <span className='absolute top-0 bottom-0 left-0 text-gray-500 select-none pointer-events-none'>
            {placeholder}
          </span>
        )}
      </div>
      {addonAfter && <div className='ml-auto mr-10px'>{addonAfter}</div>}
    </div>
  );
});

export default Input;
