// -----------------RANDOMIZER-------------
let seconds = 0;
let interval = null;

let element = document.querySelector(".settings");
let element_2 = document.querySelector(".form-row");
let element_3 = document.querySelector(".action");
let element_7 = document.querySelector(".auto-p");
let fallButton =
  '<button style="cursor:pointer;" type="button" class="button emoji" onclick="let n=this.innerText.split(`-`)[1]; if(n<4)this.innerText=`⚠️-${++n}`">⚠️-0</button>';

let warnButton =
  '<button style="cursor:pointer;" type="button" class="button emoji" onclick="let n=this.innerText.split(`-`)[1]; if(n<2)this.innerText=`📛-${++n}`">📛-0</button>';

document.querySelector(".action").onclick = function () {
  if (document.querySelector(".action").innerHTML == "Подтвердить") {
  } else {
    auto();
  }
};

function auto() {
  let index_rol = 0;
  let kolichestvo_user = document.querySelector(".user-form").value || 10;
  let final_roles = [];
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
      let roles_massiv = ["Мафия", "Комиссар", "Доктор", "Дон"];
      let mafia = Math.floor(kolichestvo_user / 3);

      //clear-roles
      document.querySelector(".auto-p").innerHTML = "";

      //randomizing roles
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
        renderRoles(i_new, roles_massiv[rand]);
        i_new = i_new + 1;
        final_roles.push(roles_massiv[rand]);
      }
      localStorage.setItem("roles", JSON.stringify(final_roles));
      console.log(final_roles);
    }
  }
}

function setRoles() {
  console.log("set!");
  const roles = JSON.parse(localStorage.getItem("roles")) || [];
  roles.map((role, index) => {
    renderRoles(index + 1, role);
  });
}

setRoles();

function renderRoles(number, role) {
  document.querySelector(".auto-p").innerHTML += `
        <div class='${
          ["Мафия", "Комиссар", "Доктор", "Дон"].includes(role)
            ? "active-role"
            : ""
        }'>
          <div class='role-copy' onclick='copyRole(event)'>
          ${number}  ${role} 
          </div>

           <div >  ${fallButton} ${warnButton} </div> 

         </div> 
         <hr/>
        `;
}

function copyRole(event) {
  if (event.target.innerText == "Скопировано!") {
    return;
  }
  const role = event.target.innerText;
  navigator.clipboard.writeText(role);
  event.target.innerText = "Скопировано!";
  setTimeout(() => {
    event.target.innerText = role;
  }, 2000);
}

// -----------------TIMER--------------

function updateDisplay() {
  const timerElement = document.getElementById("timerDisplay");
  const mins = Math.floor(seconds / 60);

  const secs = seconds % 60;

  timerElement.innerText = `${String(mins).padStart(2, "0")}:${String(
    secs
  ).padStart(2, "0")}`;

  if (mins == 0 && secs <= 10) {
    timerElement.classList.add("timer-animation");
  } else {
    timerElement.classList.remove("timer-animation");
  }
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
