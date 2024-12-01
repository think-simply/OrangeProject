import path from "path";
export const authConfig = {
  admin: {
    username: "Admin",
    password: "admin123",
    storageState: path.join(process.cwd(), "playwright/.auth/admin.json"),
    //storageState: Đường dẫn đến tệp lưu trạng thái xác thực của admin, là phiên đăng nhập cookie...
  }, //Nếu đường dẫn hoặc thư mục chưa tồn tại, Playwright sẽ tạo ra thư mục và tệp.
  //Sau đó, nó sẽ lưu trạng thái đăng nhập (cookies, localStorage, sessionStorage, ...) vào tệp JSON.
  // staff: {
  //   username: "Admint",
  //   password: "Admin@123",
  //   storageState: "playwright/.auth/staff.json"
  // }
};

module.exports = { authConfig };
