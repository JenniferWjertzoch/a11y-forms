import { string, email, minLength, pipe } from 'valibot'

export const emailSchema = pipe(
  string(),
  minLength(1, 'Die E-Mail ist erforderlich'),
  email('Bitte gib eine gültige E-Mail-Adresse ein')
)

export const messageSchema = pipe(
  string(),
  minLength(10, 'Die Nachricht muss aus mindestens 10 Zeichen bestehen')
)
