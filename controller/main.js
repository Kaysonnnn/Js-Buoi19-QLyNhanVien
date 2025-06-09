import Employee from "../models/employee.js";
import EmployeeList from "../models/employee-list.js";
import Validation from "../models/validation.js";

const validation = new Validation();
const employeeList = new EmployeeList();

export const getEle = (id) => {
  return document.getElementById(id);
};

const getValue = (isAdd = true) => {
  const account = getEle("tknv").value;
  const name = getEle("name").value;
  const email = getEle("email").value;
  const password = getEle("password").value;
  const date = getEle("datepicker").value;
  const salary = getEle("luongCB").value;
  const position = getEle("chucvu").value;
  const timeWork = getEle("gioLam").value;
  const tongLuong = 0

  // tạo flag (cờ)
  let isValid = true;

  if(isAdd){ 
    // tài khoản
    isValid &= validation.checkEmpty(account,"tbTKNV","(*) Vui lòng nhập tài khoản nhân viên") &&
    validation.checkCharacterLength(account,"tbTKNV", "(*)Vui lòng nhập 4 - 6 ký tự", 4, 6) &&
    validation.checkIdExist(account, "tbTKNV", "(*) Tài khoản đã tồn tại", employeeList.arr);
  }
 
  // họ tên
isValid &= validation.checkEmpty(name, "tbTen", "(*) Vui lòng nhập tên nhân viên") &&
    validation.checkLetterOnly(name, "tbTen", "(*) Tên chỉ được chứa chữ");

// email
isValid &= validation.checkEmpty(email, "tbEmail", "(*) Vui lòng nhập email") &&
    validation.checkEmail(email, "tbEmail", "(*) Email không hợp lệ");

// mật khẩu
isValid &= validation.checkEmpty(password, "tbMatKhau", "(*) Vui lòng nhập mật khẩu") &&
    validation.checkPassword(password, "tbMatKhau", "(*) Mật khẩu từ 6-10 ký tự, gồm số, chữ in hoa, ký tự đặc biệt");

// ngày làm
isValid &= validation.checkEmpty(date, "tbNgay", "(*) Vui lòng nhập ngày làm") &&
    validation.checkDate(date, "tbNgay", "(*) Ngày làm không đúng định dạng mm/dd/yyyy");

// lương cơ bản
isValid &= validation.checkEmpty(salary, "tbLuongCB", "(*) Vui lòng nhập lương") &&
    validation.checkNumberRange(salary, "tbLuongCB", "(*) Lương từ 1.000.000 - 20.000.000", 1000000, 20000000);

// chức vụ
isValid &= validation.checkChucVu(position, "tbChucVu", "(*) Vui lòng chọn chức vụ hợp lệ");

// giờ làm
isValid &= validation.checkEmpty(timeWork, "tbGiolam", "(*) Vui lòng nhập số giờ làm") &&
    validation.checkNumberRange(timeWork, "tbGiolam", "(*) Giờ làm từ 80 - 200 giờ", 80, 200);

// Nếu isValid là false => stop
  if (!isValid) return;

  // Tạo đối tượng employee từ lớp đối tượng Employee
  const employee = new Employee(
    account,
    name,
    email,
    password,
    date,
    salary,
    position,
    timeWork,
  );

  // Gọi phương thức calcPriceSalary() để tính lương theo chức vụ
  employee.priceSalary = employee.calcPriceSalary();
  employee.xeploai = employee.calcXepLoai();


  return employee;
};


const renderEmployeeList = (data) => {
  let contentHTML = "";
  for (let i = 0; i < data.length; i++) {
    const employee = data[i];
    if (!employee) continue;
    contentHTML += `
      <tr>
        <td>${employee.account}</td>
        <td>${employee.name}</td>
        <td>${employee.email}</td>
        <td>${employee.date}</td>
        <td>${employee.position === "sep"
        ? "Sếp"
        : employee.position === "truongP"
          ? "Trưởng phòng"
          : employee.position === "nhanVien"
            ? "Nhân viên"
            : "Không xác định"
      }</td>
        <td>${employee.priceSalary}</td>
        <td>${employee.xeploai}</td>
        <td>
          <button class="btn btn-info" onclick="onEditEmployee('${employee.account}')">Edit</button>
          <button class="btn btn-danger" onclick="onDeleteEmployee('${employee.account}')">Delete</button>
        </td>
      </tr>    
    `;
  }
  getEle("tableDanhSach").innerHTML = contentHTML;
};

