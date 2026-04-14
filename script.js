// Funcionalidad de Login
const loginForm = document.getElementById('loginForm');
const loginSection = document.getElementById('loginSection');
const userInfo = document.getElementById('userInfo');
const usernameDisplay = document.getElementById('username');
const logoutBtn = document.getElementById('logoutBtn');

// Verificar si hay sesión guardada al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
        showUserInfo(savedUser);
    }
});

// Manejar envío del formulario de login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Aquí irían las validaciones y peticiones al servidor
    // Por ahora, solo guardamos el email
    if (email && password) {
        localStorage.setItem('loggedInUser', email);
        showUserInfo(email);
        loginForm.reset();
    }
});

// Mostrar información del usuario
function showUserInfo(email) {
    document.getElementById('loginEmail').parentElement.style.display = 'none';
    document.getElementById('loginPassword').parentElement.style.display = 'none';
    loginForm.style.display = 'none';
    userInfo.style.display = 'flex';
    usernameDisplay.textContent = `Bienvenido, ${email.split('@')[0]}`;
}

// Manejar logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    loginForm.style.display = 'flex';
    userInfo.style.display = 'none';
    loginForm.reset();
});

// Base de datos de películas
const movies = [
    {
        id: 1,
        title: "Interestelar",
        year: 2014,
        genre: "Ciencia Ficción",
        rating: 8.6,
        director: "Christopher Nolan",
        description: "Un equipo de astronautas viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad."
    },
    {
        id: 2,
        title: "El Caballero Oscuro",
        year: 2008,
        genre: "Acción",
        rating: 9.0,
        director: "Christopher Nolan",
        description: "Batman se enfrenta al Joker, un criminal que siembra el caos en Gotham City."
    },
    {
        id: 3,
        title: "Inception",
        year: 2010,
        genre: "Ciencia Ficción",
        rating: 8.8,
        director: "Christopher Nolan",
        description: "Un ladrón que roba secretos corporativos a través del espionaje de sueños intenta realizar el trabajo inverso."
    },
    {
        id: 4,
        title: "Forrest Gump",
        year: 1994,
        genre: "Drama",
        rating: 8.8,
        director: "Robert Zemeckis",
        description: "La vida única de un hombre de baja inteligencia pero buen corazón que presencia e involuntariamente influye en varios eventos históricos."
    },
    {
        id: 5,
        title: "La Lista de Schindler",
        year: 1993,
        genre: "Drama",
        rating: 9.0,
        director: "Steven Spielberg",
        description: "Un empresario alemán salva milares de refugiados polacos-judíos de los nazis durante el Holocausto."
    },
    {
        id: 6,
        title: "Titanic",
        year: 1997,
        genre: "Drama",
        rating: 7.8,
        director: "James Cameron",
        description: "Un viaje a través del fatal viaje del RMS Titanic y el romance entre dos pasajeros de diferentes clases sociales."
    },
    {
        id: 7,
        title: "Pulp Fiction",
        year: 1994,
        genre: "Drama",
        rating: 8.9,
        director: "Quentin Tarantino",
        description: "Las vidas de dos gángsters, una esposa de un gánster, un boxeador, un vendedor de droga y una pareja de bandidos se entrelazan en cuatro historias de violencia y redención."
    },
    {
        id: 8,
        title: "Toy Story",
        year: 1995,
        genre: "Animación",
        rating: 8.3,
        director: "John Lasseter",
        description: "Un vaquero tradicional está celoso cuando un nuevo astronauta usurpa su lugar como el juguete favorito del dueño."
    },
    {
        id: 9,
        title: "El Rey León",
        year: 1994,
        genre: "Animación",
        rating: 8.5,
        director: "Roger Allers, Rob Minkoff",
        description: "Un joven león príncipe es exiliado de su reino después de la muerte de su padre, solo para descubrir la verdad sobre su pasado y reclamar su trono."
    },
    {
        id: 10,
        title: "Coco",
        year: 2017,
        genre: "Animación",
        rating: 8.4,
        director: "Lee Unkrich",
        description: "Un aspirante a músico es arrastrado al Más Allá mientras intenta descubrir la verdad sobre su herencia familiar."
    },
    {
        id: 11,
        title: "El Conjuro",
        year: 2013,
        genre: "Terror",
        rating: 7.5,
        director: "James Wan",
        description: "Una familia que se muda a una casa remota experimenta eventos paranormales aterradores."
    },
    {
        id: 12,
        title: "Insidious",
        year: 2010,
        genre: "Terror",
        rating: 6.8,
        director: "James Wan",
        description: "Un muchacho cae en un coma inexplicable y sus padres descubren que está atrapado en una dimensión sobrenatural."
    },
    {
        id: 13,
        title: "La Forma del Agua",
        year: 2017,
        genre: "Drama",
        rating: 6.9,
        director: "Guillermo del Toro",
        description: "Durante la Guerra Fría, una mujer muda forma una conexión con una criatura acuática clasificada."
    },
    {
        id: 14,
        title: "The Hangover",
        year: 2009,
        genre: "Comedia",
        rating: 7.7,
        director: "Todd Phillips",
        description: "Tres amigos despiertan en Las Vegas sin recordar nada de la noche anterior, viéndose obligados a reconstruir los eventos."
    },
    {
        id: 15,
        title: "Superbad",
        year: 2007,
        genre: "Comedia",
        rating: 7.6,
        director: "Greg Mottola",
        description: "Dos amigos inseparables intentan conseguir bebidas alcohólicas para una fiesta con sus amigas."
    }
];

// Variables globales
let filteredMovies = [...movies];

// Elementos del DOM
const moviesContainer = document.getElementById('moviesContainer');
const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');
const noResults = document.getElementById('noResults');

// Renderizar películas
function renderMovies() {
    moviesContainer.innerHTML = '';

    if (filteredMovies.length === 0) {
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    filteredMovies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <div class="movie-poster">🎬</div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-year">${movie.year}</p>
                <span class="movie-genre">${movie.genre}</span>
                <div class="movie-rating">⭐ ${movie.rating}/10</div>
                <p class="movie-description">${movie.description}</p>
                <p class="movie-director"><strong>Director:</strong> ${movie.director}</p>
            </div>
        `;
        moviesContainer.appendChild(movieCard);
    });
}

// Filtrar películas
function filterMovies() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;

    filteredMovies = movies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm) ||
                             movie.description.toLowerCase().includes(searchTerm) ||
                             movie.director.toLowerCase().includes(searchTerm);

        const matchesGenre = selectedGenre === '' || movie.genre === selectedGenre;

        return matchesSearch && matchesGenre;
    });

    renderMovies();
}

// Event listeners
searchInput.addEventListener('input', filterMovies);
genreFilter.addEventListener('change', filterMovies);

// Renderizar películas al cargar la página
renderMovies();
