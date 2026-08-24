const seedBooks = [
  { id: 1, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=85", genre: "Fantasia", title: "O Pequeno Príncipe", author: "Antoine de Saint-Exupéry", year: 1943, description: "Uma história delicada sobre amizade, afeto e o olhar curioso para o mundo." },
  { id: 2, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=85", genre: "Ficção Científica", title: "1984", author: "George Orwell", year: 1949, description: "Um clássico sobre liberdade, vigilância e o poder de controlar a informação." },
  { id: 3, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=85", genre: "Aventura", title: "Dom Quixote", author: "Miguel de Cervantes", year: 1605, status: "Emprestado", description: "As aventuras de um homem que decide transformar seus ideais em realidade." },
  { id: 4, cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=700&q=85", genre: "Fantasia", title: "Harry Potter e a Pedra Filosofal", author: "J.K. Rowling", year: 1997, description: "O início da jornada de Harry Potter no mundo mágico de Hogwarts." },
  { id: 5, cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=700&q=85", genre: "Ficção Científica", title: "Jogos Vorazes", author: "Suzanne Collins", year: 2008, description: "Katniss desafia um sistema cruel para proteger quem ama." },
  { id: 6, cover: "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=700&q=85", genre: "Romance", title: "A Culpa é das Estrelas", author: "John Green", year: 2012, description: "Um encontro transformador entre dois jovens que descobrem novas formas de viver." },
  { id: 7, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=85", genre: "Biografias", title: "Ainda Estou Aqui", author: "Marcelo Rubens Paiva", year: 2015, description: "Memória, família e resistência em uma narrativa brasileira marcante." },
  { id: 8, cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=700&q=85", genre: "Aventura", title: "Percy Jackson e o Ladrão de Raios", author: "Rick Riordan", year: 2005, description: "Uma aventura mitológica cheia de amizade, coragem e descobertas." }
];

const deletedBookKey = "bookeasy-deleted-books";
let deletedBookIds = JSON.parse(localStorage.getItem(deletedBookKey) || "[]");
let books = [...seedBooks.filter((book) => !deletedBookIds.includes(book.id)), ...JSON.parse(localStorage.getItem("bookeasy-extra-books") || "[]")];
const seedStudents = [
  { id: 1, name: "André Silva", className: "9º ano B", email: "andre.silva@sesi.edu.br" },
  { id: 2, name: "Beatriz Oliveira", className: "8º ano A", email: "beatriz.oliveira@sesi.edu.br" },
  { id: 3, name: "Caio Santos", className: "9º ano A", email: "caio.santos@sesi.edu.br" }
];
let students = [...seedStudents, ...JSON.parse(localStorage.getItem("bookeasy-extra-students") || "[]")];
const librarianSessionKey = "bookeasy-librarian-session";

const featuredBooks = books.slice(0, 4);
const recommendedBooks = books.slice(4);
const reservationKey = "bookeasy-reservations";
const requestKey = "bookeasy-reservation-requests";
let reservations = JSON.parse(localStorage.getItem(reservationKey) || "[]");
let reservationRequests = JSON.parse(localStorage.getItem(requestKey) || "[]");
let currentFilter = "Todos";
let currentQuery = "";
let activeStudentId = null;

const isReserved = (book) => reservations.includes(book.id);
const isRequested = (book) => reservationRequests.includes(book.id);

function bookCard(book) {
  const unavailable = book.status === "Emprestado";
  const status = unavailable ? "Emprestado" : isReserved(book) ? "Reservado" : isRequested(book) ? "Solicitado" : "Disponível";
  return `<article class="book-card" data-book-id="${book.id}"><button class="book-card-button" aria-label="Ver detalhes de ${book.title}"><img class="book-cover" src="${book.cover}" alt="Capa de ${book.title}" loading="lazy"><div class="book-meta-top"><span class="genre">${book.genre}</span><span class="status${unavailable ? " loaned" : ""}">${status}</span></div><h3>${book.title}</h3><p>${book.author}</p></button></article>`;
}

function filteredBooks() {
  const query = currentQuery.toLocaleLowerCase();
  return books.filter((book) => {
    const matchesCategory = currentFilter === "Todos" || book.genre.toLocaleLowerCase() === currentFilter.toLocaleLowerCase();
    const searchableText = `${book.title} ${book.author} ${book.genre}`.toLocaleLowerCase();
    return matchesCategory && (!query || searchableText.includes(query));
  });
}

function render() {
  document.querySelector("#featured-books").innerHTML = featuredBooks.map(bookCard).join("");
  document.querySelector("#recommended-books").innerHTML = recommendedBooks.map(bookCard).join("");
  const catalog = filteredBooks();
  document.querySelector("#catalog-books").innerHTML = catalog.length ? catalog.map(bookCard).join("") : `<p class="empty-state">Nenhum livro encontrado para essa busca.</p>`;
  document.querySelector("#catalog-count").textContent = `${catalog.length} ${catalog.length === 1 ? "livro encontrado" : "livros encontrados"}`;
  const reservedBooks = books.filter((book) => isReserved(book) || isRequested(book));
  document.querySelector("#reservation-books").innerHTML = reservedBooks.map(bookCard).join("");
  document.querySelector("#empty-reservations").hidden = reservedBooks.length > 0;
  document.querySelectorAll(".book-card-button").forEach((button) => button.addEventListener("click", () => openModal(Number(button.closest(".book-card").dataset.bookId))));
}

function saveReservations() {
  localStorage.setItem(reservationKey, JSON.stringify(reservations));
  localStorage.setItem(requestKey, JSON.stringify(reservationRequests));
  render();
  renderAdmin();
}

function renderAdmin() {
  if (!document.querySelector("#admin-books")) return;
  const setText = (selector, value) => { const element = document.querySelector(selector); if (element) element.textContent = value; };
  setText("#admin-book-count", books.length);
  setText("#admin-student-count", students.length);
  setText("#admin-reservation-count", reservations.length);
  setText("#admin-reservation-label", `${reservationRequests.length} pendentes`);
  document.querySelector("#admin-books").innerHTML = books.map((book) => `<div class="admin-row book-row" data-book-id="${book.id}" role="button" tabindex="0"><div class="book-summary"><strong>${book.title}</strong><span>${book.author} · ${book.year || "Ano não informado"} · ${book.genre}</span></div></div>`).join("") || `<p class="empty-state">Nenhum livro cadastrado.</p>`;
  const pendingRows = reservationRequests.map((id) => { const book = books.find((item) => item.id === id); return book ? `<div class="admin-row request-row"><div><strong>${book.title}</strong><span>André Silva · 9º ano B · Pendente</span></div><div class="row-actions"><button class="text-action approve-action" data-approve-request="${book.id}">Aprovar</button><button class="text-action" data-deny-request="${book.id}">Recusar</button></div></div>` : ""; }).join("");
  const approvedRows = reservations.map((id) => { const book = books.find((item) => item.id === id); return book ? `<div class="admin-row"><div><strong>${book.title}</strong><span>André Silva · 9º ano B · Aprovada</span></div><button class="text-action" data-admin-cancel="${book.id}">Cancelar</button></div>` : ""; }).join("");
  document.querySelector("#admin-reservations").innerHTML = pendingRows + approvedRows || `<p class="admin-note">Nenhuma solicitação ou reserva ativa.</p>`;
  document.querySelector("#admin-students").innerHTML = students.map((student) => `<div class="admin-row student-row" data-student-id="${student.id}" role="button" tabindex="0"><div class="student-summary"><strong>${student.name}</strong><span>${student.className} · ${student.email}</span></div><div class="row-actions"><span class="student-state">Ativo</span></div></div>`).join("");
  document.querySelectorAll(".book-row").forEach((row) => {
    const openDetails = () => openBookAdminModal(Number(row.dataset.bookId));
    row.addEventListener("click", openDetails);
    row.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openDetails(); } });
  });
  document.querySelectorAll("[data-admin-cancel]").forEach((button) => button.addEventListener("click", () => {
    reservations = reservations.filter((id) => id !== Number(button.dataset.adminCancel));
    saveReservations();
  }));
  document.querySelectorAll("[data-approve-request]").forEach((button) => button.addEventListener("click", () => {
    const id = Number(button.dataset.approveRequest);
    reservationRequests = reservationRequests.filter((requestId) => requestId !== id);
    if (!reservations.includes(id)) reservations.push(id);
    saveReservations();
  }));
  document.querySelectorAll("[data-deny-request]").forEach((button) => button.addEventListener("click", () => {
    reservationRequests = reservationRequests.filter((id) => id !== Number(button.dataset.denyRequest));
    saveReservations();
  }));
  document.querySelectorAll(".student-row").forEach((row) => {
    const openDetails = () => openStudentModal(Number(row.dataset.studentId));
    row.addEventListener("click", openDetails);
    row.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openDetails(); } });
  });
}

function deleteStudent(id) {
  const student = students.find((item) => item.id === id);
  if (!student || !window.confirm(`Excluir o cadastro de ${student.name}?`)) return;
  students = students.filter((item) => item.id !== id);
  localStorage.setItem("bookeasy-extra-students", JSON.stringify(students.filter((item) => item.id > 3)));
  closeStudentModal();
  renderAdmin();
}

function openStudentModal(id) {
  const student = students.find((item) => item.id === id);
  if (!student) return;
  activeStudentId = id;
  const studentReservations = reservations.filter((bookId) => books.some((book) => book.id === bookId));
  document.querySelector("#student-modal-title").textContent = student.name;
  document.querySelector("#student-modal-reservations").textContent = student.name === "André Silva" ? `${studentReservations.length} ativa(s)` : "Nenhuma";
  document.querySelector('#edit-student-form input[name="name"]').value = student.name;
  document.querySelector('#edit-student-form input[name="className"]').value = student.className;
  document.querySelector('#edit-student-form input[name="email"]').value = student.email;
  document.querySelector("#student-edit-message").textContent = "";
  document.querySelector("#student-modal-delete").onclick = () => deleteStudent(id);
  document.querySelector("#student-modal").hidden = false;
  document.body.classList.add("modal-open");
}

function closeStudentModal() {
  document.querySelector("#student-modal").hidden = true;
  document.body.classList.remove("modal-open");
}

let activeBookId = null;

function deleteBook(id) {
  const book = books.find((item) => item.id === id);
  if (!book || !window.confirm(`Excluir o livro ${book.title}?`)) return;
  deletedBookIds = [...deletedBookIds, id];
  localStorage.setItem(deletedBookKey, JSON.stringify(deletedBookIds));
  books = books.filter((item) => item.id !== id);
  reservations = reservations.filter((bookId) => bookId !== id);
  reservationRequests = reservationRequests.filter((bookId) => bookId !== id);
  localStorage.setItem("bookeasy-extra-books", JSON.stringify(books.filter((item) => item.id > 8)));
  saveReservations();
  closeBookAdminModal();
}

function openBookAdminModal(id) {
  const book = books.find((item) => item.id === id);
  if (!book) return;
  activeBookId = id;
  document.querySelector("#book-admin-title").textContent = book.title;
  document.querySelector('#edit-book-form input[name="cover"]').value = book.cover;
  document.querySelector('#edit-book-form input[name="title"]').value = book.title;
  document.querySelector('#edit-book-form input[name="author"]').value = book.author;
  document.querySelector('#edit-book-form input[name="year"]').value = book.year || "";
  document.querySelector("#book-edit-message").textContent = "";
  document.querySelector("#book-admin-delete").onclick = () => deleteBook(id);
  document.querySelector("#book-admin-modal").hidden = false;
  document.body.classList.add("modal-open");
}

function closeBookAdminModal() {
  document.querySelector("#book-admin-modal").hidden = true;
  document.body.classList.remove("modal-open");
}

function openModal(id) {
  const book = books.find((item) => item.id === id);
  const unavailable = book.status === "Emprestado";
  document.querySelector("#modal-cover").src = book.cover;
  document.querySelector("#modal-cover").alt = `Capa de ${book.title}`;
  document.querySelector("#modal-genre").textContent = book.genre;
  document.querySelector("#modal-title").textContent = book.title;
  document.querySelector("#modal-author").textContent = book.author;
  document.querySelector("#modal-year").textContent = `Lançamento: ${book.year || "não informado"}`;
  document.querySelector("#modal-description").textContent = book.description;
  document.querySelector("#modal-status").textContent = unavailable ? "Este livro está emprestado." : isReserved(book) ? "Reserva aprovada para você." : isRequested(book) ? "Solicitação enviada. Aguarde a aprovação." : "Disponível para solicitar reserva.";
  const action = document.querySelector("#modal-action");
  action.textContent = unavailable ? "Indisponível" : isReserved(book) ? "Cancelar reserva" : isRequested(book) ? "Cancelar solicitação" : "Solicitar reserva";
  action.disabled = unavailable;
  action.onclick = () => {
    if (unavailable) return;
    if (isReserved(book)) reservations = reservations.filter((item) => item !== book.id);
    else if (isRequested(book)) reservationRequests = reservationRequests.filter((item) => item !== book.id);
    else reservationRequests = [...reservationRequests, book.id];
    saveReservations();
    openModal(id);
  };
  document.querySelector("#book-modal").hidden = false;
  document.body.classList.add("modal-open");
}

function closeModal() {
  document.querySelector("#book-modal").hidden = true;
  document.body.classList.remove("modal-open");
}

function showView(view) {
  if (view === "biblioteca" && localStorage.getItem(librarianSessionKey) !== "true") {
    document.querySelector("#login-modal").hidden = false;
    document.body.classList.add("modal-open");
    view = "top";
  }
  const isHome = !["explorar", "reservas", "biblioteca"].includes(view);
  document.querySelectorAll(".app-view").forEach((section) => { section.hidden = section.id !== view; });
  document.querySelectorAll("main > section:not(.app-view)").forEach((section) => { section.hidden = !isHome; });
  document.querySelectorAll(".main-nav a").forEach((link) => link.classList.toggle("active", (isHome && link.dataset.view === "home") || link.getAttribute("href") === `#${view}`));
  if (!isHome) document.querySelector(`#${view}`).scrollIntoView({ block: "start" });
}

document.querySelector("#search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  currentQuery = document.querySelector("#search-input").value.trim();
  currentFilter = "Todos";
  document.querySelectorAll(".category").forEach((item) => item.classList.toggle("active", item.dataset.category === "Todos"));
  document.querySelector("#search-message").textContent = currentQuery ? `Mostrando resultados para “${currentQuery}”.` : "Digite um livro, autor ou categoria para pesquisar.";
  window.location.hash = "explorar";
  render();
});