const resetForm = () => {
  getEle("formThemNV").reset();
};


/**
 *
 * Lưu dữ liệu vào localStorage (browser)
 */
const setLocalStorage = (data) => {
  // Chuyển đổi mảng thành string
  const dataString = JSON.stringify(data);
  localStorage.setItem("EMPLOYEE_LIST", dataString);
};

/**
 * Lấy dữ liệu từ localStorage
 */
const getLocalStorage = (key) => {
  const dataString = localStorage.getItem(key);

  // Nếu không có dữ liệu thì trả về
  if (!dataString) return;

  // Chuyển đổi string thành mảng
  const dataJson = JSON.parse(dataString);
  // gán dữ liệu vào mảng arr của employeeList
  employeeList.arr = dataJson;
  // Gọi hàm renderFoodList() để hiển thị danh sách nhân viên
  renderEmployeeList(employeeList.arr);
};

getLocalStorage("EMPLOYEE_LIST");

getEle("btnThemNV").onclick = () => {
  const employee = getValue();
  if (!employee) return;
  employeeList.addEmployee(employee);
  renderEmployeeList(employeeList.arr);
  setLocalStorage(employeeList.arr);
};
getEle("btnThem").onclick = function () {
  // Ẩn nút cập nhật
  getEle("btnCapNhat").style.display = "none";

  // Hiển thị tiêu đề modal
  getEle("header-title").innerHTML = "Thêm Nhân Viên";

  // enable TK NV
  getEle("tknv").disabled = false;

  // reset form
  resetForm();

  // Đóng modal sau khi thêm thành công
  getEle("btnDong").click();
}

getEle("btnCapNhat").onclick = function () {
  // gọi phương thức 
  const employee = getValue();

  // cập nhật
  employeeList.updateEmployee(employee)

  // đóng modal
  getEle("btnDong").click();

  // render lại
  renderEmployeeList(employeeList.arr);

  // lưu data mới xuống
  setLocalStorage(employeeList.arr);
}

// Hàm sửa SK Nhân Viên
const onEditEmployee = (account) => {
  const employee = employeeList.getEmployeeById(account);
  if (employee) {
    getEle("tknv").value = employee.account;
    getEle("tknv").disabled = true;
    getEle("name").value = employee.name;
    getEle("email").value = employee.email;
    getEle("password").value = employee.password;
    getEle("datepicker").value = employee.date;
    getEle("luongCB").value = employee.salary;
    getEle("chucvu").value = employee.position;
    getEle("gioLam").value = employee.timeWork;

    // Hiện modal lên
    $("#myModal").modal("show");

    // Hiển thị tiêu đề modal
    getEle("header-title").innerHTML = "Sửa Nhân Viên";

    // Hiện nút cập nhật
    getEle("btnCapNhat").style.display = "block";

    // Ẩn nút thêm mới
    getEle("btnThemNV").style.display = "none";

    // Đóng modal sau khi thêm thành công
    getEle("btnDong").click();
  }
};
window.onEditEmployee = onEditEmployee;



/**
 * Hàm xử lý sự kiện xóa nhân viên
 */
const onDeleteEmployee = (account) => {
  employeeList.removeEmployee(account);
  // Gọi hàm renderEmployee() để hiển thị danh sách nhân viên
  renderEmployeeList(employeeList.arr);
  // Lưu dữ liệu vào localStorage
  setLocalStorage(employeeList.arr);
};
// Khai báo onDeleteEmployee ra đối tượng window
window.onDeleteEmployee = onDeleteEmployee;


/**
 * Tìm kiếm theo xep loai
 */
getEle("searchName").addEventListener("keyup", () => {
  const keyword = getEle("searchName").value;

  const findEmployees = employeeList.searchEmployee(keyword);

  renderEmployeeList(findEmployees);
});
