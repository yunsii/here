import classNames from 'classnames';

import type { IconWrapperProps } from '@/components/IconWrapper';
import IconWrapper from '@/components/IconWrapper';

export interface TaskItemProps extends IconWrapperProps {
  activated?: boolean;
  focused?: boolean;
}

export default function TaskItem(props: TaskItemProps) {
  const { activated, focused, style, className, ...rest } = props;

  return (
    <div className={classNames('relative', className)} style={style}>
      <IconWrapper
        className={classNames({
          'bg-[#6d6768] hover:bg-[#7b7577]': focused,
        })}
        {...rest}
      />
      {activated && <div className='absolute right-0 bottom-0 left-0 h-3px bg-sky-400' />}
    </div>
  );
}
