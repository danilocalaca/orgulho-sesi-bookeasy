const featuredBooks = [
  { cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=85", genre: "Fantasia", title: "O Pequeno Príncipe", author: "Antoine de Saint-Exupéry", status: "Disponível" },
  { cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=85", genre: "Ficção científica", title: "1984", author: "George Orwell", status: "Disponível" },
  { cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=85", genre: "Romance", title: "Dom Quixote", author: "Miguel de Cervantes", status: "Emprestado", loaned: true },
  { cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=700&q=85", genre: "Fantasia", title: "Harry Potter e a Pedra Filosofal", author: "J.K. Rowling", status: "Disponível" }
];

const recommendedBooks = [
  { cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=700&q=85", genre: "Ficção científica", title: "Jogos Vorazes", author: "Suzanne Collins", status: "Disponível" },
  { cover: "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=700&q=85", genre: "Romance", title: "A Culpa é das Estrelas", author: "John Green", status: "Disponível" },
  { cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=85", genre: "Biografia", title: "Ainda Estou Aqui", author: "Marcelo Rubens Paiva", status: "Disponível" },
  { cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=700&q=85", genre: "Fantasia", title: "Percy Jackson e o Ladrão de Raios", author: "Rick Riordan", status: "Disponível" }
];

function bookCard(book) {
  return `<article class="book-card"><img class="book-cover" src="${book.cover}" alt="Capa de ${book.title}" loading="lazy"><div class="book-meta-top"><span class="genre">${book.genre}</span><span class="status${book.loaned ? " loaned" : ""}">${book.status}</span></div><h3>${book.title}</h3><p>${book.author}</p></article>`;
}

document.querySelector("#featured-books").innerHTML = featuredBooks.map(bookCard).join("");
document.querySelector("#recommended-books").innerHTML = recommendedBooks.map(bookCard).join("");

document.querySelectorAll(".category").forEach((category) => {
  category.addEventListener("click", () => {
    document.querySelectorAll(".category").forEach((item) => item.classList.remove("active"));
    category.classList.add("active");
  });
});

document.querySelector("#search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.querySelector("#search-input").value.trim();
  const message = document.querySelector("#search-message");
  message.textContent = query ? `Mostrando resultados para “${query}”.` : "Digite um livro, autor ou categoria para pesquisar.";
});

document.querySelector("[data-focus-search]").addEventListener("click", () => document.querySelector("#search-input").focus());
const loginCta = document.querySelector("#login-cta");
const accountStorageKey = "bookeasy-account-logged-in";
const updateLoginCta = () => {
  loginCta.hidden = localStorage.getItem(accountStorageKey) === "true";
};
updateLoginCta();
window.addEventListener("storage", (event) => {
  if (event.key === accountStorageKey) updateLoginCta();
});
const profileButton = document.querySelector(".profile-button");
const profilePanel = document.querySelector("#profile-panel");
profileButton.addEventListener("click", (event) => {
  event.stopPropagation();
  const open = profileButton.getAttribute("aria-expanded") === "true";
  profileButton.setAttribute("aria-expanded", String(!open));
  profilePanel.setAttribute("aria-hidden", String(open));
  profilePanel.classList.toggle("open", !open);
});
document.addEventListener("click", () => {
  profileButton.setAttribute("aria-expanded", "false");
  profilePanel.setAttribute("aria-hidden", "true");
  profilePanel.classList.remove("open");
});
const menuButton = document.querySelector(".menu-button");
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  document.querySelector(".main-nav").classList.toggle("mobile-open", !open);
});
