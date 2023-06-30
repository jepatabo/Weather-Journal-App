/* Global Variables */
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const generate = document.getElementById("generate");
const temp = document.getElementById("temp");
const content = document.getElementById("content");
const dateElem = document.getElementById("date");
const feeling = document.getElementById("feeling");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//API
const api =
  "https://api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key}";
const url = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=047fc53a763a0dbd4d8290f5ec7b2b92&units=imperial";

//event listener click
generate.addEventListener("click", function (a) {
  a.preventDefault();
  const fullUrl = url + zip.value + apiKey;
  getInfo(fullUrl).then(function (info) {
    cureInfo(info).then(function (data) {
      upUserInterface(data);
    });
  });
});

//async function getInfo passing url as parameter
async function getInfo(url) {
  try {
    const result = await fetch(url);
    const info = await result.json();
    //if data code is set to ok (200)
    if (info.cod === 200) {
      return info;
    } else {
      console.log(info.message);
      return info;
    }
  } catch (error) {
    console.log(error);
  }
}

//set curInfo to an async function passing info as parameter
const cureInfo = async function (info) {
  console.log(info);
  try {
    const data = {
      date: date,
      feelings: feelings.value,
      temp: info.main.temp,
      content: info.weather[0].description,
    };
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

//set postInfo to an async function passing url and info as parameters
const postInfo = async function (url = "", info = {}) {
  try {
    const finalR = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    });
    return finalR;
  } catch (error) {
    console.log(error);
  }
};

//set retInfo to an async function passing url as parameter
const retInfo = async function (url) {
  const info = await fetch(url);
  try {
    const res = await info.json;
    return res;
  } catch (error) {
    console.log(error);
  }
};

//output
const upUserInterface = async function (info) {
  if (zip.value === "" || zip.value === null) {
    alert("Please fill zip code");
  } else if (feelings.value === "" || feelings.value === null) {
    alert("Please enter your feelings");
  } else {
    const response = info;
    dateElem.innerHTML = "Today's date is: " + newDate;
    temp.innerHTML = "The current tempreture is: " + response.temp + " °F";
    feeling.innerHTML = "Your feelings at the moment are: " + response.feelings;
    content.innerHTML = "The current condition is: " + response.content;
  }
};

//Reset Form
function myFunction() {
  document.getElementById("myForm").reset();
}