document.querySelectorAll(".category").forEach((category) => category.addEventListener("click", () => {
  currentFilter = category.dataset.category;
  currentQuery = "";
  document.querySelector("#search-input").value = "";
  document.querySelectorAll(".category").forEach((item) => item.classList.toggle("active", item === category));
  window.location.hash = "explorar";
  render();
}));

document.querySelectorAll("[data-close-modal]").forEach((element) => element.addEventListener("click", closeModal));
document.querySelectorAll("[data-close-login]").forEach((element) => element.addEventListener("click", () => {
  document.querySelector("#login-modal").hidden = true;
  document.body.classList.remove("modal-open");
  window.location.hash = "top";
}));
document.querySelectorAll("[data-close-student]").forEach((element) => element.addEventListener("click", closeStudentModal));
document.querySelectorAll("[data-close-book-admin]").forEach((element) => element.addEventListener("click", closeBookAdminModal));
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeModal();
  closeStudentModal();
  closeBookAdminModal();
  if (!document.querySelector("#login-modal").hidden) document.querySelector("[data-close-login]").click();
});
document.querySelectorAll("[data-back-home]").forEach((button) => button.addEventListener("click", () => { window.location.hash = "top"; }));
document.querySelector("[data-focus-search]").addEventListener("click", () => document.querySelector("#search-input").focus());

