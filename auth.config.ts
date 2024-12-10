import path from 'path';
export const authConfig = {
  admin: {
    username: "Admin",
    password: "admin123",
    storageState: path.join(process.cwd(), 'playwright/.auth/admin.json')
  }
};