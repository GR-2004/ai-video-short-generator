import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='p-3 px-5 flex items-center justify-between shadow-lg'>
      <div className='flex gap-3 items-center'>
        <Image src='/ai-video-logo.png' alt='logo' width={60} height={60} />
        <h2 className='font-bold text-xl'>Ai Short Vid</h2>
      </div>
      <div className='flex gap-3 items-center'>
        <Button>Dashboard</Button>
        <UserButton/>
      </div>
    </div>
  )
}

export default Header
