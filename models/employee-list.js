class EmployeeList {
    constructor() {
        this.arr = [];
    }

    addEmployee(employee) {
        this.arr.push(employee);
    }

    findIndexEmployee(account) {
        // Tim vị trí của nv trong mảng arr theo id
        let index = -1;
        for (let i = 0; i < this.arr.length; i++) {
            const employee = this.arr[i];
            if (employee.account === account) {
                index = i;
                break; // tìm thấy thì dừng vòng lặp
            }
        }
        return index;
    }

    getEmployeeById(account) {
        const index = this.findIndexEmployee(account);
        if (index !== -1) {
            // tìm thấy NV
            return this.arr[index];
        }

        return null;
    }


    updateEmployee(employee) {
        const index = this.findIndexEmployee(employee.account);

        if (index !== -1) {
            this.arr[index] = employee;
        }
    }

    removeEmployee(account) {
        const index = this.findIndexEmployee(account);
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    }

    searchEmployee(keyword) {
        let findEmployees = [];
        for (let i = 0; i < this.arr.length; i++) {
            const employee = this.arr[i];

            // Sửa thành xeploai (giống dữ liệu)
            if (!employee || !employee.xeploai) continue;

            const xeploaiLowerCase = employee.xeploai.toLowerCase();
            const keywordLowerCase = keyword.toLowerCase();

            if (xeploaiLowerCase.includes(keywordLowerCase)) {
                findEmployees.push(employee);
            }
        }
        return findEmployees;
    }

}

export default EmployeeList;