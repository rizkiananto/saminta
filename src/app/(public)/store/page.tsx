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
  qty: number,
}

interface CartProps {
  cart: cartItem[],
}

const CartSection = ({cart} : CartProps) => {
  let totalPrice = 0;
  return (
    <>
    <div>
      <div className='text-xs text-gray-400'>
        {cart.map((c:any, i:number) => {
          totalPrice = totalPrice+(c.price*c.qty)
          return (
            <div key={i}>
              <p>{c.name} ({c.qty}x) - {priceToCurrency.format(c.price*c.qty)}</p>
            </div>
          )
        })}
      </div>
      <p className='mt-2'>Total Pesanan : {priceToCurrency.format(totalPrice)}</p>
    </div>
    <div className='text-center mt-6'>
      <Button color="primary" size='lg' variant='solid'>Bayar</Button>
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
    qty: 1,
  },
]

const ProductSection = () => {
  const [cart, setCart] = useState<cartItem[]>([])
  const [prodList, setProdList] = useState<any[]>(PRODUCT_LIST)

  return (
    <div className={`${fira_sans.className} text-white`}>
      <p className='text-center font-bold text-xl'>Mau minta apa dari host?</p>
      <div className='flex flex-col gap-5 my-8'>
        {prodList.map((p:any, i:number) => {
          let qty = 1
          if (cart.length > 0) {
            const idx = cart.findIndex((c:cartItem) => c.id === p.id)
            
          }

          return (
            <Card key={p.id}>
              <CardBody>
                <div className='mb-2'>
                  <div className='flex gap-1 items-center'>
                    <label>{p.name}</label> 
                    {p.special_label ?
                    <>
                    {iconLightning} <label className='text-orange-700 font-semibold'>{p.special_label}</label>
                    </> : null}
                  </div>
                  <label className='text-sm text-gray-500'>{p.tag}</label>
                </div>
                <Divider />
                <p className='text-gray-700 font-bold mt-3 mb-4'>{priceToCurrency.format(p.price)} {p.price_label}</p>
                <div className='flex gap-2 items-center'>
                  <div className=''>
                      <Button className='' variant='flat' color='primary' onClick={() => {
                        const newCart = cloneDeep(cart);
                        const itemExist = newCart.length > 0 ? newCart.findIndex((c:any) => c.id === p.id) : -1;
                        if (itemExist !== -1) {
                          newCart[itemExist].qty = p.qty
                          newCart[itemExist].price = p.price 
                        } else {
                          newCart.push({
                            id: p.id,
                            name: `${p.name} ${p.special_label}`,
                            price: p.price,
                            qty: p.qty,
                          })
                        }
                        setCart(newCart)
                      }}>Beli</Button>
                  </div>
                  {p.multi_buy &&
                  <>
                  <Input
                    type="number"
                    className="max-w-xs w-16"
                    classNames={{inputWrapper: 'h-10'}}
                    placeholder='1'
                    name="password"
                    onChange={(e) => {
                      const newProdList = cloneDeep(prodList);
                      const idx = newProdList.findIndex((np:any) => np.id === p.id)
                      newProdList[idx].qty = parseInt(e.target.value);
                      setProdList(newProdList)
                    }}
                  />
                  <label className='text-gray-500 text-sm'>game</label>
                  </>
                  }
                </div>
              </CardBody>
            </Card>
          )
        })}
      </div>
      <CartSection cart={cart}/>
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
