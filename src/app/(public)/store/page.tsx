'use client';

import Image from 'next/image'
import { Lilita_One, Fira_Sans } from 'next/font/google'
import { BaseTemplate } from '@/templates/BaseTemplate'
import Link from 'next/link'
import {
  Input, Button, Card, CardHeader, CardBody, Divider
} from "@nextui-org/react";
import {supabase} from '@/lib/supabase';
import iconPic from 'public/image1.png'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cloneDeep, findIndex } from 'lodash';

let priceToCurrency = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0
})

const lilita_one = Lilita_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

const fira_sans = Fira_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

const iconLightning = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" className="bi bi-lightning" viewBox="0 0 16 16">
  <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641zM6.374 1 4.168 8.5H7.5a.5.5 0 0 1 .478.647L6.78 13.04 11.478 7H8a.5.5 0 0 1-.474-.658L9.306 1z"/>
</svg>

interface cartItem {
  id: string,
  name: string, 
  price: number, 
  quantity: number,
}

interface CartProps {
  cart: cartItem[],
}

const product = {
  id: ~~(Math.random() * 100) + 1,
  image: "/img.png",
  name: "LEVI'S® WOMEN'S XL TRUCKER JACKET",
  price: 350000,
  description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusantium, aspernatur provident beatae corporis veniam atque facilis, consequuntur assumenda, vitae dignissimos iste exercitationem dolor eveniet alias eos ullam nesciunt voluptatum",
  colors: [
      { value: "putih", label: "Putih" },
      { value: "biru", label: "Biru" },
      { value: "coklat", label: "Coklat" },
      { value: "kuning", label: "Kuning" }
  ]
}

const CartSection = ({cart, user} : {cart:cartItem[], user:userData}) => {
  let totalPrice = 0;
  const checkout = async (params:any) => {
    const data = {
      id: String(product.id),
      totalPrice: totalPrice,
      items: cart,
      user_email: user.email
    }

    const response = await fetch('/api/tokenizer', {
      method: "POST",
      body: JSON.stringify(data)
    })

    const requestData = await response.json();

    window.snap.pay(requestData.token, {
      onSuccess: function(res:any) {
        console.log('sukses nih')
        console.log(res)
      },
      onError: function(res:any) {
        console.log('error nih')
        console.log(res)
      },
      onPending: function(res:any) {
        console.log('pending nih')
        console.log(res)
      },
      onClose: function(res: any) {
        console.log('gajdi ya?')
      }
    })
  }

  const enablePay = cart.length > 0 && user.email && user.game_id && user.nickname ? true : false

  return (
    <>
    <div>
      <div className='text-xs text-gray-400'>
        {cart.map((c:any, i:number) => {
          totalPrice = totalPrice+(c.price*c.quantity)
          return (
            <div key={i}>
              <p>{c.name} ({c.quantity}x) - {priceToCurrency.format(c.price*c.quantity)}</p>
            </div>
          )
        })}
      </div>
      {cart.length > 0 ?
      <p className='mt-2 font-bold text-yellow-400'>Total Pesanan : {priceToCurrency.format(totalPrice)}</p>
      :null}
    </div>
    <div className='text-center mt-6'>
      <Button isDisabled={!enablePay} color="primary" size='lg' variant='solid' onClick={checkout}>Bayar</Button>
    </div>
    </>
  )
}

const PRODUCT_LIST = [
  {
    id: '1',
    name: 'Main Bareng MLBB', 
    tag: 'main bareng influencer favoritmu',
    special_label: '',
    multi_buy: true, 
    price_label: '/ game',
    price: 20000,
    active: false,
    qty: 1 // this shouldnt come from db. just to get value from qty
  },
  {
    id: '2',
    name: 'Main Bareng MLBB', 
    tag: 'ngga perlu antri, langsung main!',
    special_label: 'Jalur Serobot', 
    multi_buy: true, 
    price_label: '/ game',
    price: 50000,
    active: false,
    qty: 1,
  },
  {
    id: '3',
    name: 'Komen Album', 
    tag: 'dapatkan komen eksklusif dari idolamu',
    special_label: '',
    multi_buy: false, 
    price_label: '',
    price: 10000,
    active: false,
    qty: 1,
  },
  {
    id: '4',
    name: 'Komen Album 2', 
    tag: 'dapatkan komen eksklusif dari idolamu',
    special_label: '',
    multi_buy: false, 
    price_label: '',
    price: 10000,
    active: false,
    qty: 1,
  },
]

interface userData {
  email: string,
  nickname: string, 
  game_id: string
}

const initialUserData: userData = {email: '', nickname: '', game_id: ''}

