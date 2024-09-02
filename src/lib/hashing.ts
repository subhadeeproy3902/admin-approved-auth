import bcrypt from 'bcrypt';

const saltRounds = 10;

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, saltRounds);
}

export function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}