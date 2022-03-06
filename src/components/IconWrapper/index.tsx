import classNames from 'classnames';

export interface IconWrapperProps
  extends Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'ref'
  > {
  icon: string | JSX.Element;
  /** SVG 图标可配置 */
  highlight?: boolean;
  iconStyle?: React.CSSProperties;
  afterClick?: React.MouseEventHandler<HTMLDivElement>;
}

const IconWrapper = forwardRef((props: IconWrapperProps, ref?: React.Ref<HTMLDivElement>) => {
  const {
    highlight,
    icon,
    iconStyle,
    onClick,
    afterClick,
    className: inputClassName,
    ...rest
  } = props;

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    onClick?.(event);
    afterClick?.(event);
  };

  let className =
    'w-task-bar-size h-task-bar-size flex justify-center items-center hover:bg-second-color svg:text-white';
  if (highlight) {
    className = `${className} svg:hover:text-highlight-color svg:focus:text-active-color`;
  }

  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <img src={icon} style={iconStyle} />;
    }
    return cloneElement(icon, { style: iconStyle });
  };

  return (
    <div
      onClick={handleClick}
      {...rest}
      ref={ref}
      className={classNames(className, inputClassName)}
    >
      {renderIcon()}
    </div>
  );
});

export default IconWrapper;
