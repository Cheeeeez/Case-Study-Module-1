const DEFAULT_INDEX = -1;

function getElementID(id) {
    return document.getElementById(id)
}

function getElementValue(id) {
    return document.getElementById(id).value;
}

let studentTable = getElementID('student-table-body');

let Student = function (fullName, gender, dateOfBirth, email, phone, homeTown) {
    this.fullName = fullName;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.phone = phone;
    this.homeTown = homeTown;
};

let StudentList = function () {
    this.list = [];
    this.currentIndex = DEFAULT_INDEX;

    this.updateList = function () {
        let fullName = getElementValue('full-name');
        let gender = "";
        if (getElementID('male').checked) {
            gender = getElementValue('male');
        } else if (getElementID('female').checked) {
            gender = getElementValue('female');
        }
        let dateOfBirth = getElementValue('date-of-birth');
        let email = getElementValue('email');
        let phone = getElementValue('phone');
        let homeTown = getElementValue('hometown');
        // Validate form
        if (!validateEmpty('full-name', fullName) && !validateEmpty('date-of-birth', dateOfBirth) &&
            validateEmail('email', email) && !validateEmpty('phone', phone) && validatePhone('phone', phone)) {
            if (this.currentIndex === DEFAULT_INDEX) {
                let student = new Student(fullName, gender, dateOfBirth, email, phone, homeTown);
                this.list.push(student);
                this.setStorage();
                this.showList();
                console.log(getElementValue('date-of-birth').length);
            } else {
                this.list[this.currentIndex] = new Student(fullName, gender, dateOfBirth, email, phone, homeTown);
                this.setStorage();
                this.showList();
                this.currentIndex = DEFAULT_INDEX;
                getElementID('save').value = "Thêm mới";
            }
        } else
            return false;
    };

    this.showList = function () {
        studentTable.innerText = "";
        this.list.forEach((student, index) => {
            studentTable.innerHTML += `<tr>
                <td>${++index}</td>
                <td>${student.fullName}</td>
                <td>${student.gender}</td>
                <td>${student.dateOfBirth}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.homeTown}</td>
                <td><button onclick="studentList.editStudent(${--index})"><i class="fas fa-user-edit"></i></i></button> | <button onclick="studentList.deleteStudent(${index})"><i class="fas fa-user-minus"></i></button></td>
            </tr>`;
        })
    };

    this.editStudent = function (index) {
        this.currentIndex = index;
        let student = this.list[index];
        getElementID('full-name').value = student.fullName;
        if (student.gender === 'Nam') {
            getElementID('male').checked = true;
        } else {
            getElementID('female').checked = true;
        }
        getElementID('date-of-birth').value = student.dateOfBirth;
        getElementID('email').value = student.email;
        getElementID('phone').value = student.phone;
        getElementID('hometown').value = student.homeTown;
        getElementID('save').value = "Sửa";
    };

    this.deleteStudent = function (index) {
        let notification = confirm("Bạn có chắc muốn xóa ?");
        if (notification) {
            this.list.splice(index, 1);
            this.setStorage();
            this.showList();
        }
    };

    this.setStorage = function () {
        let jsonList = JSON.stringify(this.list);
        localStorage.setItem('Students', jsonList)
    };

    this.getStorage = function () {
        if (localStorage.length > 0) {
            let jsonList = localStorage.getItem('Students');
            this.list = JSON.parse(jsonList);
            this.showList();
        }
    };

    this.searchStudent = function (keyword) {
        let searchList = new StudentList();
        for (let i = 0; i < this.list.length; i++) {
            if (deleteAccents(this.list[i].fullName).toLowerCase().trim().search(deleteAccents(keyword).toLowerCase().trim()) !== -1)
                searchList.list.push(this.list[i]);
            searchList.showList();
        }
    }
};

let studentList = new StudentList();

function deleteAccents(str) {
    str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a");
    str = str.replace(/[èéẹẻẽêềếệểễ]/g, "e");
    str = str.replace(/[ìíịỉĩ]/g, "i");
    str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o");
    str = str.replace(/[ùúụủũưừứựửữ]/g, "u");
    str = str.replace(/[ỳýỵỷỹ]/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, "A");
    str = str.replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, "E");
    str = str.replace(/[ÌÍỊỈĨ]/g, "I");
    str = str.replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, "O");
    str = str.replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, "U");
    str = str.replace(/[ỲÝỴỶỸ]/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

function isEmptyInput(value) {
    if (value.trim() === "") {
        return true;
    }
}

function isNotANumber(value) {
    if (Number.isNaN(value))
        return true;
}

function validateEmpty(id, value) {
    if (isEmptyInput(value)) {
        getElementID(id).style.borderColor = "red";
        return true;
    } else {
        getElementID(id).style.borderColor = "green";
        return false;
    }
}

function validatePhone(id, value) {
    if (!isNotANumber(value) && value.length >= 10) {
        getElementID(id).style.borderColor = "green";
        return true;
    } else {
        getElementID(id).style.borderColor = "red";
        return false;
    }
}

function validateEmail(id, value) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(value).trim())) {
        getElementID(id).style.borderColor = "green";
        return true;
    } else {
        getElementID(id).style.borderColor = "red";
        return false;
    }
}
