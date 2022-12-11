import './style.css'
import './index.html'

const apiUrl = "https://api.quotable.io/random"
const quote = document.getElementById("text");
const author = document.querySelector("#author")
const button = document.querySelector("button");
let tweetLink = document.getElementById("tweet-quote")
let body = document.querySelector('body')

async function getApi(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data)
  quote.textContent = `"${data.content}"`
  author.textContent = `${data.author}`

  /* Making twitter url */ 

  let twitterUrl = new URL("https://twitter.com/intent/tweet?hashtags=quotes");

  /*  taking values from object */
  let arr = Object.values(data)

  /* copying quote and author values into separate arrays */
  let newArr = arr.slice(1, 2)
  let arrAuthor = arr.slice(2, 3);
  /* passing arrays to strings */
  let textStr = newArr.toString();
  let authorStr = arrAuthor.toString()

  /* spliting strings */

  let lastStr = textStr.split(" ")
  authorStr = authorStr.split(" ")

  /* joining strings with %20 in order to concatenate them into the URL */

  lastStr = lastStr.join("%20")
  authorStr = authorStr.join("%20")

  let lastUrl = `https://twitter.com/intent/tweet?hashtags=quotes&text=${lastStr}%20${authorStr}`

  /* Injecting URL link to "a" element */

  tweetLink.setAttribute("href", lastUrl)

}

const randomColor = () => {
  let r = Math.floor(Math.random() * 255)
  let g = Math.floor(Math.random() * 255)
  let b = Math.floor(Math.random() * 255)
  let color = `rgb(${r}, ${g}, ${b})`
  return color 

}
randomColor()  

getApi(apiUrl)
button.addEventListener('click', () => {
  document.documentElement.style.setProperty('--main-bg-color', randomColor());
  getApi(apiUrl)
} )



