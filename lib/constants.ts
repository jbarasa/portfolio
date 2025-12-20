// Admin email - only this user can access admin features
export const ADMIN_EMAIL = "jbarasa.ke@gmail.com";

// Check if a user email is the admin
export function isAdmin(email: string | null | undefined): boolean {
  return email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}
