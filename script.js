const convertButton = document.querySelector(".convert-button");
const currencySelectFrom = document.querySelector(".currency-select-from");
const currencySelectTo = document.querySelector(".currency-select-to");

async function fetchExchangeRates() {
   const response = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL");
   const data = await response.json();
   console.log(data);
   return data;
}

async function convertValues() {
   const inputCurrencyValue = document.querySelector(".input-currency").value;
   const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
   const currencyValueConverted = document.querySelector(".currency-value-converted");

      const exchangeRates = await fetchExchangeRates();

      const rates = {
         "USD": exchangeRates.USDBRL.bid,
         "EUR": exchangeRates.EURBRL.bid,
         "GBP": exchangeRates.GBPBRL.bid,
         "BRL": 1 // Real Brasileiro é a base
      };

      const fromRate = rates[currencySelectFrom.value];
      const toRate = rates[currencySelectTo.value];

      const convertedValue = (inputCurrencyValue * fromRate) / toRate;

      currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
         style: "currency",
         currency: currencySelectTo.value
      }).format(convertedValue);

      currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
         style: "currency",
         currency: currencySelectFrom.value
      }).format(inputCurrencyValue);

}

function changeCurrencyFrom() {
   const currencyNameFrom = document.getElementById("currency-name-from");
   const currencyImageFrom = document.querySelector(".currency-img-from");


   if (currencySelectFrom.value === "USD") {
      currencyNameFrom.innerHTML = "Dolar Americano";
      currencyImageFrom.src = "./assets/dolarSimbol.png";
   }

   if (currencySelectFrom.value === "EUR") {
      currencyNameFrom.innerHTML = "Euro";
      currencyImageFrom.src = "./assets/euroSimbol.png";
   }

   if (currencySelectFrom.value === "GBP") {
      currencyNameFrom.innerHTML = "Libra Esterlina";
      currencyImageFrom.src = "./assets/libraSimbol.png";
   }

   if (currencySelectFrom.value === "BRL") {
      currencyNameFrom.innerHTML = "Real Brasileiro";
      currencyImageFrom.src = "./assets/realSimbol.png";
   }


}

function changeCurrencyTo() {
   const currencyName = document.getElementById("currency-name");
   const currencyImage = document.querySelector(".currency-img");


   if (currencySelectTo.value === "USD") {
      currencyName.innerHTML = "Dolar Americano";
      currencyImage.src = "./assets/dolarSimbol.png";
   }

   if (currencySelectTo.value === "EUR") {
      currencyName.innerHTML = "Euro";
      currencyImage.src = "./assets/euroSimbol.png";
   }

   if (currencySelectTo.value === "GBP") {
      currencyName.innerHTML = "Libra Esterlina";
      currencyImage.src = "./assets/libraSimbol.png";
   }

   if (currencySelectTo.value === "BRL") {
      currencyName.innerHTML = "Real Brasileiro";
      currencyImage.src = "./assets/realSimbol.png";
   }

   convertValues();
}

currencySelectFrom.addEventListener("change", changeCurrencyFrom);
currencySelectTo.addEventListener("change", changeCurrencyTo);
convertButton.addEventListener("click", convertValues);