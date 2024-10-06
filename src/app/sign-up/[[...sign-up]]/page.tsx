import Logo from '@/components/Logo'
import { SignUp } from '@clerk/nextjs'
import { ReactNode } from 'react'

export default function Page({children}:{children: ReactNode}) {
  return(
    <div className=' relative flex  h-screen w-full flex-col items-center justify-center '>
     
        <div className='m-12'>{children}

</div>
<SignUp />
    </div>
  ) 
}