document.querySelector("#librarian-login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const valid = form.get("username") === "bibliotecario" && form.get("password") === "bookeasy123";
  const message = document.querySelector("#login-message");
  if (!valid) { message.textContent = "Usuário ou senha incorretos."; return; }
  localStorage.setItem(librarianSessionKey, "true");
  event.currentTarget.reset();
  message.textContent = "";
  document.querySelector("#login-modal").hidden = true;
  document.body.classList.remove("modal-open");
  window.location.hash = "biblioteca";
  renderAdmin();
  showView("biblioteca");
});
document.querySelector("#librarian-logout").addEventListener("click", () => {
  localStorage.removeItem(librarianSessionKey);
  window.location.hash = "top";
});
function readImageFile(file) {
  if (!file || !file.type.startsWith("image/")) return Promise.resolve("");
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
document.querySelector("#add-book-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(event.currentTarget);
  const fileCover = await readImageFile(data.get("coverFile"));
  const newBook = { id: Date.now(), title: data.get("title"), author: data.get("author"), genre: data.get("genre"), cover: fileCover || data.get("cover") || "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=700&q=85", description: "Livro cadastrado pela equipe da biblioteca." };
  newBook.year = Number(data.get("year"));
  books.push(newBook);
  localStorage.setItem("bookeasy-extra-books", JSON.stringify(books.filter((book) => book.id > 8)));
  form.reset();
  document.querySelector("#book-form-message").textContent = "Livro cadastrado com sucesso.";
  render();
  renderAdmin();
});
document.querySelector("#edit-book-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const book = books.find((item) => item.id === activeBookId);
  if (!book) return;
  const data = new FormData(event.currentTarget);
  const fileCover = await readImageFile(data.get("coverFile"));
  book.cover = fileCover || data.get("cover") || book.cover;
  book.title = data.get("title");
  book.author = data.get("author");
  book.year = Number(data.get("year"));
  localStorage.setItem("bookeasy-extra-books", JSON.stringify(books.filter((item) => item.id > 8)));
  document.querySelector("#book-admin-title").textContent = book.title;
  document.querySelector("#book-edit-message").textContent = "Alterações salvas com sucesso.";
  render();
  renderAdmin();
});
document.querySelector("#add-student-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const newStudent = { id: Date.now(), name: data.get("name"), className: data.get("className"), email: data.get("email") };
  students.push(newStudent);
  localStorage.setItem("bookeasy-extra-students", JSON.stringify(students.filter((student) => student.id)));
  event.currentTarget.reset();
  document.querySelector("#student-form-message").textContent = "Aluno cadastrado com sucesso.";
  renderAdmin();
});
document.querySelector("#edit-student-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const student = students.find((item) => item.id === activeStudentId);
  if (!student) return;
  const data = new FormData(event.currentTarget);
  student.name = data.get("name");
  student.className = data.get("className");
  student.email = data.get("email");
  localStorage.setItem("bookeasy-extra-students", JSON.stringify(students.filter((item) => item.id > 3)));
  document.querySelector("#student-modal-title").textContent = student.name;
  document.querySelector("#student-edit-message").textContent = "Alterações salvas com sucesso.";
  renderAdmin();
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
document.addEventListener("click", () => { profileButton.setAttribute("aria-expanded", "false"); profilePanel.setAttribute("aria-hidden", "true"); profilePanel.classList.remove("open"); });

const menuButton = document.querySelector(".menu-button");
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  document.querySelector(".main-nav").classList.toggle("mobile-open", !open);
});

window.addEventListener("hashchange", () => showView(window.location.hash.slice(1)));
render();
renderAdmin();
showView(window.location.hash.slice(1));
