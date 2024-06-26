import jwt from 'jsonwebtoken'

const secret = 'gwenstacy'
const header = {
  typ: 'JWT',
  alg: 'HS512'
}

export function generateToken(userId) {
  const data = {
    userId
  }

  return jwt.sign({ data }, secret, { expiresIn: '7d' })
}

export function decodeToken(token) {
  return jwt.verify(token, secret)
}

export function checkToken(token) {
  try {
    jwt.verify(token, secret)
    return true
  } catch (err) {
    return false
  }
}

export default { generateToken, decodeToken, checkToken }
