'use client'
import React, { useEffect, useState } from "react";
import { Fira_Sans } from 'next/font/google'
import {
  Card, Input, Divider, Chip, Button
} from "@nextui-org/react";
import { supabase } from "@/lib/supabase";
import { ModalConfirmLogout } from "./modal";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { DashboardTemplate } from "@/templates/DashboardTemplate";

const firasans = Fira_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

const SettingsScreen = () => {
  const [modalConfirmShow, setModalConfirmShow] = useState<boolean>(false)
  const router = useRouter();

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      toast.success('Anda telah Logout!');
      setModalConfirmShow(false)
      setTimeout(() => {
        router.replace('/')      
      }, 1000);
    }
    else console.log('logout error:', error)
  }

  const handleLogoutClick = () => {
    setModalConfirmShow(true);
  }
  
  return (
    <DashboardTemplate>
    <Toaster />
    <div className={`${firasans.className} grow h-full`}>
      <div className="">
        <p className="text-2xl">Pengaturan</p>
        <div className="mt-4">
          <Divider orientation="horizontal" className="bg-gray-700 my-2"/>
          <p className="text-xl mb-4">Akun</p>
          <Button 
            variant="ghost" 
            color="warning"
            onClick={handleLogoutClick}
            endContent={
              <svg className="fill-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="logout" height={24} width={24}><path d="M21.9 10.6c-.1-.1-.1-.2-.2-.3l-2-2c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l.3.3H16c-.6 0-1 .4-1 1s.4 1 1 1h2.6l-.3.3c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l2-2c.1-.1.2-.2.2-.3.1-.3.1-.5 0-.8z"></path><path d="M17 14c-.6 0-1 .4-1 1v1c0 .6-.4 1-1 1h-1V8.4c0-1.3-.8-2.4-1.9-2.8L10.5 5H15c.6 0 1 .4 1 1v1c0 .6.4 1 1 1s1-.4 1-1V6c0-1.7-1.3-3-3-3H5c-.1 0-.2 0-.3.1-.1 0-.2.1-.2.1l-.1.1c-.1 0-.2.1-.2.2v.1c-.1 0-.2.1-.2.2V18c0 .4.3.8.6.9l6.6 2.5c.2.1.5.1.7.1.4 0 .8-.1 1.1-.4.5-.4.9-1 .9-1.6V19h1c1.7 0 3-1.3 3-3v-1c.1-.5-.3-1-.9-1zM6 17.3V5.4l5.3 2c.4.2.7.6.7 1v11.1l-6-2.2z"></path></svg>
            }>
            Logout
          </Button>
        </div>
      </div>
    </div>
    <ModalConfirmLogout 
      isOpen={modalConfirmShow} 
      onOpenChange={() => {setModalConfirmShow(!modalConfirmShow)}} 
      onClose={() => {setModalConfirmShow(!modalConfirmShow)}} 
      onSubmit={signOut} />
    </DashboardTemplate>
  )
}

export default SettingsScreen;