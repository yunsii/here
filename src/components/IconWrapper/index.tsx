export interface IconWrapperProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  icon: string | JSX.Element;
  /** SVG 图标可配置 */
  highlight?: boolean;
  iconStyle?: React.CSSProperties;
}

const IconWrapper = forwardRef((props: IconWrapperProps, ref?: React.LegacyRef<HTMLDivElement>) => {
  const { highlight, icon, iconStyle, ...rest } = props;

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
    <div {...rest} ref={ref} className={className}>
      {renderIcon()}
    </div>
  );
});

export default IconWrapper;
