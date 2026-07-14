import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from './app.js'

describe('GET /', () => {
  it('responde que el backend esta corriendo', async () => {
    const res = await request(app).get('/')

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Backend running....')
  })
})

describe('POST /login', () => {
  it('rechaza credenciales invalidas', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'incorrecta' })

    expect(res.status).toBe(401)
  })

  it('acepta credenciales validas y devuelve un token', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: '1234' })

    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
  })
})

describe('GET /private', () => {
  it('rechaza el acceso sin token', async () => {
    const res = await request(app).get('/private')

    expect(res.status).toBe(403)
  })

  it('rechaza el acceso con un token invalido', async () => {
    const res = await request(app)
      .get('/private')
      .set('Authorization', 'Bearer token-invalido')

    expect(res.status).toBe(401)
  })

  it('permite el acceso con un token valido', async () => {
    const login = await request(app)
      .post('/login')
      .send({ username: 'admin', password: '1234' })

    const res = await request(app)
      .get('/private')
      .set('Authorization', `Bearer ${login.body.token}`)

    expect(res.status).toBe(200)
  })
})

describe('POST /tasks', () => {
  it('rechaza crear una tarea con texto vacio', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ text: '' })

    expect(res.status).toBe(400)
  })
})
