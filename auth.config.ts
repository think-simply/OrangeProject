import path from 'path';
export const authConfig = {
  admin: {
    username: "TinaNguyen",
    password: "Admin@1234",
    storageState: path.join(process.cwd(), 'playwright/.auth/admin.json')
  },
  staff: {
    username: "EssUser",
    password: "Admin@1234",
    storageState: path.join(process.cwd(), 'playwright/.auth/staff.json')
  }
}; 