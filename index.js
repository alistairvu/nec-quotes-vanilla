// add service worker
window.onload = () => {
  "use strict"

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
  }
}

let quote = ""
let author = ""
const rootElement = document.getElementById("root")
const url = "https://type.fit/api/quotes"

const getQuotes = async () => {
  rootElement.innerHTML = `
    <p class="loading">Loading...</p>
  `

  const res = await fetch(url)
  const data = await res.json()

  const length = data.length
  const randomQuote = data[Math.floor(Math.random() * length)]

  quote = randomQuote.text
  author = randomQuote.author
  rootElement.innerHTML = `
    <div class="container">
      <p class="quote">"${quote}"</p>
      <p class="author">${author !== null ? author : ""}</p>
      <button class="quote-btn">
        Get another quote
      </button>
    </div>
  `
  document.querySelector(".quote-btn").addEventListener("click", getQuotes)
}

getQuotes()
