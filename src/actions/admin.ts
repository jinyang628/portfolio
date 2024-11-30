'use server';

export async function checkIsAdmin(): Promise<boolean> {
  return process.env.ADMIN_ACCESS === 'true';
}
