let quistions;
let timer = 15;
let etaration = 0;
let score = 0;
let interval;
function declare_alert() {
  return async () => {
    const { value: language } = await Swal.fire({
      title: "Choose Programming Language?",
      input: "select",
      inputOptions: {
        Frontend: {
          js: "Js",
          css: "Css",
          html: "Html",
        },
        Backend: {
          node: "Node.js",
          php: "PHP",
          python: "python",
          roby: "Ruby",
        },
        Database: {
          mongo: "Mongo Db",
          mysql: "Mysql",
        },
      },
      inputPlaceholder: "Select Programming Language",
      confirmButtonText: "Go To Quiz",
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      inputValidator: (value) => {
        if (!value) {
          return "Please select a language!";
        }
      },
    });
    if (language) {
      let res = await fetch(
        "https://mahmoudmans90.github.io/Quiz-App/Apis/" + language + ".json"
      );
      quistions = await res.json();

      switch (language) {
        case "js":
          Lang.innerHTML = "Java Script";
          icon.innerHTML = `<i
            class="fa-brands fa-js fs-1 d-flex justify-content-center align-items-center"
          ></i>`;
          break;
        case "node":
          Lang.innerHTML = "Node Js";
          icon.innerHTML = `<i
            class="fa-brands fa-node-js fs-1 d-flex justify-content-center align-items-center"
          ></i>`;
          break;
        case "html":
          Lang.innerHTML = "Html";
          icon.innerHTML = `<i
            class="fa-brands fa-html5 fs-1 d-flex justify-content-center align-items-center"
          ></i>`;
          break;
        case "css":
          Lang.innerHTML = "Css";
          icon.innerHTML = `<i
            class="fa-brands fa-css3-alt fs-1 d-flex justify-content-center align-items-center"
          ></i>`;
          break;
        case "php":
          Lang.innerHTML = "Php";
          icon.innerHTML = `<i
            class="fa-brands fa-php fs-1 d-flex justify-content-center align-items-center"
          ></i>`;
          break;
        case "python":
          Lang.innerHTML = "Python";
          icon.innerHTML = `<i
            class="fa-brands fa-python fs-1 d-flex justify-content-center align-items-center"
          ></i>s`;
          break;
        case "python":
          Lang.innerHTML = "Ruby";
          icon.innerHTML = `<i
            class="fa-solid fa-ruble-sign fs-1 d-flex justify-content-center align-items-center"
          ></i>s`;
          break;
        case "mysql":
          Lang.innerHTML = "Mysql";
          icon.innerHTML = `<i
            class="fa-solid fa-database fs-1 d-flex justify-content-center align-items-center"
          ></i>s`;
          break;
        case "mongo":
          Lang.innerHTML = "Mongo Db";
          icon.innerHTML = `<i
            class="fa-brands fa-node fs-1 d-flex justify-content-center align-items-center"
          ></i>s`;
          break;

        default:
          break;
      }

      desplayQuistions(quistions, etaration);
    }
  };
}

window.onload = declare_alert();

function desplayQuistions(quistions, etaration) {
  if (etaration >= quistions.length) {
    document.getElementById("quistion").innerHTML = "Quiz is Finshd";
    document.getElementById("Submit").innerHTML = "";
    document.getElementById(
      "answers"
    ).innerHTML = `<h3 class="text-center">You got ${score} from ${quistions.length}</h3>`;

    return;
  }
  document.getElementById("btn_submit").classList.remove("inActivee");
  document.getElementById("btn_submit").removeAttribute("disabled");
  document.getElementById("quistion").innerHTML = quistions[etaration].question;
  document.getElementById("answers").innerHTML = "";
  let NewAnsers = [
    ...quistions[etaration].incorrectAnswers,
    quistions[etaration].correctAnswer,
  ];
  NewAnsers = NewAnsers.sort(() => Math.random() - 0.5);
  NewAnsers.forEach((answer) => {
    document.getElementById("answers").innerHTML += `
    <div
            class="answer text-black mx-auto bg-secondery my-3 py-3 text-center px-3 rounded-3"
            onclick='choseAnswer("${answer.replaceAll("'", "")}" , this)'
          >
           ${answer}
          </div>`;
  });
  spinner(quistions);
}

function spinner(quistions) {
  let spinnerWidth = 6.6666;
  interval = setInterval(() => {
    document.getElementById("spinner").style.width = `${spinnerWidth}%`;
    spinnerWidth += 6.6666;
    if (spinnerWidth > 100) {
      clearInterval(interval);
      desplayQuistions(quistions, ++etaration);
      document.getElementById("spinner").style.width = `0%`;
    }
  }, 1000);
}
function submitAnswer(e) {
  let answer = document.querySelector(".active").innerHTML.trim();
  let answersDivs = document.querySelectorAll(".answer");
  answersDivs.forEach((ans) => {
    ans.classList.remove("answer");
    if (ans.innerHTML.trim() == quistions[etaration].correctAnswer) {
      ans.classList.add("bg-success");
    }
    if (
      ans.innerHTML.trim() == answer &&
      ans.innerHTML.trim() == quistions[etaration].correctAnswer
    ) {
      ans.classList.add("wrong_answer");
    }
  });
  score = quistions[etaration].correctAnswer == answer ? score + 1 : score;
  document.getElementById("btn_next").classList.remove("hide");
  document.getElementById("btn_next").classList.add("show");
  e.classList.add("inActivee");
  e.setAttribute("disabled", true);
}

function choseAnswer(answer, e) {
  let answersDivs = document.querySelectorAll(".answer");
  answersDivs.forEach((answer) => {
    answer.classList.remove("active");
  });
  e.classList.add("active");
}
function goToNextQuistion(e) {
  document.getElementById("spinner").style.width = `0%`;
  clearInterval(interval);
  desplayQuistions(quistions, ++etaration);
}
