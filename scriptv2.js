const getScheme = window.matchMedia("(prefers-color-scheme: dark)");
const toggleSwitch = document.querySelector("#theme-switch");
const historialArray = [];
let boxHistorial;
let flag;
function calc(value) {
  try {
    let decimals = 0;
    let result = (value) ? eval(value) : 0;
    result = parseFloat(result);
    const integer = Math.trunc(result);
    decimals = result - integer;
    decimals = [...(`${decimals}`)].length;
    decimals = (decimals < 6) ? decimals : 6;
    result = (decimals - 1 > 0) ? result.toPrecision(decimals) : result;
    if (value !== 0) {
      addtoHistorial(value, result);
    }
    if (flag) {
      showHistorial();
    }
    return result;
  } catch (err) {
    let { message } = err;
    message = (message === "Unary operator used immediately before exponentiation expression. Parenthesis must be used to disambiguate operator precedence") ? "Parentheses should be used to disambiguate operator precedence. Parentheses must be used immediately before the exponentiation expression. " : "Please enter a valid operation";
    alert(err.message = message);
  }
  const result = "0";
  return result;
}

function squareroot(value = 0) {
  try {
    const ans = eval(value);
    if (ans < 0) throw "Please, the square root is only defined for positive numbers in the domain of real numbers. ";
    let result = ans > 0 ? Math.sqrt(ans) : 0;
    result = ((result * 2) % 2 === 0) ? result : result.toPrecision(6);
    if (result !== 0) {
      const show_value = `√${value}`;
      addtoHistorial(show_value, result);
    }
    if (flag) {
      showHistorial();
    }
    return result;
  } catch (err) {
    alert(err.message = "Please enter a valid operation");
  }
  return value;
}
function opposite(value = 0) {
  try {
    const result = (isNaN(value)) ? value : (-value);
    return result;
  } catch (err) {
    alert(err.message = "Please enter a valid operation");
  }
}
function lastdel(value) {
  const result = [...value];
  result.pop();
  return result.join("");
}
function porcient(value) {
  try {
    let result = value;
    if (isNaN(result)) {
      result = calc(value);
    }
    result = (result !== 0) ? (result / 100).toPrecision(3) : 0;
    return result;
  } catch (err) {
    alert(err);
  }
}

function detectColorScheme() {
  const themeSys = getScheme.matches ? "dark" : "light";
  let theme = localStorage.theme ? localStorage.theme : themeSys;
  document.documentElement.setAttribute("data-theme", theme);
  // default to light
  // local storage is used to override OS theme settings
  if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") === "dark") {
      theme = "dark";
      document.documentElement.setAttribute("data-theme", "dark");
    }
  } else if (!window.matchMedia) {
    // matchMedia method not supported
    return false;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    // OS theme setting detected as dark
    theme = "dark";
    document.documentElement.setAttribute("data-theme", "dark");
  }
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
  // dark theme preferred, set document with a `data-theme` attribute
}

detectColorScheme();

// function that changes the theme, and sets a localStorage variable to track the theme between page loads
function switchTheme(e) {
  if (e.target.checked) {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
    toggleSwitch.checked = true;
  } else {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
    toggleSwitch.checked = false;
  }
}

// listener for changing themes
toggleSwitch.addEventListener("change", switchTheme, false);
getScheme.addEventListener("change", detectColorScheme);
// pre-check the dark-theme checkbox if dark-theme is set
if (document.documentElement.getAttribute("data-theme") === "dark") {
  toggleSwitch.checked = true;
}

function historial() {
  const mql = window.matchMedia("(max-width: 620px)");
  const numbers = document.getElementById("numbers");
  numbers.setAttribute("state", "non-clicked");
  if (document.getElementById("boxHistorial") == null && !mql.matches) {
    numbers.setAttribute("state", "clicked");
    constructorHistoryBox();
    showHistorial();
    flag = true;
    return flag;
  } if (document.getElementById("boxHistorial") == null && mql.matches) {
    numbers.setAttribute("state", "clicked");
    constructorHistoryBoxMobile(numbers);
    showHistorial();
    flag = true;
    return flag;
  }
  boxHistorial.remove();
  flag = false;
  return flag;
}
function addtoHistorial(value, result) {
  const operationInput = `${value} <br> = ${result}`;
  if (historialArray[0] !== operationInput && [...value].length > 1) {
    if (historialArray.unshift(operationInput) > 6) {
      historialArray.pop();
    }
  }
  return historialArray;
}
function showHistorial() {
  let heading;
  if (!flag) {
    historialArray.map((value, index) => {
      const numindex = index + 1;
      heading = `h${numindex}`;
      const element = document.createElement(heading);
      element.innerHTML = `${value}`;
      boxHistorial.appendChild(element);
    });
  } else {
    boxHistorial.innerHTML = "";
    historialArray.map((value, index) => {
      const numindex = index + 1;
      heading = `h${numindex}`;
      const element = document.createElement(heading);
      element.innerHTML = `${value}`;
      boxHistorial.appendChild(element);
    });
  }
}
function constructorHistoryBox() {
  boxHistorial = document.createElement("div");
  boxHistorial.setAttribute("id", "boxHistorial");
  document.body.appendChild(boxHistorial);
  boxHistorial = document.getElementById("boxHistorial");
  boxHistorial.classList.add("history-box");
}
function constructorHistoryBoxMobile(numbers) {
  boxHistorial = document.createElement("div");
  boxHistorial.setAttribute("id", "boxHistorial");
  numbers.insertBefore(boxHistorial, numbers.children[0]);
  boxHistorial = document.getElementById("boxHistorial");
  boxHistorial.classList.add("history-box-mobile");
}
// window.addEventListener("resize",() => historial());
const mql = window.matchMedia("(max-width: 620px)");

mql.onchange = (e) => {
  const numbers = document.getElementById("numbers");
  if (e.matches) {
    /* the viewport is 600 pixels wide or less */
    if (numbers.getAttribute("state") === "clicked") {
      console.log(numbers.getAttribute("state"));
      boxHistorial.remove();
      constructorHistoryBoxMobile(numbers);
      showHistorial();
    }
  } else if (numbers.getAttribute("state") === "clicked") {
    /* the viewport is more than 600 pixels wide */
    boxHistorial.remove();
    constructorHistoryBox();
    showHistorial();
  }
};
