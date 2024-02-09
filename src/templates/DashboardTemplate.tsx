import { type ReactNode } from 'react';
import { Fira_Sans } from 'next/font/google';
import {BottomNavigation} from '@/app/component/BottomNavigation';

type IBaseTemplateProps = {
    children: ReactNode;
}

const firasans = Fira_Sans({
    weight: '400',
    subsets: ['latin'],
    display: 'swap'
})

const DashboardTemplate = (props: IBaseTemplateProps) => {

    return (
      <div className={`w-full flex align-center items-center justify-center`}>
        <div className="relative h-screen w-full sm:w-4/6 xl:w-4/12 bg-stone-800 text-white">
          <div className="h-full relative flex flex-col justify-center pt-8 pb-28 px-6 overflow-hidden ">
          {props.children}
          </div>
          <div className='fixed bottom-0 w-inherit'>
            <BottomNavigation />
          </div>
        </div>
      </div>
    )
}

export { DashboardTemplate };