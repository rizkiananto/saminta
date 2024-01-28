import { type ReactNode } from 'react';
import { Fira_Sans } from 'next/font/google';

type IBaseTemplateProps = {
    children: ReactNode;
}

const firasans = Fira_Sans({
    weight: '400',
    subsets: ['latin'],
    display: 'swap'
})

const BaseTemplate = (props: IBaseTemplateProps) => {
    return (
      <div className={`w-full flex align-center items-center justify-center`}>
        <div className="relative h-screen w-full sm:w-4/6 xl:w-4/12 bg-stone-800 text-white">
          <div className="h-full relative flex flex-col px-6 overflow-hidden ">
          {props.children}
          </div>
        </div>
      </div>
    )
}

export { BaseTemplate };