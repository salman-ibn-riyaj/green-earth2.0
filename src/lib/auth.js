// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";

// const client = new MongoClient(process.env.MONGODB_URI);
// const db = client.db('greenEarth');

// export const auth = betterAuth({
//   database: mongodbAdapter(db, {
//     client
//   }),
//   emailAndPassword: { 
//     enabled: true, 
//   },
//   socialProviders: {
//     google: { 
//         clientId: process.env.GOOGLE_CLIENT_ID, 
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         mapProfileToUser: (profile) => {
//             return {
//               name: profile.name,
//               email: profile.email,
//               image: profile.picture,
//             };
//           },
//     },
     
// },
// });

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('greenEarth');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: { 
    enabled: true, 
  },
  session: {
    additionalFields: ["image"],
  },
  socialProviders: {
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      
    }, 
  },
});