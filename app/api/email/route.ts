import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  console.log(req.body);
  return res.json({'msg': "adsfa"});
  // res.status(200).json({ message: `Email received.` });
  
  // try {
  //   const { email } = req.body;
  //   console.log(email);

  //   res.status(200).json({ message: `Email received: ${email}` });
  // } catch (error) {
  //   res.status(500).json({ message: 'Server error' });
  // }
}