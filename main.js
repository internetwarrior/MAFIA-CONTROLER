// -----------------RANDOMIZER-------------
let seconds = 0;
let interval = null;

let element = document.querySelector(".settings");
let element_2 = document.querySelector(".form-row");
let element_3 = document.querySelector(".action");
let element_7 = document.querySelector(".auto-p");
let fallButton =
  '<button type="button" class="button emoji" onclick="let n=this.innerText.split(`-`)[1]; if(n<4)this.innerText=`⚠️-${++n}`">⚠️-0</button>';

let warnButton =
  '<button type="button" class="button emoji" onclick="let n=this.innerText.split(`-`)[1]; if(n<2)this.innerText=`📛-${++n}`">📛-0</button>';

document.querySelector(".action").onclick = function () {
  if (document.querySelector(".action").innerHTML == "Подтвердить") {
  } else {
    auto();
  }
};

document.querySelector(".button-action").onclick = function () {
  if (document.querySelector(".button-action").innerHTML == "Вернуться назад") {
    document.querySelector(".auto-p").innerHTML = "";
    function_hiden_1();
  } else {
    function_hiden_2();
  }
};

function auto() {
  let index_rol = 0;
  let kolichestvo_user = document.querySelector(".user-form").value || 10;

  if (kolichestvo_user > 30) {
    alert("Не вводите так много!");
  } else {
    if (kolichestvo_user == "" || kolichestvo_user == undefined) {
      alert("Введите какое либо значение");
    } else {
      let kolichestvo_user_massiv = [];
      let area_rand = [];
      let i = 1;
      let i_new = 1;
      let roles_massiv = ["Мафия", "Комиссар", "Доктор"];
      let mafia = Math.floor(kolichestvo_user / 3);

      document.querySelector(".auto-p").innerHTML = "";
      while (roles_massiv.length != mafia + 2) {
        roles_massiv.push("Мафия");
      }
      while (roles_massiv.length != kolichestvo_user) {
        roles_massiv.push("Мирный Житель");
      }
      while (kolichestvo_user_massiv.length != kolichestvo_user) {
        kolichestvo_user_massiv.push(i);
        i = i + 1;
      }
      let rand;
      for (
        let schetchik = 0;
        schetchik < kolichestvo_user_massiv.length;
        schetchik = schetchik + 1
      ) {
        rand = Math.floor(Math.random() * kolichestvo_user_massiv.length);
        while (area_rand.indexOf(rand) != -1) {
          rand = Math.floor(Math.random() * kolichestvo_user_massiv.length);
        }

        if (area_rand.indexOf(rand) == -1) {
          area_rand.push(rand);
        }

        document.querySelector(".auto-p").innerHTML += `
        <div style=''>
      
         ${i_new}  ${roles_massiv[rand]} 
           <div >  ${fallButton} ${warnButton} <div/> 
         <div/> 
         <hr/>
        `;

        i_new = i_new + 1;
      }
    }
  }
}

// -----------------TIMER--------------

function updateDisplay() {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  document.getElementById("timerDisplay").innerText = `${mins}:${secs}`;
}

function timerLoop() {
  if (seconds > 0) {
    seconds--;
    updateDisplay();
  } else {
    clearInterval(interval);
    interval = null;
  }
}

function startTimer() {
  seconds = 60;
  updateDisplay();
  if (interval) clearInterval(interval);
  interval = setInterval(timerLoop, 1000);
}

function addThirty() {
  seconds += 30;
  updateDisplay();
}

updateDisplay();
