import { createWalletClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
})

// JSON-RPC Account
export const [account] = await walletClient.getAddresses()
// // Local Account
// export const account = privateKeyToAccount('0x...')



// {
//   msgSender: "0x4E59d07000467A98DBb30EE764Ab0162AcF6e9f8",
//   signature: "0x3186533199f041911e9e9b3df390fbed6edb9308d76e1817a2634be8a68521dc3bb9586b0668e2925c3ce8635384c2849f75697039bce3fe90218f97be22a3ba1b",
//   payload: {
//     type: "valid",
//     otp: 733120692707,
//   },
// }
