// All properties on a domain are optional
export const domain = {
  name: "Stackr MVP v0",
  version: "1",
  chainId: 42069,
  verifyingContract: "0x3f92b3a9c7d32689467ce6790aeb692307c9146e",
  salt: "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
} as const

export const otpMock = {
  "verify-otp": [
    {
      name: "type",
      type: "string",
    }, 
    {
      name: "otp",
      type: "uint32",
    }
  ],
} as const
   
  // The named list of all type definitions
  export const types = {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  } as const

  // {
  //   msgSender: "0xFa00D29d378EDC57AA1006946F0fc6230a5E3288",
  //   signature: "0xdaff507bebfb55e9aeb09b506b6ec02b3c2535946d0b9d054a82c670a7cad35b1e8bca5529c03c37264f116b67ff57d52c6432b0a48d7d7b92fe91fe6ca93e391c",
  //   payload: {
  //     type: "valid",
  //     otp: 12412,
  //   },
  // }

  // {
  //   msgSender: "0x952193D0c21a1A8888D733d4e0Bfb156b30fD7f5",
  //   signature: "0x23e634a7eac40c2df2571538e219530325a3a1af012431b26ea804d180a2955f6e42cedd729c4fd6a729bdeb324679a6bba8bef694f71b517626cfd7515e0d381c",
  //   payload: {
  //     type: "valid",
  //     otp: 733120692707,
  //   },
  // }
  
  