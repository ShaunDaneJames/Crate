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

  it('Can successfully retrieve a user style if it is null', async (done) => {
    const response = await request(server)
    .post('/')
    .send( {query: '{user(id: 1) {style}}'} )
    .expect(200)

    expect(response.body.data.user.style).toBe(null)
    done();
  })

  it('Can successfully retrieve a user style if it exists', async (done) => {
    const response = await request(server)
    .post('/')
    .send( {query: '{user(id: 3) {style}}'} )
    .expect(200)
    console.log(response.body.data)
    expect(response.body.data.user.style).toBe('classic')
    done();
  })

  it('Returns user role', async (done) => {
    const response = await request(server)
    .post('/')
    .send( {query: '{users {role}}'} )
    .expect(200)

  expect(response.body.data.users[0].role).toBe('ADMIN')
  done();
  })
})
