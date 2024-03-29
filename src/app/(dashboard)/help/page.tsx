'use client'
import React from "react";
import { Fira_Sans } from 'next/font/google'

const firasans = Fira_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

const PlayerScreen = () => {
  return (
    <>
    <div className={`${firasans.className} grow h-full`}>
      <div className="mb-6 pb-6 border-b-1 border-white">
        <p className="">Saminta adalah sistem yang membantu para host / streamer MLBB yang menyediakan jasa mabar dengan para viewers untuk mengelola pencatatan dan antrean dari setiap match.</p>
      </div>
      <div className="">
        <p className="text-2xl">Tutorial Penggunaan</p>
        <div className="p-8">
          <ol className="list-decimal help-tutorial">
            <li>Hibernasi adalah pemain yang lama tidak ada kabar dan tidak akan pernah masuk antrian sampai status hibernasinya dicabut</li>
            <li>Kami tidak menyimpan perubahan terhadap tipe antrian dan menaikkan/menurunkan posisi antrian pemain. Sehingga antrian akan kembali seperti semula apabila melakukan reload/refresh halaman</li>
          </ol>
        </div>
      </div>
    </div>
    </>
  )
}

export default PlayerScreen;