import path from 'path';
export const authConfig = {
  admin: {
    username: "Buianthai",
    password: "Admin@1234",
    storageState: path.join(process.cwd(), 'playwright/.auth/admin.json')
  },
  staff: {
    username: "Admint",
    password: "Admin@123",
    storageState: "playwright/.auth/staff.json"
  }
};
