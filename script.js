const SUPABASE_URL = "https://pdgdcjiwbnimmievwkrr.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_IdfMuH2OdtSzGzrQ1DR0UQ_dUM3dMdr";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

// Sempre iniciar o site sem uma sessão de aluno
supabaseClient.auth.signOut();

const seedBooks = [
  { id: 1, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=85", genre: "Fantasia", title: "O Pequeno Príncipe", author: "Antoine de Saint-Exupéry", year: 1943, description: "Uma história delicada sobre amizade, afeto e o olhar curioso para o mundo." },
  { id: 2, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=85", genre: "Ficção Científica", title: "1984", author: "George Orwell", year: 1949, description: "Um clássico sobre liberdade, vigilância e o poder de controlar a informação." },
  { id: 3, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=85", genre: "Aventura", title: "Dom Quixote", author: "Miguel de Cervantes", year: 1605, description: "As aventuras de um homem que decide transformar seus ideais em realidade." },
  { id: 4, cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=700&q=85", genre: "Fantasia", title: "Harry Potter e a Pedra Filosofal", author: "J.K. Rowling", year: 1997, description: "O início da jornada de Harry Potter no mundo mágico de Hogwarts." },
  { id: 5, cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=700&q=85", genre: "Ficção Científica", title: "Jogos Vorazes", author: "Suzanne Collins", year: 2008, description: "Katniss desafia um sistema cruel para proteger quem ama." },
  { id: 6, cover: "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=700&q=85", genre: "Romance", title: "A Culpa é das Estrelas", author: "John Green", year: 2012, description: "Um encontro transformador entre dois jovens que descobrem novas formas de viver." },
  { id: 7, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=85", genre: "Biografias", title: "Ainda Estou Aqui", author: "Marcelo Rubens Paiva", year: 2015, description: "Memória, família e resistência em uma narrativa brasileira marcante." },
  { id: 8, cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=700&q=85", genre: "Aventura", title: "Percy Jackson e o Ladrão de Raios", author: "Rick Riordan", year: 2005, description: "Uma aventura mitológica cheia de amizade, coragem e descobertas." }
];

const additionalBookData = {
  "Aventura": ["A Ilha do Tesouro", "As Aventuras de Tom Sawyer", "Viagem ao Centro da Terra", "A Volta ao Mundo em 80 Dias", "Robinson Crusoé", "O Último dos Moicanos", "As Minas do Rei Salomão", "O Conde de Monte Cristo", "Moby Dick", "O Corsário Negro", "A Flecha Negra", "O Chamado Selvagem", "A Cidade das Feras", "O Menino do Pijama Listrado", "A Bússola de Ouro"],
  "Ficção Científica": ["Admirável Mundo Novo", "Fahrenheit 451", "Eu, Robô", "Fundação", "Duna", "O Fim da Infância", "Solaris", "A Máquina do Tempo", "A Guerra dos Mundos", "O Homem Invisível", "Neuromancer", "Encontro com Rama", "O Guia do Mochileiro das Galáxias", "O Planeta dos Macacos"],
  "Fantasia": ["O Hobbit", "O Senhor dos Anéis", "As Crônicas de Nárnia", "O Mágico de Oz", "Alice no País das Maravilhas", "O Castelo Animado", "Eragon", "A Menina que Bebeu a Lua", "Coraline", "O Nome do Vento", "A História Sem Fim", "Desventuras em Série", "O Oceano no Fim do Caminho"],
  "Romance": ["Orgulho e Preconceito", "Razão e Sensibilidade", "Jane Eyre", "O Morro dos Ventos Uivantes", "A Moreninha", "Eleanor & Park", "Como Eu Era Antes de Você", "O Sol é Para Todos", "Um Dia", "O Amor nos Tempos do Cólera", "A Cinco Passos de Você", "O Verão Que Mudou Minha Vida"],
  "Literatura brasileira": ["Memórias Póstumas de Brás Cubas", "Dom Casmurro", "O Cortiço", "Vidas Secas", "Grande Sertão: Veredas", "Capitães da Areia", "A Hora da Estrela", "Menino de Engenho", "Triste Fim de Policarpo Quaresma", "O Auto da Compadecida"],
  "Drama": ["Hamlet", "Romeu e Julieta", "O Diário de Anne Frank", "A Menina que Roubava Livros", "As Vantagens de Ser Invisível", "O Caçador de Pipas", "Flores para Algernon", "O Leitor", "A Ponte para Terabítia"],
  "Mistério": ["O Assassinato no Expresso do Oriente", "E Não Sobrou Nenhum", "O Cão dos Baskervilles", "O Falcão Maltês", "O Nome da Rosa", "A Garota no Trem", "O Silêncio dos Inocentes", "O Mistério do Cinco Estrelas"],
  "Biografias": ["Diário de um Banana", "Malala, Minha História", "Eu Sou Malala", "Long Walk to Freedom", "Santos Dumont: O Homem que Voava", "Frida Kahlo: Uma Biografia", "Pelé: A Autobiografia"],
  "Terror": ["Drácula", "Frankenstein", "O Médico e o Monstro", "O Iluminado", "It: A Coisa", "A Assombração da Casa da Colina"]
};

const additionalBookYears = [1883, 1876, 1864, 1872, 1719, 1826, 1885, 1844, 1851, 1898, 1888, 1903, 2002, 2006, 1995, 1932, 1953, 1950, 1951, 1965, 1953, 1961, 1895, 1898, 1897, 1984, 1973, 1979, 1963, 1937, 1954, 1950, 1900, 1865, 1986, 2002, 2016, 2002, 2007, 1979, 1999, 2013, 1813, 1811, 1847, 1847, 1844, 2012, 2012, 1960, 2009, 1985, 2018, 2009, 1881, 1899, 1890, 1938, 1956, 1937, 1977, 1932, 1915, 1955, 1603, 1597, 1947, 2005, 1999, 2003, 1959, 1995, 1977, 1934, 1939, 1902, 1930, 1980, 2015, 1988, 1981, 2007, 2013, 2013, 1994, 2016, 2016, 2006, 1897, 1818, 1886, 1977, 1986, 1959];
let nextBookId = 9;
const additionalBooks = Object.entries(additionalBookData).flatMap(([genre, titles]) => titles.map((title) => {
  const id = nextBookId++;
  return { id, cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=700&q=85", genre, title, author: "Acervo BookEasy", year: additionalBookYears[id - 9], description: "Uma leitura selecionada para o acervo BookEasy." };
}));

const deletedBookKey = "bookeasy-deleted-books";
let deletedBookIds = JSON.parse(localStorage.getItem(deletedBookKey) || "[]");
let books = [...seedBooks, ...additionalBooks].filter((book) => !deletedBookIds.includes(book.id));
async function carregarLivrosDoSupabase() {
    const { data, error } = await supabaseClient
        .from("livros")
        .select("*")
        .order("id");

    if (error) {
        console.error("Erro ao carregar livros:", error);
        return;
    }

    books = data.map((livro) => ({
        id: livro.id,
        title: livro.titulo,
        author: livro.autor,
        year: livro.ano,
        genre: livro.genero,
        description: livro.descricao,
        cover: livro.capa,
        status: livro.status
    }));

    featuredBooks = books.slice(0, 4);
    recommendedBooks = books.slice(4, 12);

    console.log("Livros carregados do Supabase:", books.length);

    render();
}
const seedStudents = [
  { id: 1, name: "André Silva", className: "9º ano B", email: "andre.silva@sesi.edu.br" },
  { id: 2, name: "Beatriz Oliveira", className: "8º ano A", email: "beatriz.oliveira@sesi.edu.br" },
  { id: 3, name: "Caio Santos", className: "9º ano A", email: "caio.santos@sesi.edu.br" }
];
let students = [...seedStudents, ...JSON.parse(localStorage.getItem("bookeasy-extra-students") || "[]")];
const librarianSessionKey = "bookeasy-librarian-session";
const studentSessionKey = "bookeasy-student-session";

// Sempre iniciar o site deslogado
localStorage.removeItem(librarianSessionKey);
localStorage.removeItem(studentSessionKey);

let featuredBooks = [];
let recommendedBooks = [];
const reservationKey = "bookeasy-reservations";
const requestKey = "bookeasy-reservation-requests";
let reservations = JSON.parse(localStorage.getItem(reservationKey) || "[]");
let reservationRequests = JSON.parse(localStorage.getItem(requestKey) || "[]");
let currentFilter = "Todos";
let currentQuery = "";
let currentSort = "default";
let featuredFilter = "Todos";
let activeStudentId = null;

const isReserved = (book) => reservations.includes(book.id);
const isRequested = (book) => reservationRequests.includes(book.id);

function bookCard(book) {
  const unavailable = book.status === "Emprestado";
  const status = unavailable ? "Emprestado" : isReserved(book) ? "Reservado" : isRequested(book) ? "Solicitado" : "Disponível";
  return `<article class="book-card" data-book-id="${book.id}"><button class="book-card-button" aria-label="Ver detalhes de ${book.title}"><img class="book-cover" src="${book.cover}" alt="Capa de ${book.title}" loading="lazy"><div class="book-meta-top"><span class="genre">${book.genre}</span><span class="status${unavailable ? " loaned" : ""}">${status}</span></div><h3>${book.title}</h3><p>${book.author}</p></button></article>`;
}

function normalizeSearchText(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
}

function filteredBooks() {
  const query = normalizeSearchText(currentQuery);
  const filtered = books.filter((book) => {
    const matchesCategory = currentFilter === "Todos" || normalizeSearchText(book.genre) === normalizeSearchText(currentFilter);
    const searchableText = normalizeSearchText(`${book.title} ${book.author} ${book.genre}`);
    return matchesCategory && (!query || searchableText.includes(query));
  });
  if (currentSort === "title-asc") return filtered.sort((first, second) => first.title.localeCompare(second.title, "pt-BR"));
  if (currentSort === "title-desc") return filtered.sort((first, second) => second.title.localeCompare(first.title, "pt-BR"));
  if (currentSort === "year-asc") return filtered.sort((first, second) => (Number(first.year) || 0) - (Number(second.year) || 0));
  if (currentSort === "year-desc") return filtered.sort((first, second) => (Number(second.year) || 0) - (Number(first.year) || 0));
  if (currentSort === "author-asc") return filtered.sort((first, second) => first.author.localeCompare(second.author, "pt-BR"));
  return filtered;
}

function render() {
  const featured = featuredFilter === "Todos" ? featuredBooks : books.filter((book) => book.genre.toLocaleLowerCase() === featuredFilter.toLocaleLowerCase()).slice(0, 4);
  document.querySelector("#featured-books").innerHTML = featured.map(bookCard).join("") || `<p class="empty-state">Nenhum destaque encontrado nesta categoria.</p>`;
  document.querySelector("#featured-subtitle").textContent = featuredFilter === "Todos" ? "Escolha uma categoria para encontrar uma leitura que combine com você." : `Destaques selecionados de ${featuredFilter}.`;
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

function renderAdminList(selector, items, emptyMessage) {
  const list = document.querySelector(selector);
  const visibleItems = items.slice(0, 10);
  const hiddenItems = items.slice(10);
  list.innerHTML = visibleItems.concat(hiddenItems).join("") || `<p class="empty-state">${emptyMessage}</p>`;
  if (hiddenItems.length) {
    const hiddenRows = [...list.children].slice(10);
    hiddenRows.forEach((row) => row.hidden = true);
    const toggle = document.createElement("button");
    toggle.className = "list-toggle";
    toggle.type = "button";
    toggle.textContent = `Mostrar todos (${items.length})`;
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      hiddenRows.forEach((row) => row.hidden = expanded);
      toggle.textContent = expanded ? `Mostrar todos (${items.length})` : "Mostrar menos";
      toggle.setAttribute("aria-expanded", String(!expanded));
    });
    list.append(toggle);
  }
}

function renderAdmin() {
  if (!document.querySelector("#admin-books")) return;
  const setText = (selector, value) => { const element = document.querySelector(selector); if (element) element.textContent = value; };
  setText("#admin-book-count", books.length);
  setText("#admin-student-count", students.length);
  setText("#admin-reservation-count", reservations.length);
  setText("#admin-reservation-label", `${reservationRequests.length} pendentes`);
  renderAdminList("#admin-books", books.map((book) => `<div class="admin-row book-row" data-book-id="${book.id}" role="button" tabindex="0"><div class="book-summary"><strong>${book.title}</strong><span>${book.author} · ${book.year || "Ano não informado"} · ${book.genre}</span></div></div>`), "Nenhum livro cadastrado.");
  const pendingRows = reservationRequests.map((id) => { const book = books.find((item) => item.id === id); return book ? `<div class="admin-row request-row"><div><strong>${book.title}</strong><span>André Silva · 9º ano B · Pendente</span></div><div class="row-actions"><button class="text-action approve-action" data-approve-request="${book.id}">Aprovar</button><button class="text-action" data-deny-request="${book.id}">Recusar</button></div></div>` : ""; }).join("");
  const approvedRows = reservations.map((id) => { const book = books.find((item) => item.id === id); return book ? `<div class="admin-row"><div><strong>${book.title}</strong><span>André Silva · 9º ano B · Aprovada</span></div><button class="text-action" data-admin-cancel="${book.id}">Cancelar</button></div>` : ""; }).join("");
  document.querySelector("#admin-reservations").innerHTML = pendingRows + approvedRows || `<p class="admin-note">Nenhuma solicitação ou reserva ativa.</p>`;
  renderAdminList("#admin-students", students.map((student) => `<div class="admin-row student-row" data-student-id="${student.id}" role="button" tabindex="0"><div class="student-summary"><strong>${student.name}</strong><span>${student.className} · ${student.email}</span></div><div class="row-actions"><span class="student-state">Ativo</span></div></div>`), "Nenhum aluno cadastrado.");
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

function closeWithAnimation(selector, onComplete) {
  const modal = document.querySelector(selector);
  if (modal.hidden || modal.classList.contains("is-closing")) return;
  modal.classList.add("is-closing");
  window.setTimeout(() => {
    modal.hidden = true;
    modal.classList.remove("is-closing");
    onComplete?.();
  }, 220);
}

function closeStudentModal() {
  closeWithAnimation("#student-modal", () => document.body.classList.remove("modal-open"));
}

let activeBookId = null;

async function deleteBook(id) {
  const book = books.find((item) => item.id === id);

  if (!book || !window.confirm(`Excluir o livro ${book.title}?`)) return;

  const { error } = await supabaseClient
    .from("livros")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Erro ao excluir livro:", error);
    alert("Erro ao excluir o livro.");
    return;
  }

  books = books.filter((item) => item.id !== id);

  reservations = reservations.filter((bookId) => bookId !== id);
  reservationRequests = reservationRequests.filter((bookId) => bookId !== id);

  localStorage.setItem(reservationKey, JSON.stringify(reservations));
  localStorage.setItem(requestKey, JSON.stringify(reservationRequests));

  closeBookAdminModal();
  render();
  renderAdmin();

  console.log("Livro excluído do Supabase:", book);
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
  closeWithAnimation("#book-admin-modal", () => document.body.classList.remove("modal-open"));
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
  closeWithAnimation("#book-modal", () => document.body.classList.remove("modal-open"));
}

function showView(view) {
  if (view === "biblioteca" && localStorage.getItem(librarianSessionKey) !== "true") {
    document.querySelector("#login-modal").hidden = false;
    document.body.classList.add("modal-open");
    view = "top";
  }
  if (view === "reservas" && localStorage.getItem(studentSessionKey) !== "true") {
    document.querySelector("#student-login-modal").hidden = false;
    document.body.classList.add("modal-open");
    view = "top";
  }
  document.body.classList.toggle("librarian-mode", view === "biblioteca");
  const isHome = !["explorar", "reservas", "biblioteca"].includes(view);
  document.querySelectorAll(".app-view").forEach((section) => { section.hidden = section.id !== view; });
  document.querySelectorAll("main > section:not(.app-view)").forEach((section) => { section.hidden = !isHome; });
  document.querySelectorAll(".main-nav a").forEach((link) => link.classList.toggle("active", (isHome && link.dataset.view === "home") || link.getAttribute("href") === `#${view}`));
  if (!isHome) document.querySelector(`#${view}`).scrollIntoView({ block: "start" });
  if (typeof updateStudentProfile === "function") updateStudentProfile();
}

function submitSearch(query) {
  currentQuery = query.trim();
  currentFilter = "Todos";
  document.querySelectorAll(".category").forEach((item) => item.classList.toggle("active", item.dataset.category === "Todos"));
  document.querySelector("#search-message").textContent = currentQuery ? `Mostrando resultados para “${currentQuery}”.` : "Digite um livro, autor ou categoria para pesquisar.";
  window.location.hash = "explorar";
  render();
}

document.querySelector("#search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  submitSearch(document.querySelector("#search-input").value);
});
document.querySelector("#header-search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  submitSearch(document.querySelector("#header-search-input").value);
  document.querySelector("#header-search").classList.remove("open");
  document.querySelector("#header-search [data-focus-search]").setAttribute("aria-expanded", "false");
});

document.querySelectorAll(".category").forEach((category) => category.addEventListener("click", () => {
    if (category.closest(".featured-categories")) {
    featuredFilter = category.dataset.category;
      document.querySelectorAll(".featured-categories .category").forEach((item) => item.classList.toggle("active", item === category));
    render();
    document.querySelector("#destaques").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  currentFilter = category.dataset.category;
  currentQuery = "";
  document.querySelector("#search-input").value = "";
  document.querySelectorAll(".catalog-categories .category").forEach((item) => item.classList.toggle("active", item === category));
  window.location.hash = "explorar";
  render();
}));
document.querySelector("#catalog-sort").addEventListener("change", (event) => {
  currentSort = event.currentTarget.value;
  render();
});

document.querySelectorAll("[data-close-modal]").forEach((element) => element.addEventListener("click", closeModal));
document.querySelectorAll("[data-close-login]").forEach((element) => element.addEventListener("click", () => {
  closeWithAnimation("#login-modal", () => {
    document.body.classList.remove("modal-open");
    window.location.hash = "top";
  });
}));
document.querySelectorAll("[data-close-student-login]").forEach((element) => element.addEventListener("click", () => {
  closeWithAnimation("#student-login-modal", () => {
    document.body.classList.remove("modal-open");
    window.location.hash = "top";
  });
}));
document.querySelectorAll("[data-close-student]").forEach((element) => element.addEventListener("click", closeStudentModal));
document.querySelectorAll("[data-close-book-admin]").forEach((element) => element.addEventListener("click", closeBookAdminModal));
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeModal();
  closeStudentModal();
  closeBookAdminModal();
  if (!document.querySelector("#login-modal").hidden) document.querySelector("[data-close-login]").click();
  if (!document.querySelector("#student-login-modal").hidden) document.querySelector("[data-close-student-login]").click();
});
document.querySelectorAll("[data-back-home]").forEach((button) => button.addEventListener("click", () => { window.location.hash = "top"; }));
document.querySelector("[data-focus-search]").addEventListener("click", (event) => {
  event.stopPropagation();
  const search = document.querySelector("#header-search");
  const open = search.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", String(open));
  if (open) document.querySelector("#header-search-input").focus();
});

document.querySelector("#librarian-login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = new FormData(event.currentTarget);
  const email = form.get("username");
  const password = form.get("password");
  const message = document.querySelector("#login-message");

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error("Erro ao fazer login:", error);
    message.textContent = "E-mail ou senha incorretos.";
    return;
  }

  console.log("Bibliotecário autenticado:", data.user);

  localStorage.setItem(librarianSessionKey, "true");

  document.querySelector("#librarian-login-form").reset();
  message.textContent = "";

  closeWithAnimation("#login-modal", () => {
    document.body.classList.remove("modal-open");
  });

  window.location.hash = "biblioteca";
  renderAdmin();
  showView("biblioteca");
});
document.querySelector("#student-login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const loginForm = event.currentTarget;

  const form = new FormData(loginForm);
  const email = String(form.get("username")).trim();
  const password = String(form.get("password"));
  const message = document.querySelector("#student-login-message");

  message.textContent = "";

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error("Erro ao fazer login:", error);
    message.textContent = "E-mail ou senha incorretos.";
    return;
  }

  console.log("Aluno autenticado:", data.user);

  localStorage.setItem(studentSessionKey, "true");

  await updateStudentProfile();

  loginForm.reset();

  closeWithAnimation("#student-login-modal", () => {
    document.body.classList.remove("modal-open");
  });

  window.location.hash = "top";
  showView("top");
});
document.querySelector("#librarian-logout").addEventListener("click", () => {
  localStorage.removeItem(librarianSessionKey);
  window.location.hash = "top";
});
document.querySelector("#student-login-notice").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#student-login-modal").hidden = false;
  document.body.classList.add("modal-open");
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
  const data = new FormData(form);
  const fileCover = await readImageFile(data.get("coverFile"));

  const newBook = {
    id: Date.now(),
    title: data.get("title"),
    author: data.get("author"),
    genre: data.get("genre"),
    cover: fileCover || data.get("cover") || "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=700&q=85",
    description: "Livro cadastrado pela equipe da biblioteca.",
    year: Number(data.get("year")),
    status: "Disponível"
  };

  const livroSupabase = {
    id: newBook.id,
    titulo: newBook.title,
    autor: newBook.author,
    ano: newBook.year || null,
    genero: newBook.genre,
    descricao: newBook.description,
    capa: newBook.cover,
    status: newBook.status
  };

  const { error } = await supabaseClient
    .from("livros")
    .insert(livroSupabase);

  if (error) {
    console.error("Erro ao cadastrar livro:", error);
    document.querySelector("#book-form-message").textContent =
      "Erro ao cadastrar livro.";
    return;
  }

  books.push(newBook);

  form.reset();
  document.querySelector("#book-form-message").textContent =
    "Livro cadastrado com sucesso.";

  render();
  renderAdmin();

  console.log("Livro cadastrado no Supabase:", newBook);
});
document.querySelector("#edit-book-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const book = books.find((item) => item.id === activeBookId);
  if (!book) return;

  const data = new FormData(event.currentTarget);
  const fileCover = await readImageFile(data.get("coverFile"));

  const updatedBook = {
    title: data.get("title"),
    author: data.get("author"),
    year: Number(data.get("year")),
    cover: fileCover || data.get("cover") || book.cover
  };

  const { error } = await supabaseClient
    .from("livros")
    .update({
      titulo: updatedBook.title,
      autor: updatedBook.author,
      ano: updatedBook.year || null,
      capa: updatedBook.cover
    })
    .eq("id", book.id);

  if (error) {
    console.error("Erro ao editar livro:", error);
    document.querySelector("#book-edit-message").textContent =
      "Erro ao salvar alterações.";
    return;
  }

  book.title = updatedBook.title;
  book.author = updatedBook.author;
  book.year = updatedBook.year;
  book.cover = updatedBook.cover;

  document.querySelector("#book-admin-title").textContent = book.title;
  document.querySelector("#book-edit-message").textContent =
    "Alterações salvas com sucesso.";

  render();
  renderAdmin();

  console.log("Livro atualizado no Supabase:", book);
});
document.querySelector("#add-student-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = new FormData(event.currentTarget);

  const name = data.get("name");
  const className = data.get("className");
  const email = data.get("email");
  const password = data.get("password");

  const message = document.querySelector("#student-form-message");
  message.textContent = "Cadastrando aluno...";

  // 1. Cria a conta de autenticação
  const { data: authData, error: authError } =
    await supabaseClient.auth.signUp({
      email,
      password
    });

  if (authError) {
    console.error("Erro ao criar conta:", authError);
    message.textContent = authError.message;
    return;
  }

  // 2. Salva os dados do aluno na tabela estudantes
  const newStudent = {
    nome: name,
    turma: className,
    email: email,
    usuario_id: authData.user.id
  };

  const { data: student, error: studentError } = await supabaseClient
    .from("estudantes")
    .insert(newStudent)
    .select()
    .single();

  if (studentError) {
    console.error("Erro ao cadastrar estudante:", studentError);
    message.textContent = "A conta foi criada, mas não foi possível salvar os dados do aluno.";
    return;
  }

  students.push({
    id: student.id,
    name: student.nome,
    className: student.turma,
    email: student.email,
    usuario_id: student.usuario_id
  });

  event.currentTarget.reset();

  message.textContent = "Aluno cadastrado com sucesso.";

  renderAdmin();

  console.log("Aluno cadastrado:", student);
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

const updateStudentProfile = async () => {
  const {
    data: { user }
  } = await supabaseClient.auth.getUser();

  const authenticated = !!user;

  document.querySelectorAll("[data-student-account]").forEach((element) => {
    element.hidden = !authenticated;
  });

  document.querySelector("#student-profile-login").hidden = authenticated;
  document.querySelector("#student-login-notice").hidden = authenticated;

  profilePanel.classList.toggle("logged-out", !authenticated);

  if (!authenticated) {
    localStorage.removeItem(studentSessionKey);
    return;
  }

  localStorage.setItem(studentSessionKey, "true");

  const { data: student, error } = await supabaseClient
    .from("estudantes")
    .select("*")
    .eq("usuario_id", user.id)
    .single();

  if (error) {
    console.error("Erro ao carregar estudante:", error);
    return;
  }

  console.log("Estudante logado:", student);

  document.querySelector("#student-profile-name").textContent = student.nome;
  document.querySelector("#student-profile-class").textContent = student.turma;

  const avatar = document.querySelector("#student-profile-avatar");
  avatar.textContent = student.nome.charAt(0).toUpperCase();
};
profileButton.addEventListener("click", (event) => {
  event.stopPropagation();
  const open = profileButton.getAttribute("aria-expanded") === "true";
  profileButton.setAttribute("aria-expanded", String(!open));
  profilePanel.setAttribute("aria-hidden", String(open));
  profilePanel.classList.toggle("open", !open);
});
document.addEventListener("click", () => { profileButton.setAttribute("aria-expanded", "false"); profilePanel.setAttribute("aria-hidden", "true"); profilePanel.classList.remove("open"); });
document.querySelector("#student-logout").addEventListener("click", async (event) => {
  event.stopPropagation();

  await supabaseClient.auth.signOut();

  localStorage.removeItem(studentSessionKey);

  profileButton.setAttribute("aria-expanded", "false");
  profilePanel.setAttribute("aria-hidden", "true");
  profilePanel.classList.remove("open");

  updateStudentProfile();

  window.location.hash = "top";
});
document.querySelector("#student-profile-login").addEventListener("click", (event) => {
  event.stopPropagation();
  document.querySelector("#student-login-modal").hidden = false;
  document.body.classList.add("modal-open");
});

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
updateStudentProfile();
carregarLivrosDoSupabase();

async function testarSupabase() {
  const { data, error } = await supabaseClient
    .from('livros')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Erro ao conectar com Supabase:', error);
    return;
  }

  console.log('Supabase conectado!', data);
}

testarSupabase();

async function migrarLivrosParaSupabase() {
    const livros = books.map((book) => ({
        id: book.id,
        titulo: book.title,
        autor: book.author,
        ano: book.year || null,
        genero: book.genre,
        descricao: book.description || null,
        capa: book.cover,
        status: book.status || "Disponível"
    }));

    const { data, error } = await supabaseClient
        .from("livros")
        .upsert(livros, { onConflict: "id" });

    if (error) {
        console.error("Erro ao migrar livros:", error);
        return;
    }

    console.log("Livros migrados com sucesso!", data);
}

migrarLivrosParaSupabase();