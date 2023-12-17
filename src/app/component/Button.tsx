'use client'
import { useRouter } from 'next/navigation'

type BtnProps = {
  label: string, 
  type: string
}

const ButtonPrimary = ({label}: {label:string}) => {
  const router = useRouter();

  return (
    <button className="text-white bg-green-800 py-2 px-6 rounded-md" onClick={() => router.push('/antri')}>{label}</button>
  )
}

export const Button = ({ label, type }: BtnProps) => {
  return (
    <>
      {type === 'primary' && <ButtonPrimary label={label} /> }
      {type === 'secondary' && 
        <button className="text-green-400 py-2 px-6 rounded-md">{label}</button>
      }
    </>
  )
}
