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

const DashboardTemplate = (props: IBaseTemplateProps) => {

    return (
        <div className={`${firasans.className} w-full flex align-center items-center justify-center`}>
            <div className="relative h-screen w-full sm:w-4/6 xl:max-w-2xl bg-stone-800 text-white">
                <main>
                    {props.children}
                </main>
            </div>
        </div>
    )
}

export { DashboardTemplate };