const FormSection = ({user, setData}: {user: userData, setData: (data:any) => any}) => {
  return (
    <>
    <div className='mb-4 text-center'>
      <p className='text-lg font-bold mb-0'>Data diri anda</p>
      <label className='text-sm text-gray-300'>isi data anda sebelum melakukan pembelian</label>
    </div>
    <div className='dark flex flex-col gap-2'>
      <Input
        type="email"
        label="Email Anda"
        name="email"
        radius='sm'
        color='default'
        variant='faded'
        value={user.email}
        onChange={(e) => {
          const newData = cloneDeep(user);
          newData.email = e.target.value;
          setData(newData)
        }}
      />
      <div className='flex gap-2'>
        <Input
          type="text"
          label="Nickname Game"
          name="password"
          color='default'
          variant='faded'
          radius='sm'
          value={user.nickname}
          onChange={(e) => {
            const newData = cloneDeep(user);
            newData.nickname = e.target.value;
            setData(newData)
          }}
        />
        <Input
          type="text"
          label="ID Game"
          name="password"
          color='default'
          variant='faded'
          radius='sm'
          value={user.game_id}
          onChange={(e) => {
            const newData = cloneDeep(user);
            newData.game_id = e.target.value;
            setData(newData)
          }}
        />
      </div>
    </div>
    </>
  )
}



const ProductSection = () => {
  const [cart, setCart] = useState<cartItem[]>([])
  const [userData, setUserData] = useState<userData>(initialUserData)
  const [prodList, setProdList] = useState<any[]>(PRODUCT_LIST)

  // load snap script
  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY!;
    const script = document.createElement('script');
    script.src = snapScript;
    script.setAttribute('data-client-key', clientKey);
    script.async = true;
    console.log('--> ', script)

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const addToCart = (p:any, initialAdd:boolean, definedQty:any) => {
    const newCart = cloneDeep(cart);
    const currentQty = initialAdd ? 1 : definedQty && definedQty > 0 ? definedQty : 1
    const itemExist = newCart.length > 0 ? newCart.findIndex((c:any) => c.id === p.id) : -1;
    if (itemExist !== -1) {
      newCart[itemExist].quantity = currentQty
      newCart[itemExist].price = p.price
    } else {
      newCart.push({
        id: p.id,
        name: `${p.name} ${p.special_label}`,
        price: p.price,
        quantity: currentQty,
      })
    }
    setCart(newCart)
  }

  return (
    <div className={`${fira_sans.className}text-white md:5/6 pb-96 product-page-h md:pb-24 overflow-auto no-scrollbar`}>
      <div className='mb-8'>
        <FormSection user={userData} setData={setUserData}/>
      </div>
      <div>
        <p className='text-center font-bold text-xl'>Mau minta apa dari host?</p>
        <div className='flex flex-row flex-wrap gap-5 my-8 overflow-auto no-scrollbar'>
          {prodList.map((p:any, i:number) => {
            let qty = 1
            if (cart.length > 0) {
              const idx = cart.findIndex((c:cartItem) => c.id === p.id)
            
            }

            return (
              <div 
                key={p.id} 
                className={`active:bg-gray-800 focus:bg-gray-800 rounded-xl border border-gray-500 shadow-lg shadow-slate-600 grow w-2/5 hover:cursor-pointer hover:bg-green-800 ease-in duration-200 ${p.active?'bg-green-800':''}`}
                onClick={() => {
                  const newPL = cloneDeep(prodList);
                  const idx = newPL.findIndex(prod => prod.id === p.id)
                  if (!p.active) addToCart(p, true, null)
                  else {
                    const oldCart = cloneDeep(cart)
                    const newCart = oldCart.filter(c => c.id !== p.id) 
                    setCart(newCart)
                  }
                  newPL[idx].active = !newPL[idx].active
                  setProdList(newPL)
                }}
                >
              <Card classNames={{base: 'h-full bg-transparent text-white'}}>
                <CardBody>
                  <div className='' >
                    <div className='gap-1 items-center font-bold'>
                      <label>{p.name}</label> 
                      {p.special_label ?
                      <div className='flex items-center'>
                      {iconLightning} <label className='text-yellow-400 font-semibold'>{p.special_label}</label>
                      </div> : null}
                    </div>
                  </div>
                  <p className='text-gray-200 text-sm mb-4'>{priceToCurrency.format(p.price)} {p.price_label}</p>
                  <div className='flex gap-2 items-end grow'>
                    {(p.active && p.multi_buy) &&
                    <div className='z-10 flex flex-col items-center gap-1' onClick={(e) => e.stopPropagation()}>
                      <small className='text-gray-200'>Jumlah game</small>
                      <Input
                        type="number"
                        className=""
                        classNames={{inputWrapper: 'h-4 ', input: 'h-4 max-w-xs w-16'}}
                        placeholder='1'
                        name="qty"
                        onChange={(e) => {
                          const newProdList = cloneDeep(prodList);
                          const idx = newProdList.findIndex((np:any) => np.id === p.id)
                          newProdList[idx].qty = parseInt(e.target.value);
                          setProdList(newProdList)
                          addToCart(p, false, parseInt(e.target.value))
                        }}
                      />
                    </div>
                    }
                  </div>
                </CardBody>
              </Card>
              </div>
            )
          })}
        </div>
      </div>
      <div>
        <CartSection cart={cart} user={userData}/>
      </div>
    </div>
  )
}

export default function Home() {
  useEffect(() => {

  }, [])

  return (
    <>
      <ProductSection />
    </>
  )
}
