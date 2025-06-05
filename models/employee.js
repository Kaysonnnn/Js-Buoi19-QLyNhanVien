class Employee {
    constructor (
        _account,
        _name,
        _email,
        _password,
        _date,
        _salary,
        _position,
        _timeWork
    ) {
        this.account = _account;
        this.name = _name;
        this.email = _email;
        this.password = _password;
        this.date = _date;
        this.salary = _salary;
        this.position = _position;
        this.timeWork = _timeWork;
        this.priceSalary = 0;
        this.xeploai = ""
    }

    calcPriceSalary() {
        if(this.position === "sep") {
            this.priceSalary = this.salary * 3;
        } else if (this.position === "truongP") {
            this.priceSalary = this.salary * 2;
        } else if (this.position === "nhanVien") {
            this.priceSalary = this.salary;
        } else {
            this.priceSalary = 0;
        }
        return this.priceSalary
    }

    calcXepLoai() {
        if(this.timeWork >= 192) {
            return  "Nhân viên xuất sắc";
        } else if (this.timeWork >= 176) {
            return "Nhân viên giỏi";
        } else if (this.timeWork >= 160) {
            return "Nhân viên khá";
        }else {
            return "Nhân viên trung bình";
        }
    }
}

export default Employee;