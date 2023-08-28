"use strict";

const nameInput = document.querySelector(".name");
const weightInput = document.querySelector(".weight");
const heightInput = document.querySelector(".height");
const birthdayInput = document.querySelector(".birthdayinput");
const allInput = document.querySelectorAll(".input");

const nextBtn = document.querySelector(".next");

const inputContainer = document.querySelector(".input-container");
const btnContainer = document.querySelector(".btn-container");
const welMessage = document.querySelector(".Welcome-message");
const downloadBtn = document.querySelector(".download");

const bmiBtn = document.querySelector(".calc-bmi");

const bmiResult = document.querySelector(".bmi-result");
const bmiStatus = document.querySelector(".bmi-status");

const calcAgeBtn = document.querySelector(".calc-age");
const AgeResult = document.querySelector(".age-result");
const ageSec = document.querySelector(".age-sec");
const ageMin = document.querySelector(".age-min");
const ageHours = document.querySelector(".age-hours");

const calcBirthdayBtn = document.querySelector(".calc-birthday");
const birthdayResult = document.querySelector(".birthdayResult");
const daysBirthday = document.querySelector(".birthday-day");
const secBirthday = document.querySelector(".birthday-sec");

let person;
const downloadArr = [];

// class
class Person {
  constructor(name, weight, height, birthday) {
    this.name = name;
    this.weight = weight;
    this.height = height * 0.304;
    this.birthday = birthday;
  }

  displayWelcome(el) {
    el.textContent = `Welcome ${this.name}!`;
  }

  calcBMI() {
    return this.weight / (this.height * this.height);
  }

  calcBMIstatus() {
    if (this.calcBMI() <= 18.5) return "Underweight";
    if (this.calcBMI() >= 18.5 && this.calcBMI() <= 24.9)
      return "Normal weight";
    if (this.calcBMI() >= 25 && this.calcBMI() <= 29.9) return "Overweight";
    if (this.calcBMI() >= 30) return "Obesity";
  }

  calcAgeDays(birthday) {
    const persent = new Date().getTime();
    const date = new Date(person.birthday).getTime();

    return (persent - date) / (1000 * 60 * 60 * 24);
  }

  calcAgeYears() {
    return (this.calcAgeDays() / 365).toFixed();
  }
  calcAgeHours() {
    return (this.calcAgeDays() * 24).toFixed();
  }
  calcAgeMin() {
    return (this.calcAgeDays() * 24 * 60).toFixed();
  }
  calcAgeSec() {
    return (this.calcAgeDays() * 24 * 3600).toFixed();
  }

  dayInNextBirthday() {
    let birthdayArr = this.birthday.split("/");
    birthdayArr.pop(-1);
    birthdayArr.push(new Date().getFullYear() + 1);
    let birthdayNext = birthdayArr.join("/");

    const birthdayNextTime = new Date(birthdayNext).getTime();
    const birthdayTime = new Date().getTime();

    const days = (birthdayNextTime - birthdayTime) / (1000 * 60 * 60 * 24);

    return (days - 365).toFixed();
  }
  birthdayInSec() {
    return this.dayInNextBirthday() * 24 * 3600;
  }
}
btnContainer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("btn")) return;

  const alloutput = document.querySelectorAll(".output");
  alloutput.forEach((out) => out.classList.add("hidden"));

  btnContainer
    .querySelectorAll(".btn")
    .forEach((btn) => btn.classList.remove("active"));

  e.target.classList.add("active");

  document.querySelector(`.${e.target.dataset.tab}`).classList.remove("hidden");
});

nextBtn.addEventListener("click", function () {
  inputContainer.classList.add("hidden");
  btnContainer.classList.remove("hidden");
  welMessage.classList.remove("hidden");
  downloadBtn.classList.remove("hidden");

  allInput.forEach((i) => {
    downloadArr.push(i.value);

    if (i.value === "") {
      i.classList.add("empty");
    }
    i.classList.remove("empty");
  });

  person = new Person(
    nameInput.value,
    weightInput.value,
    heightInput.value,
    birthdayInput.value
  );
  person.displayWelcome(welMessage);
});

bmiBtn.addEventListener("click", function () {
  bmiResult.textContent = `${person.name} your BMI is ${+person
    .calcBMI()
    .toFixed(2)} kg/m2`;

  downloadArr.push("bmi: " + person.calcBMI().toFixed(2));

  bmiStatus.textContent = `Status : ${person.calcBMIstatus()}`;
});

calcAgeBtn.addEventListener("click", function () {
  person.calcAgeDays();

  AgeResult.textContent = `${
    person.name
  } you are ${person.calcAgeYears()} years old`;

  ageSec.textContent = `Age in sec : ${person.calcAgeSec()} s`;

  ageMin.textContent = `Age in Mins : ${person.calcAgeMin()} mins`;

  ageHours.textContent = `Age in Hours : ${person.calcAgeHours()} hours`;

  downloadArr.push("Age in years : " + person.calcAgeYears());

  downloadArr.push("Age in sec : " + person.calcAgeSec());
  downloadArr.push("Age in min : " + person.calcAgeMin());
  downloadArr.push("Age in hours : " + person.calcAgeHours());
});

calcBirthdayBtn.addEventListener("click", function () {
  birthdayResult.textContent = `${
    person.name
  } There are ${person.dayInNextBirthday()} days and ${person.birthdayInSec()} sec left in your Birthday🎂`;

  daysBirthday.textContent = `Days : ${person.dayInNextBirthday()}`;
  secBirthday.textContent = `sec : ${person.birthdayInSec()}`;
  downloadArr.push("Days remainig in birthday : " + person.dayInNextBirthday());
  downloadArr.push("sec remainig in birthday : " + person.birthdayInSec());
});

downloadBtn.addEventListener("click", function () {
  const blob = new Blob([downloadArr], { type: "octet-stream" });
  const href = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), {
    href,
    style: "display:none",
    download: "yourdata.csv",
  });
  document.body.appendChild(a);
  a.click();

  URL.revokeObjectURL(href);
  a.remove();
});
