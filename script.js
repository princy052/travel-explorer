const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const destinationGrid = document.getElementById("destinationGrid");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");

/* =========================
   LOGOUT BUTTON
========================= */

const currentPage = window.location.pathname.split("/").pop().toLowerCase();
const authPages = ["login.html", "register.html"];

if (!authPages.includes(currentPage)) {
    const navbar = document.querySelector(".header .nav, .navbar nav");

    if (navbar && !document.getElementById("logoutButton")) {
        const logoutButton = document.createElement("button");

        logoutButton.id = "logoutButton";
        logoutButton.className = "logout-button";
        logoutButton.type = "button";
        logoutButton.textContent = "Logout";

        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("travelExplorerLoggedIn");
            window.location.href = "login.html";
        });

        navbar.appendChild(logoutButton);
    }
}

/* =========================
   DESTINATION SEARCH
========================= */

function filterDestinations() {
    if (!destinationGrid || !searchInput || !categoryFilter) return;

    const query = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const cards = destinationGrid.querySelectorAll(".destination-card");

    let visible = 0;

    cards.forEach(card => {
        const name = (card.dataset.name || "").toLowerCase();
        const type = card.dataset.category || "";
        const text = card.textContent.toLowerCase();

        const matchesSearch =
            name.includes(query) || text.includes(query);

        const matchesCategory =
            category === "all" || type === category;

        const show = matchesSearch && matchesCategory;
        card.hidden = !show;

        if (show) visible++;
    });

    if (resultCount) {
        resultCount.textContent =
            `${visible} destination${visible === 1 ? "" : "s"} found`;
    }

    if (noResults) {
        noResults.hidden = visible !== 0;
    }
}

if (searchInput && categoryFilter) {
    searchInput.addEventListener("input", filterDestinations);
    categoryFilter.addEventListener("change", filterDestinations);
    filterDestinations();
}

/* =========================
   INDIVIDUAL DESTINATION DETAILS
========================= */

