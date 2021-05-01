process.env.NODE_ENV = 'test'
const User = require('../app/models/user')
const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

const loginDetails = {
  email: 'admin@admin.com',
  password: '12345'
}
let token = ''
const createdID = []
chai.use(chaiHttp)

describe('*********** AUTH ***********', () => {
  
  beforeAll(() => {
    return new Promise(resolve => {
      const user = {
        name: "Tester User",
        email: "admin@admin.com",
        password: "12345"
      }
      chai
        .request(server)
        .post('/auth/signup')
        .set('content-type', 'application/json')
        .send(user)
        .then((res) => {
          if(res.statusCode == 201) {
            createdID.push(res.body.user._id)
          }
          resolve();
        })
    });
  });

  describe('API /', () => {
    it('it should return 200', (done) => {
      chai
        .request(server)
        .get('/')
        .then((res) => {
          expect(res.statusCode).toBe(200)
          done()
        })
    });
  });

  describe('/GET /404url', () => {
    it('it should GET 404 url', (done) => {
      chai
        .request(server)
        .get('/404url')
        .then((res) => {
          expect(res.statusCode).toBe(404)
          expect(typeof res.body).toBe('object')
          done()
        })
    })
  })

  describe('/POST login', () => {
    it('it should GET token', (done) => {
      chai
        .request(server)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send(loginDetails)
        .then((res) => {
          expect(res.statusCode).toBe(200)
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('token')
          token = res.body.token
          done()
        })
    })
  })

  describe('/POST register', () => {
    it('it should POST register', (done) => {
      const user = {
        name: faker.random.words(),
        email: faker.internet.email(),
        password: faker.random.words()
      }
      chai
        .request(server)
        .post('/auth/signup')
        .set('content-type', 'application/json')
        .send(user)
        .then((res) => {
          expect(res.statusCode).toBe(201)
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('token')
          expect(res.body).toHaveProperty('user')
          createdID.push(res.body.user._id)
          done()
        })
    })
    it('it should NOT POST a register if email already exists', (done) => {
      const user = {
        name: faker.random.words(),
        email: loginDetails.email,
        password: faker.random.words()
      }
      chai
        .request(server)
        .post('/auth/signup')
        .send(user)
        .then((res) => {
          expect(res.statusCode).toBe(422)
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('errors')
          done()
        })
    })
  })

  describe('/GET token', () => {
    it('it should NOT be able to consume the route since no token was sent', (done) => {
      chai
        .request(server)
        .get('/auth/token')
        .then((res) => {
          expect(res.statusCode).toBe(401)
          done()
        })
    })
    it('it should GET a fresh token', (done) => {
      chai
        .request(server)
        .get('/auth/token')
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res.statusCode).toBe(200)
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('token')
          done()
        })
    })
  })
  
  afterAll(() => {
    return new Promise(resolve => {
      createdID.forEach((id) => {
        User.findByIdAndRemove(id, (err) => {
          if (err) {
            console.log(err)
          }
        })
      })
      server.close();
      resolve();
    });
  });
})
