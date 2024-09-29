// const {Connection, LAMPORTS_PER_SOL, clusterApiUrl, PublicKey} = require('@solana/web3.js');

// const connection = new Connection(clusterApiUrl('devnet'));

// async function airdrop(publicKey, amount) {
//     const airdropSignature = await connection.requestAirdrop(new PublicKey(publicKey), amount);
//     await connection.confirmTransaction({signature: airdropSignature})
//     return signature
// }

// airdrop("PUBLIC KEY", LAMPORTS_PER_SOL).then(signature => {
//     console.log('Airdrop signature:', signature);
// });

// const {
//   createMint,
//   getOrCreateAssociatedTokenAccount,
//   mintTo,
// } = require("@solana/spl-token");
// const {
//   Keypair,
//   Connection,
//   clusterApiUrl,
//   TOKEN_PROGRAM_ID,
//   PublicKey,
// } = require("@solana/web3.js");

// const payer = Keypair.fromSecretKey(
//   Uint8Array.from(PRIVATE KEY)
// );

// const mintAthority = payer;

// const connection = new Connection(clusterApiUrl("devnet"));

// async function createMintForToken(payer, mintAuthority) {
//   const mint = await createMint(
//     connection,
//     payer,
//     mintAuthority,
//     null,
//     6,
//     TOKEN_PROGRAM_ID
//   );
//   console.log("Mint created at", mint.toBase58());
//   return mint;
// }

// async function mintNewTokens(mint, to, amount) {
//   const tokenAccount = await getOrCreateAssociatedTokenAccount(
//     connection,
//     payer,
//     mint,
//     new PublicKey(to)
//   );

//   console.log("Token account created at", tokenAccount.address.toBase58());
//   await mintTo(connection, payer, mint, tokenAccount.address, payer, amount);
//   console.log("Minted", amount, "tokens to", tokenAccount.address.toBase58());
// }

// async function main() {
//   const mint = await createMintForToken(payer, mintAthority.publicKey);
//   await mintNewTokens(mint, mintAthority.publicKey, 100);
// }

// main();
