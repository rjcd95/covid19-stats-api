process.env.NODE_ENV = 'test'
const User = require('../app/models/user')
const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')
const should = chai.should()
chai.use(chaiHttp)
let token = ''
const createdID = []
chai.use(chaiHttp)
const loginDetails = {
  email: 'admin@admin.com',
  password: '12345'
}

describe('*********** AUTH ***********', () => {

  describe('API /', () => {
    it('it should return 200', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          expect(res.statusCode).toBe(200)
          done()
        })
    });
  });

  describe('/GET /404url', () => {
    it('it should GET 404 url', (done) => {
      chai
        .request(app)
        .get('/404url')
        .end((err, res) => {
          expect(res.statusCode).toBe(404)
          expect(typeof res.body).toBe('object')
          done()
        })
    })
  })

  describe('/POST register', () => {
    it('it should POST register', (done) => {      
      const userData = {
        name: "Tester User",
        email: "admin@admin.com",
        password: "12345"
      }
      chai
        .request(app)
        .post('/auth/signup')
        .set('content-type', 'application/json')
        .send(userData)
        .end((err, res) => {
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
        .request(app)
        .post('/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).toBe(422)
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('errors')
          done()
        })
    })

  describe('/POST login', () => {
    it('it should GET token', (done) => {  
      chai
        .request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send(loginDetails)
        .end((err, res) => {
          expect(res.statusCode).toBe(200)
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('token')
          expect(res.body).toHaveProperty('token')
          token = res.body.token
          done()
        })
    })
  })
  })

  describe('/GET token', () => {
    it('it should NOT be able to consume the route since no token was sent', (done) => {
      chai
        .request(app)
        .get('/auth/token')
        .end((err, res) => {
          expect(res.statusCode).toBe(401)
          done()
        })
    })
    it('it should GET a fresh token', (done) => {
      chai
        .request(app)
        .get('/auth/token')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).toBe(200)
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('token')
          done()
        })
    })
  })
  
  describe('Remove Auth Data', () => {
    it('it should Remove all test data', (done) => {
      createdID.forEach((id) => {
        User.findByIdAndRemove(id, (err) => {
            if (err) {
                console.log(err)
            }
        })
      })
      done();
    })
  })
})