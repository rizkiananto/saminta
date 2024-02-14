import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
})

export async function POST(request) {
  const req = await request.json()
  const {id, totalPrice, items, user_email} = req
  
  let parameter = {
    payment_type: "qris",
    transaction_details: {
      order_id: String(id),
      gross_amount: totalPrice
    },
    item_details: items,
    customer_details: {
      first_name: user_email,
      email: user_email
    },
    qris: {
      acquirer: "gopay"
    }
  }

  const res = await snap.createTransaction(parameter)
  const {token} = res;
  return NextResponse.json({token})
}
