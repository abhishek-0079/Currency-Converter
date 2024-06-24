const BASE_URL = "https://api.exchangerate-api.com/v4/latest/";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


let i=0;
for(let select of dropdowns){
  for(currCode in countryList){
    // console.log(currCode,countryList[currCode]); for accessing all the country codes and country  list
    let newOption =document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;

    if (select.name==="from" && currCode==="USD"){
      newOption.selected="selected";
    }
    else if(select.name==="to" && currCode==="INR"){
      newOption.selected="selected";
    }
    select.append(newOption);
 
}
select.addEventListener("change",(event)=>{
  updateFlag(event.target);//Adding event listener that hen we change the country code the flag changes
})
}

const updateFlag=(element)=>{
let currCode=element.value;
let countryCode =countryList[currCode];
let newImg=`https://flagsapi.com/${countryCode}/flat/64.png`;

let img =element.parentElement.querySelector("img");
img.src=newImg;

};



btn.addEventListener("click", async (event) => {
  event.preventDefault();

  let amount = document.querySelector(".amount input");

  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}${fromCurr.value}`;

  fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let rate = data.rates[toCurr.value];

      if (!rate) {
        throw new Error(`Exchange rate not available for ${toCurr.value}`);
      }

      let finalAmount = amtVal * rate;

      msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(
        2
      )} ${toCurr.value}`;
    })
    .catch((error) => {
      console.error("Error fetching exchange rates:", error);
      msg.innerText = "Error fetching exchange rates. Please try again later.";
    });
});