import request from 'supertest';
import { app } from '../../app';

it('failes when a email that does not exist is supplied', async () => {
   await request(app)
      .post('/api/users/signin')
      .send({
         email: 'test@test.com',
         passwrod: 'password'
      })
      .expect(400);
   }
);

it('failes when a incorrect password is supplied', async () => {

   await request(app)
      .post('/api/users/signup')
      .send({
         email: 'test@test.com',
         password: 'password'
      })
      .expect(201);

   await request(app)
      .post('/api/users/signin')
      .send({
         email: 'test@test.com',
         passwrod: 'passwor'
      })
      .expect(400);
   }
);

it('reponds with a cookie when given valid credentials', async () => {

   await request(app)
      .post('/api/users/signup')
      .send({
         email: 'test@test.com',
         password: 'password'
      })
      .expect(201);

   const response = await request(app)
      .post('/api/users/signin')
      .send({
         email: 'test@test.com',
         password: 'password'
      })
      .expect(200);

      expect(response.get('Set-Cookie')).toBeDefined();
   }
);
