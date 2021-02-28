import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
   namespace NodeJS {
      interface Global {
         signin(id?: string): string[];
      }
   }
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY = 'sk_test_51IPdw4HoHzQEcf4OCzGgf6yXHt4Zd6x8CMefQJ4svowVBTf3CWrxRRcp96pQPOUSiCq8HMD3yZKYqh9XcpH4C0ix00bS53K4Av';

let mongo: any;
beforeAll(async () => {
   process.env.JWT_KEY = 'asdf';
   mongo = new MongoMemoryServer();
   const mongoUri = await mongo.getUri();
   await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   });
});

beforeEach(async () => {
   jest.clearAllMocks();
   const collections = await mongoose.connection.db.collections();

   for (let collection of collections) {
      await collection.deleteMany({});
   }
});

afterAll(async () => {
   await mongo.stop();
   await mongoose.connection.close();
})


global.signin = (id?: string) => {
   // build a JWT payload.
   const payload = {
      id: id || new mongoose.Types.ObjectId().toHexString(),
      email: 'tick@test.com'
   };
   // create the JWT
   const token = jwt.sign(payload, process.env.JWT_KEY!);
   // build session Object. { jwt: MY_JWT }
   const session = { jwt: token };
   // turn that session into JSON
   const sessionJSON = JSON.stringify(session);
   // take Json and encode is as base64
   const base64 = Buffer.from(sessionJSON).toString('base64');
   // return a string thats the cookie with the encoded data
   return [`express:sess=${base64}`];

};