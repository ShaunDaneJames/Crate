import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../../setup/schema';
import models from '../../../setup/models'
const User = require('../model');

describe('user mutations', () => {
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

  beforeAll(async () => {
    const tom = await models.User.create({
      name: 'Tom',
      email: "tomtom@tom.com",
      password: "12345",
      role: null,
      style: "Radical"
    });
    const steve = models.User.create({
      name: 'Steve',
      email: "stylesssteve@aww.com",
      password: "12345",
      role: null,
      style: null
    })
  })

  afterAll(async () => {
    await models.User.destroy({
      where: {
        email: 'tomtom@tom.com'
      }
    });
    models.User.destroy({
      where: {
        email: 'stylesssteve@aww.com'
      }
    });
  })

  it('Can successfully update a user style from null', async (done) => {
    const response = await request(server)
    .post('/')
    .send( {query: 'mutation {userStyleUpdate(email: "stylesssteve@aww.com", style: "Bohemian") {email, style}}'} )
    .expect(200)

    expect(response.body.data.userStyleUpdate.style).toBe('Bohemian')
    done();
  })

  it('Can successfully update a user style from another style', async (done) => {
    const response = await request(server)
    .post('/')
    .send( {query: 'mutation {userStyleUpdate(email: "tomtom@tom.com", style: "Crafty") {email, style}}'} )
    .expect(200)

    expect(response.body.data.userStyleUpdate.style).toBe('Crafty')
    done();
  })
})
