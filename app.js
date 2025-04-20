const apiKey = "9841f0f7c7c16eca501a1fbe"; // Your real API key
const base_url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest`;
const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}
const updateExchangeRate = async () => {
    const amountInput = document.querySelector(".amount input");
    let amtVal = amountInput.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amountInput.value = "1";
    }
  
    const from = fromCurr.value;
    const to = toCurr.value;
    const url = `${base_url}/${from}`;
  
    const response = await fetch(url);
  
    if (response.ok) {
      const data = await response.json();
      const rate = data.conversion_rates[to];
      const finalAmount = (rate * amtVal);
      msg.innerText = `${amtVal} ${from} = ${finalAmount} ${to}`;
    } else {
      msg.innerText = "Failed to fetch exchange rate.";
    }
  };
  
  const updateflag=(element)=>{
    let currencycode = element.value;
    let countrycode = countryList[currencycode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let newimg = element.parentElement.querySelector("img");
    newimg.src=newSrc;
};
  button.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
  });
  window.addEventListener("load", () => {
    updateExchangeRate();
  });
  