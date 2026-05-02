import { string, email, minLength, pipe } from 'valibot'

export const emailSchema = pipe(
  string(),
  minLength(1, 'Email is required'),
  email('Please enter a valid email address')
)

export const messageSchema = pipe(
  string(),
  minLength(10, 'Message must be at least 10 characters long')
)
