/**
 * Authenticated user data, "sub" field contains a globally unique ID for the Google account.
 */
export interface AuthUserData {
  sub: string;
  name: string;
  email: string;
  picture: string;
}
