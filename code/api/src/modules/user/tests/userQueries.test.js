import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../../setup/schema';

describe('user queries', () => {
  let server = express();
  beforeAll(() => {
    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    )
  })

  it('Can successfully query user names', async (done) => {
    const response = await request(server)
    .post('/')
    .send( {query: '{users {name}}'} )
    .expect(200)

  expect(response.body.data.users.length).toBe(2)
  done();
  })

  it('Returns user role with login', async (done) => {
    const response = await request(server)
    .post('/')
    .send( {query: '{users {role}}'} )
    .expect(200)

  expect(response.body.data.users[0].role).toBe('ADMIN')
  done();
  })


    it('Returns user style with login', async (done) => {
      const response = await request(server)
      .post('/')
      .send( {query: '{userLogin({email password role}})'} )
      .expect(200)

    expect(response.body.data.users[0].role).toBe('ADMIN')
    done();
    })
})
