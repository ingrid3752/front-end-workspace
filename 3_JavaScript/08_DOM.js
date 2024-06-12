function btn1() {
  console.log(document.head);
  console.log(document.body);

  //   동일한 태그가 여러개 존재할 수 있기 때문에 배열로 리턴
  const div = document.getElementsByTagName("div");
  console.log(div);
  console.log(div[0]); // <div>Hello, World! </div>
  console.log(div[1]); // <div>Hello, JavaScript! </div>
}

function btn2() {
  const div = document.getElementById("testId");
  console.log(div);
}

function btn3() {
  // 동일한 class 속성 값을 갖는 태그가 여러개 존재할 수 있기 때문에 배열로 리턴
  const div = document.getElementsByClassName("testClass");
  console.log(div);
}

function btn4() {
  // 동일한 name 속성 값을 갖는 태그가 여러개 존재할 수 있기 때문에 배열로 리턴
  const div = document.getElementsByName("testName");
  console.log(div);
}

function btn5() {
  let div = document.querySelector("#testId2");
  console.log(div);
  div = document.querySelectorAll("div");
  console.log(div);
  console.log(div[0]);
}

function btn6() {
  const div = document.querySelectorAll(".testClass");
  div[0].textContent = "<span>안녕하세요</span>";
  div[1].innerHTML = "<span>안녕하세요</span>";
  console.log(div[1].innerHTML);
}

function btn7() {
  const div = document.querySelector("#testId");
  div.setAttribute("data-test", "테스트");
  div.setAttribute("data-test", "테스트2");
  console.log(div.getAttribute("data-test"));
}

function btn8() {
  const div = document.querySelector("#testId");
  div.style.color = "orange";
  div.style.backgroundColor = "yellow";
}
const div = document.querySelector("#testId2");

function btn9() {
  div.classList.add("black");
}
function btn10() {
  div.classList.remove("black");
}
function btn11() {
  const check = div.classList.contains("black");
  if (check) {
    div.classList.remove("black");
  } else {
    div.classList.add("black");
  }
}

function btn12() {
  div.classList.toggle("black");
}

function btn13() {
  // <p>Lorem Ipsum</p>
  const p = document.createElement("p");
  p.innerHTML = "Lorem Ipsum";

  //   div에 만든 p태그 추가
  div.appendChild(p);
}

function btn14() {
  const div = document.querySelector("#testId3"); // === p.parentNode
  const p = document.querySelector("p");
  //   div.removeChild(p);
  p.parentNode.removeChild(p);
}
