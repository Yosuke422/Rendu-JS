import jwt from 'jsonwebtoken'

// Create middleware autbhentication 
export const authentication = (req: any, res: any, next: any) => {
  const token = req.header('x-auth-token')

  // Check for token
  if (!token) {
    res.status(401).json({
      message: 'No token, authorization denied',
    })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, 'secret')

    // Add user from payload
    req.user = decoded
    next()
  } catch (e) {
    res.status(400).json({
      message: 'Token is not valid',
    })
  }
}




