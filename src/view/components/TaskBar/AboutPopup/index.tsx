import { Popup } from 'reactjs-popup';

import Window from '@/components/Window';

import styles from './index.module.less';

import type { RefObject } from 'react';
import type { PopupAction } from '..';

export interface AboutPopupProps {
  actionRef?: RefObject<PopupAction>;
}

export default function AboutPopup(props: AboutPopupProps) {
  const { actionRef } = props;

  const [visible, setVisible] = useState(false);

  return (
    <Popup
      ref={actionRef}
      trigger={<div />}
      modal
      open={visible}
      onClose={() => {
        setVisible(false);
      }}
    >
      {(close: () => void) => {
        return (
          <div className='w-500px h-600px'>
            <Window name='关于' canMinimize={false} onClose={close}>
              <div className='p-8px flex-1 h-full flex flex-col'>
                <span className='pb-4px border-b border-gray-200'>
                  &gt; 如果不去做的话，那就意味着不重要，至少现目前来看。
                </span>
                <div className='flex items-center text-sky-500'>
                  <a
                    href='https://github.com/yunsii/here'
                    target='_blank'
                    rel='noreferrer'
                    className='hover:text-sky-600'
                  >
                    Github 仓库
                  </a>
                  <span className='m-8px cursor-default'>•</span>
                  <a
                    href='https://github.com/yunsii'
                    target='_blank'
                    rel='noreferrer'
                    className='hover:text-sky-600'
                  >
                    yunsii (云深)
                  </a>
                </div>
                <div className='mt-auto pt-4px border-t border-gray-200'>
                  <div>其他</div>
                  <ul className='ml-12px'>
                    <li className={styles.li}>
                      <a href='https://www.flaticon.com/free-icons/emoji' title='emoji icons'>
                        Part of icons created by Pixel perfect - Flaticon
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Window>
          </div>
        );
      }}
    </Popup>
  );
}
