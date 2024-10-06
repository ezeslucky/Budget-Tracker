import Logo from '@/components/Logo'
import { SignIn } from '@clerk/nextjs'
import { ReactNode } from 'react'

export default function Page({children}:{children: ReactNode}) {
  return(
<div className=' relative flex  h-screen w-full flex-col items-center justify-center '>
    <Logo/>
    <div className='m-12'>{children}

    </div>
<SignIn />
</div>
  )
  
 
}