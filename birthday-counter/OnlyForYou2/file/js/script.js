const start_btn = document.querySelector('.start_btn button');
const info_box = document.querySelector('.info_box');
const exit_btn = info_box.querySelector(' .buttons .quit ');
const continue_btn = info_box.querySelector('.buttons .restart');
const quiz_box = document.querySelector('.quiz_box');
const option_list = document.querySelector('.option_list');
const timeCount = quiz_box.querySelector('.timer .timer_sec');
start_btn.onclick = () => {
  info_box.classList.add('activeInfo');
};

exit_btn.onclick = () => {
  info_box.classList.remove('activeInfo');
};
continue_btn.onclick = () => {
  info_box.classList.remove('activeInfo');
  quiz_box.classList.add('activeQuiz');
  showQuestions(0);
  queCounter(1);
  startTimer(10);
};

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let userScore = 0;

const next_btn = quiz_box.querySelector('.next_btn');
const result_box = document.querySelector('.result_box');
const restart_quiz = result_box.querySelector('.buttons .restart');
const quit_quiz = result_box.querySelector('.buttons .quit');
quit_quiz.onclick = () => {
  window.location.reload();
};
restart_quiz.onclick = () => {
  quiz_box.classList.add('activeQuiz');
  result_box.classList.remove('activeResult');
};

next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    next_btn.style.display = 'none';
  } else {
    console.log('задача выполнена');
    showResultBox();
  }
};
function showQuestions(index) {
  const que_text = document.querySelector('.que_text');

  let que_tag =
    '<span>' +
    questions[index].numb +
    '.' +
    questions[index].question +
    '</span>';
  let option_tag =
    '<div class="option">' +
    questions[index].options[0] +
    '<span></span></div>' +
    '<div class="option">' +
    questions[index].options[1] +
    '<span></span></div>' +
    '<div class="option">' +
    questions[index].options[2] +
    '<span></span></div>' +
    '<div class="option">' +
    questions[index].options[3] +
    '<span></span></div>';

  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  const option = option_list.querySelectorAll('.option');
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute('onClick', 'optionSelected(this)');
  }
}
let tickIcon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
let crossIcon =
  '<div class="icon cross"><i class="fa-solid fa-times"></i></div>';
function optionSelected(answer) {
  let userAns = answer.textContent;
  let correctAns = questions[que_count].answer;
  let allOptions = option_list.children.length;

  if (userAns == correctAns) {
    userScore += 1;
    console.log(userScore);

    answer.classList.add('correct');
    console.log('Answer is Correct');
    answer.insertAdjacentHTML('beforeend', tickIcon);
  } else {
    answer.classList.add('wrong');
    console.log('answer is wrong');
    answer.insertAdjacentHTML('beforeend', crossIcon);

    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correctAns) {
        option_list.children[i].setAttribute('class', 'option correct');
        option_list.children[i].insertAdjacentHTML('beforeend', tickIcon);
      }
    }
  }
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add('disabled');
  }
  next_btn.style.display = 'block';
}

function showResultBox() {
  info_box.classList.remove('activeInfo');
  quiz_box.classList.remove('activeQuiz');
  result_box.classList.add('activeResult');
  const scoreText = result_box.querySelector('.score_text');
  if (userScore < 3) {
    let scoreTag =
      "<span> Эх, you'll always be a dumb blonde<p>" +
      userScore +
      '</p>правильных ответа из<p>' +
      questions.length +
      '</p></span>';
    scoreText.innerHTML = scoreTag;
  } else if (userScore < 1) {
    let scoreTag =
      "<span> Эх, you'll always be a dumb blonde<p>" +
      userScore +
      '</p>правильных ответа из<p>' +
      questions.length +
      '</p></span>';
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      '<span> <strong>Умница! </strong>Ты почти у цели <p>' +
      userScore +
      '</p>правильных ответа из<p>' +
      questions.length +
      '</p></span>';
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer() {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
  }
}

function queCounter(index) {
  const bottom_ques_counter = quiz_box.querySelector('.total_que');
  let totalQuesCountTag =
    '<span> <p>' +
    index +
    '</p> из <p> ' +
    questions.length +
    '</p> заданий егэ </span>';
  bottom_ques_counter.innerHTML = totalQuesCountTag;
}
