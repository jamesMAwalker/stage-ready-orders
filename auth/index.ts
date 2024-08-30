// @ts-nocheck

/**
 * * NOT IN USE *
 * This module is used to login with Auth.js which is currently a WIP.
 * Kept in place for future use.
 */

import NextAuth from 'next-auth';

import { ShopifyCustomerAccountProvider } from './shopify-provider';

const appDomain = process.env.NEXT_PUBLIC_BASE_URL;

const shopDomain = process.env.SHPFY_STORE_DOMAIN;
const shopId = process.env.SHPFY_SHOP_ID;
const shopScopes = process.env.SHPFY_API_SCOPES;
const clientId = process.env.SHPFY_CLIENT_ID;
const clientSecret = process.env.SHPFY_CLIENT_SECRET;

export const { handlers, signIn, signOut, auth } = NextAuth({
  logger: {
    level: 'debug', // Adjust the log level as needed ('debug', 'info', 'warn', 'error')
  },
  providers: [
    {
      id: "shopify",
      name: "Shopify",
      type: "oauth",
      version: "2.0",
      scope: shopScopes,
      params: { grant_type: "authorization_code" },
      issuer: `https://standing-o-cosmetics.myshopify.com/admin/oauth/authorize`,
      authorization: {
        url: `https://shopify.com/${shopId}/auth/oauth/authorize`,
        params: {
          scope: 'openid email https://api.customers.com/auth/customer.graphql',
          client_id: clientId,
          response_type: 'code',
          redirect_uri: `${appDomain}/api/auth/callback/shopify`,
        },
      },
      clientId,
      clientSecret,
      async tokens(token) {
        // Custom logic to handle token exchange and refresh
        return token;
      },
      async profile(profile, tokens) {
        return {
          id: profile.shop.id.toString(),
          name: profile.shop.name,
          email: profile.shop.email,
          image: null
        };
      },
    }
  ]
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