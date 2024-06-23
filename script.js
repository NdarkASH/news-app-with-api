const apiKey = "ee7b28e27cbd4e80b8f2f6620e834e9f";

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button")

 
//api

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2024-05-23&sortBy=publishedAt&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.log("hahahahaha errror", error)
    return [];
  }
}

// searchButton
searchButton.addEventListener("click", async function () {
    const query = searchField.value.trim();
    if (query !== "") {
      try {
        const articles = await fetchNewsQuery(query);
        displayBlogs(articles);
      } catch (error) {
        console.log("gagal bre dapetin searchnya", error);
      }
    }
  })

// query searchButton
async function fetchNewsQuery(query){
    try {
      const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2024-05-23&sortBy=publishedAt&apiKey=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.articles;
    } catch (error) {
      console.error("hahahahaha errror", error);
      return [];
    }
  }
  
// display articles
function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;

    const title = document.createElement("h2");
    const truncatedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "...."
        : article.title;
    title.textContent = truncatedTitle;
    const description = document.createElement("p");
    const truncatedDes =
      article.description.length > 120
        ? article.description.slice(0, 120) + "...."
        : article.description;
    description.textContent = truncatedDes;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    blogContainer.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("yahahahahah", error);
  }
})();
