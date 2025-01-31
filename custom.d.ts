declare namespace Express {
  export interface Request {
    user: { jwt?: string };
  }
}
