// @ts-nocheck

import NextAuth from 'next-auth';

import { ShopifyCustomerAccountProvider } from './shopify-provider';

const shopDomain = process.env.SHOPIFY_STORE_DOMAIN;
const shopId = process.env.SHOPIFY_SHOP_ID;
const shopScopes = process.env.SHOPIFY_API_SCOPES;
const appDomain = process.env.NEXT_PUBLIC_BASE_URL;
const clientId = process.env.SHOPIFY_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [ShopifyCustomerAccountProvider({
    shopId,
    shopDomain,
    clientId,
    clientSecret
  })],
})
// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [{
//     id: "shopify",
//     name: "Shopify",
//     type: "oauth",
//     version: "2.0",
//     scope: shopScopes,
//     params: { grant_type: "authorization_code" },
//     issuer: `https://${shopDomain}/admin/oauth/authorize`,
//     authorization: {
//       url: `https://${shopDomain}/admin/oauth/authorize`,
//       params: {
//         client_id: process.env.SHOPIFY_API_PUBLIC_KEY,
//         scope: shopScopes,
//         redirect_uri: `https://${shopDomain}/api/auth/callback/shopify`,
//       },
//     },
//     async profile(profile, tokens) {
//       return {
//         id: profile.shop.id.toString(),
//         name: profile.shop.name,
//         email: profile.shop.email,
//         image: null // Shopify doesn't return an image URL in the shop JSON
//       };
//     },
//     clientId: process.env.SHOPIFY_API_PUBLIC_KEY,
//     clientSecret: process.env.SHOPIFY_API_SECRET_KEY
//   }]
// })