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
    this.currentIndex = DEFAULT_INDEX;      // Để xác định phương thức thêm hoặc sửa

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

        if (this.currentIndex === DEFAULT_INDEX) {
            let student = new Student(fullName, gender, dateOfBirth, email, phone, homeTown);
            this.list.push(student);
            this.showList();
        } else
            this.list[this.currentIndex] = new Student(fullName, gender, dateOfBirth, email, phone, homeTown);
        this.showList();
        this.currentIndex = DEFAULT_INDEX;
        getElementID('save').value = "Thêm mới";
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
                <td><button onclick="studentList.editStudent(${--index})">Sửa</button> | <button onclick="studentList.deleteStudent(${index})">Xóa</button></td>
            </tr>`;
        })
    };

    this.editStudent = function (index) {
        this.currentIndex = index;
        let student = this.list[index];
        getElementID('full-name').value = student.fullName;
        if (student.gender === getElementID('male').value) {
            getElementID('male').checked;
        } else
            getElementID('female').checked;
        getElementID('date-of-birth').value = student.dateOfBirth;
        getElementID('email').value = student.email;
        getElementID('phone').value = student.phone;
        getElementID('hometown').value = student.homeTown;
        getElementID('save').value = "Sửa";
        console.log(student);
    };

    this.deleteStudent = function (index) {
        this.list.splice(index, 1);
        this.showList();
    }
};

let studentList = new StudentList();

function main() {
    studentList.updateList();
}



