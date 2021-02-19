export interface CookieOptions {
  path: string;
  secure: boolean;
  samesite: string;
  expires?: string | undefined;
  'max-age'?: number;
}