const destinationData = {
    switzerland: {
        name: "Switzerland",
        region: "EUROPE · MOUNTAIN ESCAPES",
        tagline: "Where majestic mountains meet peaceful lakes.",
        description: "Discover the Swiss Alps, charming villages, beautiful lakes and scenic train journeys. Switzerland is a wonderful choice for nature lovers and adventure seekers.",
        budget: "₹60,000+",
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600",
        activities: [
            ["🏔️", "Mountain adventures", "Enjoy alpine views, hiking trails and mountain excursions."],
            ["🚆", "Scenic journeys", "Experience beautiful landscapes on scenic train routes."],
            ["🏞️", "Lakeside escapes", "Discover peaceful lakes and charming waterfront towns."]
        ]
    },
    maldives: {
        name: "Maldives",
        region: "ASIA · TROPICAL GETAWAYS",
        tagline: "Find your paradise in the Indian Ocean.",
        description: "Explore tropical islands, turquoise waters and beautiful sandy beaches. The Maldives is ideal for a relaxing getaway and unforgettable ocean views.",
        budget: "₹25,000+",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600",
        activities: [
            ["🏖️", "Beach relaxation", "Unwind on sandy beaches and enjoy ocean views."],
            ["🐠", "Marine life", "Discover colourful underwater life on suitable guided trips."],
            ["🚤", "Island exploring", "Experience local islands and scenic boat excursions."]
        ]
    },
    japan: {
        name: "Japan",
        region: "EAST ASIA · CULTURE & DISCOVERY",
        tagline: "A fascinating blend of tradition and modern life.",
        description: "Discover historic temples, peaceful gardens, exciting cities and delicious local cuisine. Japan offers a unique travel experience in every season.",
        budget: "₹70,000+",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600",
        activities: [
            ["⛩️", "Historic temples", "Visit traditional shrines, temples and cultural landmarks."],
            ["🍜", "Local cuisine", "Explore Japanese food and regional specialities."],
            ["🌸", "Seasonal beauty", "Enjoy gardens, mountain scenery and seasonal blooms."]
        ]
    },
    kerala: {
        name: "Kerala",
        region: "INDIA · NATURE & BACKWATERS",
        tagline: "Discover the beauty of God's Own Country.",
        description: "Experience green hills, peaceful backwaters, tropical beaches and rich cultural traditions. Kerala offers a variety of memorable trips close to home.",
        budget: "₹8,000+",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600",
        activities: [
            ["🌿", "Hill stations", "Explore green landscapes, tea plantations and cool mountain air."],
            ["🛶", "Backwater journeys", "Enjoy the scenery of Kerala's lakes and waterways."],
            ["🥥", "Local culture", "Discover regional food, crafts and cultural experiences."]
        ]
    },
    greece: {
        name: "Greece",
        region: "EUROPE · ISLAND GETAWAYS",
        tagline: "Discover sunlit islands and ancient history.",
        description: "Explore beautiful coastlines, island villages, historic sites and Mediterranean food. Greece offers a mix of relaxation, culture and scenic exploration.",
        budget: "₹65,000+",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600",
        activities: [
            ["🏝️", "Island escapes", "Discover coastal villages and beautiful island scenery."],
            ["🏛️", "Ancient history", "Explore historic landmarks and archaeological sites."],
            ["🍽️", "Mediterranean food", "Try regional dishes and traditional Greek cuisine."]
        ]
    },
    paris: {
        name: "Paris",
        region: "FRANCE · CITY DISCOVERY",
        tagline: "Art, architecture and unforgettable city streets.",
        description: "Discover world-famous landmarks, art museums, elegant streets, gardens and cafés. Paris is an inspiring destination for culture and city exploration.",
        budget: "₹55,000+",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600",
        activities: [
            ["🗼", "Famous landmarks", "Explore iconic architecture and memorable city views."],
            ["🎨", "Art and museums", "Discover galleries, museums and creative neighbourhoods."],
            ["🥐", "Cafés and cuisine", "Experience local bakeries, cafés and French food."]
        ]
    }
};

const placeHero = document.getElementById("placeHero");

if (placeHero) {
    const params = new URLSearchParams(window.location.search);
    const placeKey = params.get("place") || "switzerland";
    const place = destinationData[placeKey] || destinationData.switzerland;

    document.title = place.name + " | Travel Explorer";

    document.getElementById("placeName").textContent = place.name;
    document.getElementById("placeRegion").textContent = place.region;
    document.getElementById("placeTagline").textContent = place.tagline;
    document.getElementById("introTitle").textContent =
        "Discover " + place.name;
    document.getElementById("placeDescription").textContent =
        place.description;
    document.getElementById("placeBudget").textContent = place.budget;

    placeHero.style.backgroundImage =
        `linear-gradient(90deg, rgba(8,31,27,.82), rgba(8,31,27,.15)), url("${place.image}")`;

    const highlightGrid = document.getElementById("highlightGrid");

    if (highlightGrid) {
        place.activities.forEach(activity => {
            const card = document.createElement("article");
            card.className = "highlight-card";

            const icon = document.createElement("div");
            icon.className = "highlight-icon";
            icon.textContent = activity[0];

            const heading = document.createElement("h3");
            heading.textContent = activity[1];

            const description = document.createElement("p");
            description.textContent = activity[2];

            card.append(icon, heading, description);
            highlightGrid.appendChild(card);
        });
    }
}

/* =========================
   CONTACT FORM DEMONSTRATION
========================= */

const travelContactForm = document.getElementById("contactForm");

if (travelContactForm) {
    travelContactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const message = document.getElementById("formMessage");

        if (message) {
            message.textContent =
                "Thank you! Your form has been validated successfully. " +
                "This demo does not send messages to a server.";
        }

        travelContactForm.reset();
    });
}
