const BASEURL = `https://v6.exchangerate-api.com/v6/6f47efa01b79fc285abb1550/latest`;
const formSelect = document.querySelector('.from select');
const toSelect = document.querySelector('.to select');
const fromSelectContainer = document.querySelector('.from .select-container')
const submitButton = document.querySelector('#Get_Rate_Button');
const userValue = document.querySelector('#user_input')

const toSelectContainer = document.querySelector('.to .select-container')
const card = document.querySelector('.card');


const result = document.querySelector('#result');
console.log(formSelect);
console.log(toSelect);
console.log(fromSelectContainer);
console.log(toSelectContainer);



for(let fromCurrency in countryList){
    let option = document.createElement('option');
    option.innerText = fromCurrency;
    option.value = fromCurrency;
    if(fromCurrency == 'USD'){
      option.selected = "selected";
      const flagImage = document.createElement('img');
      if (fromSelectContainer.querySelector('img')) {
        fromSelectContainer.querySelector('img').remove();
      }
      let country = countryList[fromCurrency];
      console.log(country);
      let newSrc = `https://flagsapi.com/${country}/flat/64.png`
      console.log(newSrc);
      flagImage.src = newSrc;
      fromSelectContainer.prepend(flagImage);
    }
    formSelect.append(option)
    formSelect.addEventListener('change',FromselectingCountry)
}

function FromselectingCountry(e){
  const flagImage = document.createElement('img');
  let currcny = e.target.value;
  console.log(currcny);
  if (fromSelectContainer.querySelector('img')) {
    fromSelectContainer.querySelector('img').remove();
  }
  let country = countryList[currcny];
  console.log(country);
  let newSrc = `https://flagsapi.com/${country}/flat/64.png`
  console.log(newSrc);
  flagImage.src = newSrc;
  fromSelectContainer.prepend(flagImage);
  

}
for(let toCurrency in countryList){
  let option = document.createElement('option');
  option.innerText = toCurrency;
  option.value = toCurrency;
  if(toCurrency == 'INR'){
    option.selected = "selected";
    const flagImage = document.createElement('img');
    if (toSelectContainer.querySelector('img')) {
      toSelectContainer.querySelector('img').remove();
    }
    let country = countryList[toCurrency];
    console.log(country);
    let newSrc = `https://flagsapi.com/${country}/flat/64.png`
    console.log(newSrc);
    flagImage.src = newSrc;
    toSelectContainer.prepend(flagImage);
  }
  toSelect.append(option)
  toSelect.addEventListener('change',ToselectingCountry)
}

function ToselectingCountry(e){
  const flagImage = document.createElement('img');
  let currcny = e.target.value;
  console.log(currcny);
  if (toSelectContainer.querySelector('img')) {
    toSelectContainer.querySelector('img').remove();
  }
  
  let country = countryList[currcny];
  console.log(country);
  let newSrc = `https://flagsapi.com/${country}/flat/64.png`
  console.log(newSrc);
  flagImage.src = newSrc;
  toSelectContainer.prepend(flagImage);
}



submitButton.addEventListener('click',getExchangeRate);


async function getExchangeRate(e) {
  e.preventDefault();
  
  let amountValue = userValue.value.trim();
  if (amountValue <= 0) {
    userValue.value = 1;
    amountValue = 1;
  }
  let fromCurrency = formSelect.value;
  let toCurrency = toSelect.value;
  const formURL = `${BASEURL}/${fromCurrency}`;
  try {
    let response = await fetch(formURL);
    let data = await response.json();
    let rate = data["conversion_rates"][`${toCurrency}`];
    let finalAmount = amountValue * rate;
    if (finalAmount != null) {
      result.innerText = `${amountValue} ${fromCurrency} = ${finalAmount.toFixed(2)} ${toCurrency}`;
    }
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
  } 
}

