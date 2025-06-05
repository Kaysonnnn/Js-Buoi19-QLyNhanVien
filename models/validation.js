import { getEle } from "../controller/main.js";
import Employee from "./employee.js";

class Validation {
    checkEmpty(value, idNoti, mess) {
        let isValid = true;

        if (value === "") {
            // show thông báo lỗi ra ngoài
            // tạo câu thông báo => gán ra ngoài thẻ inform
            getEle(idNoti).innerHTML = mess;

            // dom tới #id-inform => display: block
            getEle(idNoti).style.display = "block";
            return false;
        }
        getEle(idNoti).innerHTML = "";
        getEle(idNoti).style.display = "none";
        return true;
    }
    checkIdExist(value, idNoti, mess, arr) {
        let isExist = false
        for (let i = 0; i < arr.length; i++) {
            const employee = arr[i]
            if (employee.account === value) {
                isExist = true
                break
            }
        }
        if (isExist) {
            getEle(idNoti).innerHTML = mess;
            getEle(idNoti).style.display = "block";
            return false;
        }

        getEle(idNoti).innerHTML = "";
        getEle(idNoti).style.display = "none";
        return true
    }


    checkCharacterLength(value, idNoti, mess, min, max) {
        if (min <= value.trim().length && value.trim().length <= max) {
            getEle(idNoti).innerHTML = ""
            getEle(idNoti).style.display = "none"
            return true
        }
        getEle(idNoti).innerHTML = mess;
        getEle(idNoti).style.display = "block";
        return false;
    }

    checkLetterOnly(value, idNoti, mess) {
        const regex = /^[A-Za-zÀ-ỹ\s]+$/;
        if (regex.test(value)) {
            getEle(idNoti).innerHTML = "";
            getEle(idNoti).style.display = "none";
            return true;
        }
        getEle(idNoti).innerHTML = mess;
        getEle(idNoti).style.display = "block";
        return false;
    }

    checkEmail(value, idNoti, mess) {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (regex.test(value)) {
            getEle(idNoti).innerHTML = "";
            getEle(idNoti).style.display = "none";
            return true;
        }
        getEle(idNoti).innerHTML = mess;
        getEle(idNoti).style.display = "block";
        return false;
    }

    checkPassword(value, idNoti, mess) {
        const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{6,10}$/;
        if (regex.test(value)) {
            getEle(idNoti).innerHTML = "";
            getEle(idNoti).style.display = "none";
            return true;
        }
        getEle(idNoti).innerHTML = mess;
        getEle(idNoti).style.display = "block";
        return false;
    }

    checkDate(value, idNoti, mess) {
        const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
        if (regex.test(value)) {
            getEle(idNoti).innerHTML = "";
            getEle(idNoti).style.display = "none";
            return true;
        }
        getEle(idNoti).innerHTML = mess;
        getEle(idNoti).style.display = "block";
        return false;
    }

    checkNumberRange(value, idNoti, mess, min, max) {
        const number = parseFloat(value);
        if (!isNaN(number) && number >= min && number <= max) {
            getEle(idNoti).innerHTML = "";
            getEle(idNoti).style.display = "none";
            return true;
        }
        getEle(idNoti).innerHTML = mess;
        getEle(idNoti).style.display = "block";
        return false;
    }

    checkChucVu(value, idNoti, mess) {
        const validChucVu = ["sep", "truongP", "nhanVien"];
        if (validChucVu.includes(value)) {
            getEle(idNoti).innerHTML = "";
            getEle(idNoti).style.display = "none";
            return true;
        }
        getEle(idNoti).innerHTML = mess;
        getEle(idNoti).style.display = "block";
        return false;
    }
}

export default Validation