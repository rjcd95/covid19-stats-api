process.env.NODE_ENV = 'test'

const User = require('../app/models/user')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
chai.use(chaiHttp)

let token = ''
let statsId = ''
const createdID = []

describe('*********** STATS ***********', () => {   
    describe('/POST register user for tests', () => {
        it('it should POST register', (done) => {
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
                .end((err, res) => {
                    expect(res.statusCode).toBe(201)
                    expect(typeof res.body).toBe('object')
                    expect(res.body).toHaveProperty('token')
                    expect(res.body).toHaveProperty('user')
                    createdID.push(res.body.user._id)
                    done()
                })
            })
    })

    describe('/POST login', () => {
        it('it should GET token', (done) => {
            const loginDetails = {
                email: 'admin@admin.com',
                password: '12345'
            }       
            chai
                .request(server)
                .post('/auth/login')
                .set('content-type', 'application/json')
                .send(loginDetails)
                .end((err, res) => {
                    expect(res.statusCode).toBe(200)
                    expect(typeof res.body).toBe('object')
                    expect(res.body).toHaveProperty('token')
                    token = res.body.token
                    done()
                })
        })
    })

    describe('/GET Stats', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/stats')
                .end((err, res) => {
                    expect(res.statusCode).toBe(401)
                    done()
                })
        })
        it('it should GET all the stats', (done) => {
            chai
                .request(server)
                .get('/stats')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res.statusCode).toBe(200)
                    expect(typeof res.body).toBe('object')
                    statsId = res.body[0]._id;
                    done()
                })
        })  
    })

    describe('/GET/:id stats', () => {
        it('it should GET a stats by the given id', (done) => {
            chai
                .request(server)
                .get(`/stats/${statsId}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res.statusCode).toBe(200)
                    expect(typeof res.body).toBe('object')
                    expect(res.body).toHaveProperty('_id')
                    expect(res.body).toHaveProperty('country')
                    done()
                })
        })
    })

    describe('Remove Stats Data', () => {
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