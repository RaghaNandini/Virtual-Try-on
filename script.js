document.addEventListener("DOMContentLoaded", function() {
    const splashScreen = document.getElementById("splash-screen");
    const mainContent = document.getElementById("main-content");

    // Hide Splash Screen after 3 seconds
    setTimeout(() => {
        splashScreen.style.opacity = "0";
        setTimeout(() => {
            splashScreen.style.display = "none";
            mainContent.classList.remove("hidden");
        }, 1000);
    }, 3000);

    // Modal functionality (Auth)
    const authModal = document.getElementById("authModal");
    const loginBtn = document.getElementById("loginBtn");
    const closeModalBtn = document.querySelector("#authModal .close-btn");
    const loginTab = document.getElementById("loginTab");
    const signupTab = document.getElementById("signupTab");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const guestBtn = document.querySelector(".guest-btn");

    // Try Now Button on Landing Page
    const tryNowBtn = document.querySelector(".try-now-btn");

    // Open Auth Modal
    loginBtn.addEventListener("click", function() {
        authModal.style.display = "flex";
        loginTab.classList.add("active");
        signupTab.classList.remove("active");
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    });

    // Close Auth Modal
    closeModalBtn.addEventListener("click", function() {
        authModal.style.display = "none";
        resetForms();
    });

    window.addEventListener("click", function(event) {
        if (event.target === authModal) {
            authModal.style.display = "none";
            resetForms();
        }
    });

    // Tab Switching
    loginTab.addEventListener("click", function() {
        loginTab.classList.add("active");
        signupTab.classList.remove("active");
        loginForm.style.display = "block";
        signupForm.style.display = "none";
        resetForms();
    });

    signupTab.addEventListener("click", function() {
        signupTab.classList.add("active");
        loginTab.classList.remove("active");
        signupForm.style.display = "block";
        loginForm.style.display = "none";
        resetForms();
    });

    // Continue as Guest
    guestBtn.addEventListener("click", function() {
        localStorage.setItem("user", JSON.stringify({ type: "guest" }));
        authModal.style.display = "none";
    });

    // Form Validation and Submission
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();
        let isValid = true;

        // Reset error messages
        document.getElementById("loginEmailError").textContent = "";
        document.getElementById("loginPasswordError").textContent = "";

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            document.getElementById("loginEmailError").textContent = "Email is required";
            isValid = false;
        } else if (!emailRegex.test(email)) {
            document.getElementById("loginEmailError").textContent = "Please enter a valid email";
            isValid = false;
        }

        // Password validation
        if (!password) {
            document.getElementById("loginPasswordError").textContent = "Password is required";
            isValid = false;
        } else if (password.length < 6) {
            document.getElementById("loginPasswordError").textContent = "Password must be at least 6 characters";
            isValid = false;
        }

        if (isValid) {
            // Store user data in localStorage
            localStorage.setItem("user", JSON.stringify({ type: "login", email, password }));
            authModal.style.display = "none";
            resetForms();
        }
    });

    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value.trim();
        let isValid = true;

        // Reset error messages
        document.getElementById("signupNameError").textContent = "";
        document.getElementById("signupEmailError").textContent = "";
        document.getElementById("signupPasswordError").textContent = "";

        // Name validation
        if (!name) {
            document.getElementById("signupNameError").textContent = "Name is required";
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            document.getElementById("signupEmailError").textContent = "Email is required";
            isValid = false;
        } else if (!emailRegex.test(email)) {
            document.getElementById("signupEmailError").textContent = "Please enter a valid email";
            isValid = false;
        }

        // Password validation
        if (!password) {
            document.getElementById("signupPasswordError").textContent = "Password is required";
            isValid = false;
        } else if (password.length < 6) {
            document.getElementById("signupPasswordError").textContent = "Password must be at least 6 characters";
            isValid = false;
        }

        if (isValid) {
            // Store user data in localStorage
            localStorage.setItem("user", JSON.stringify({ type: "signup", name, email, password }));
            authModal.style.display = "none";
            resetForms();
        }
    });

    // Reset Forms Function
    function resetForms() {
        loginForm.reset();
        signupForm.reset();
        document.querySelectorAll(".error-message").forEach(element => {
            element.textContent = "";
        });
    }

    // Dress Categories (with Updated Image Paths)
    const dressCategories = [
        {
            name: "Summer Floral Dress",
            image: "dresses/summer-floral-dress/category-image.png",
            category: "sunny",
            subDresses: [
                { name: "Floral Maxi Dress", image: "dresses/summer-floral-dress/floral_maxi_dress.jpg" },
                { name: "Floral Sundress", image: "dresses/summer-floral-dress/floral-sundress.png" },
                { name: "Floral Midi Dress", image: "dresses/summer-floral-dress/floral-midi-dress.png" }
            ]
        },
        {
            name: "Winter Woolen Dress",
            image: "dresses/winter-woolen-dress/category-image.png",
            category: "snowy",
            subDresses: [
                { name: "Woolen Sweater Dress", image: "dresses/winter-woolen-dress/woolen-sweater-dress.png" },
                { name: "Woolen Tunic Dress", image: "dresses/winter-woolen-dress/woolen-tunic-dress.png" },
                { name: "Woolen Knit Dress", image: "dresses/winter-woolen-dress/woolen-knit-dress.png" }
            ]
        },
        {
            name: "Rainy Day Trench Coat",
            image: "dresses/rainy-day-trench-coat/category-image.png",
            category: "rainy",
            subDresses: [
                { name: "Waterproof Trench Coat", image: "dresses/rainy-day-trench-coat/waterproof-trench-coat.png" },
                { name: "Rainy Day Jacket", image: "dresses/rainy-day-trench-coat/rainy-day-jacket.png" },
                { name: "Rainy Day Poncho", image: "dresses/rainy-day-trench-coat/rainy-day-poncho.png" }
            ]
        },
        {
            name: "Casual Spring Dress",
            image: "dresses/casual-spring-dress/category-image.png",
            category: "cloudy",
            subDresses: [
                { name: "Spring Wrap Dress", image: "dresses/casual-spring-dress/spring-wrap-dress.png" },
                { name: "Spring Shirt Dress", image: "dresses/casual-spring-dress/spring-shirt-dress.png" },
                { name: "Spring Skater Dress", image: "dresses/casual-spring-dress/spring-skater-dress.png" }
            ]
        },
        {
            name: "Windy Day Jacket",
            image: "dresses/windy-day-jacket/category-image.png",
            category: "windy",
            subDresses: [
                { name: "Windbreaker Jacket", image: "dresses/windy-day-jacket/windbreaker-jacket.png" },
                { name: "Windproof Parka", image: "dresses/windy-day-jacket/windproof-parka.png" },
                { name: "Windy Day Hoodie", image: "dresses/windy-day-jacket/windy-day-hoodie.png" }
            ]
        }
    ];

    // Virtual Try-On Modal (Dress Categories)
    const virtualTryOnModal = document.getElementById("virtualTryOnModal");
    const virtualTryOnFeature = document.getElementById("virtualTryOnFeature");
    const virtualTryOnGallery = document.getElementById("virtualTryOnGallery");
    const virtualTryOnCloseBtn = document.querySelector("#virtualTryOnModal .close-btn");

    // Dress Sub-Gallery Modal
    const dressSubGalleryModal = document.getElementById("dressSubGalleryModal");
    const dressSubGallery = document.getElementById("dressSubGallery");
    const subGalleryTitle = document.getElementById("subGalleryTitle");
    const dressSubGalleryCloseBtn = document.querySelector("#dressSubGalleryModal .close-btn");

    // Virtual Try-On Experience Modal
    const virtualTryOnExperienceModal = document.getElementById("virtualTryOnExperienceModal");
    const tryOnDressName = document.getElementById("tryOnDressName");
    const tryOnCanvas = document.getElementById("tryOnCanvas");
    const tryOnContext = tryOnCanvas.getContext("2d");
    const tryAnotherBtn = document.getElementById("tryAnotherBtn");
    const virtualTryOnExperienceCloseBtn = document.querySelector("#virtualTryOnExperienceModal .close-btn");

    // Path to the static person image (e.g., a mannequin or model)
    const personImagePath = "assets/person.png"; // Add this image to your project

    // Variable to keep track of the previous modal
    let previousModal = null;

    // Populate Virtual Try-On Gallery (Dress Categories)
    function populateVirtualTryOnGallery() {
        virtualTryOnGallery.innerHTML = "";
        dressCategories.forEach(category => {
            const dressCard = document.createElement("div");
            dressCard.classList.add("dress-card");
            dressCard.innerHTML = `
                <img src="${category.image}" alt="${category.name}">
                <h3>${category.name}</h3>
            `;
            dressCard.addEventListener("click", function() {
                openSubGallery(category);
            });
            virtualTryOnGallery.appendChild(dressCard);
        });
    }

    // Open Sub-Gallery for a Dress Category
    function openSubGallery(category) {
        virtualTryOnModal.style.display = "none"; // Close the category modal
        previousModal = virtualTryOnModal; // Store the previous modal
        subGalleryTitle.textContent = `Select a ${category.name}`;
        dressSubGallery.innerHTML = "";
        category.subDresses.forEach(dress => {
            const dressCard = document.createElement("div");
            dressCard.classList.add("dress-card");
            dressCard.innerHTML = `
                <img src="${dress.image}" alt="${dress.name}">
                <h3>${dress.name}</h3>
                <button class="try-on-btn" data-dress="${dress.name}" data-image="${dress.image}">Try On</button>
            `;
            dressSubGallery.appendChild(dressCard);
        });

        // Add event listeners to Try On buttons
        document.querySelectorAll(".try-on-btn").forEach(btn => {
            btn.addEventListener("click", function() {
                const dressName = this.getAttribute("data-dress");
                const dressImage = this.getAttribute("data-image");
                startVirtualTryOn(dressName, dressImage);
            });
        });

        dressSubGalleryModal.style.display = "flex";
    }

    // Function to start the virtual try-on experience
    function startVirtualTryOn(dressName, dressImage) {
        // Close the current modal (sub-gallery or weather suggestions)
        dressSubGalleryModal.style.display = "none";
        weatherSuggestionsModal.style.display = "none";

        // Update the dress name in the try-on modal
        tryOnDressName.textContent = `Trying on: ${dressName}`;

        // Load the person image
        const personImg = new Image();
        personImg.crossOrigin = "Anonymous"; // If the image is hosted on a different domain
        personImg.src = personImagePath;

        // Load the dress image
        const dressImg = new Image();
        dressImg.crossOrigin = "Anonymous";
        dressImg.src = dressImage;

        // Wait for both images to load before drawing
        Promise.all([
            new Promise(resolve => personImg.onload = resolve),
            new Promise(resolve => dressImg.onload = resolve)
        ]).then(() => {
            // Clear the canvas
            tryOnContext.clearRect(0, 0, tryOnCanvas.width, tryOnCanvas.height);

            // Draw the person image (scaled to fit the canvas)
            tryOnContext.drawImage(personImg, 0, 0, tryOnCanvas.width, tryOnCanvas.height);

            // Draw the dress image (positioned over the torso, scaled appropriately)
            const dressWidth = tryOnCanvas.width * 0.6; // 60% of canvas width
            const dressHeight = dressWidth * (dressImg.height / dressImg.width); // Maintain aspect ratio
            const dressX = (tryOnCanvas.width - dressWidth) / 2; // Center horizontally
            const dressY = tryOnCanvas.height * 0.3; // Position at 30% from the top (torso area)
            tryOnContext.drawImage(dressImg, dressX, dressY, dressWidth, dressHeight);
        }).catch(error => {
            console.error("Error loading images for virtual try-on:", error);
            tryOnContext.clearRect(0, 0, tryOnCanvas.width, tryOnCanvas.height);
            tryOnContext.fillStyle = "#333";
            tryOnContext.font = "16px Arial";
            tryOnContext.textAlign = "center";
            tryOnContext.fillText("Error loading images.", tryOnCanvas.width / 2, tryOnCanvas.height / 2);
        });

        // Open the virtual try-on modal
        virtualTryOnExperienceModal.style.display = "flex";
    }

    // Open Virtual Try-On Modal via Try Now Button
    tryNowBtn.addEventListener("click", function() {
        populateVirtualTryOnGallery();
        virtualTryOnModal.style.display = "flex";
    });

    // Open Virtual Try-On Modal via Feature Card
    virtualTryOnFeature.addEventListener("click", function() {
        populateVirtualTryOnGallery();
        virtualTryOnModal.style.display = "flex";
    });

    // Close Virtual Try-On Modal
    virtualTryOnCloseBtn.addEventListener("click", function() {
        virtualTryOnModal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === virtualTryOnModal) {
            virtualTryOnModal.style.display = "none";
        }
    });

    // Close Dress Sub-Gallery Modal
    dressSubGalleryCloseBtn.addEventListener("click", function() {
        dressSubGalleryModal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === dressSubGalleryModal) {
            dressSubGalleryModal.style.display = "none";
        }
    });

    // Close Virtual Try-On Experience Modal
    virtualTryOnExperienceCloseBtn.addEventListener("click", function() {
        virtualTryOnExperienceModal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === virtualTryOnExperienceModal) {
            virtualTryOnExperienceModal.style.display = "none";
        }
    });

    // Try Another Dress Button
    tryAnotherBtn.addEventListener("click", function() {
        virtualTryOnExperienceModal.style.display = "none";
        if (previousModal) {
            previousModal.style.display = "flex";
        }
    });

    // Weather-Based Suggestions Modal
    const weatherSuggestionsModal = document.getElementById("weatherSuggestionsModal");
    const weatherSuggestionsFeature = document.getElementById("weatherSuggestionsFeature");
    const weatherSuggestionsGallery = document.getElementById("weatherSuggestionsGallery");
    const weatherInfo = document.getElementById("weatherInfo");
    const weatherSuggestionsCloseBtn = document.querySelector("#weatherSuggestionsModal .close-btn");

    // Available weather types
    const weatherTypes = ["sunny", "snowy", "rainy", "cloudy", "windy"];

    // Function to display dresses based on a given weather type
    function displayDressesForWeather(currentWeather) {
        weatherInfo.textContent = `Current Weather: ${currentWeather.charAt(0).toUpperCase() + currentWeather.slice(1)}`;
        
        // Filter dress categories based on weather
        const recommendedCategories = dressCategories.filter(category => category.category === currentWeather);
        
        weatherSuggestionsGallery.innerHTML = "";
        if (recommendedCategories.length === 0) {
            weatherSuggestionsGallery.innerHTML = "<p>No recommendations available for this weather.</p>";
        } else {
            recommendedCategories.forEach(category => {
                category.subDresses.forEach(dress => {
                    const dressCard = document.createElement("div");
                    dressCard.classList.add("dress-card");
                    dressCard.innerHTML = `
                        <img src="${dress.image}" alt="${dress.name}">
                        <h3>${dress.name}</h3>
                        <button class="try-on-btn" data-dress="${dress.name}" data-image="${dress.image}">Try On</button>
                    `;
                    weatherSuggestionsGallery.appendChild(dressCard);
                });
            });

            // Add event listeners to Try On buttons
            document.querySelectorAll(".try-on-btn").forEach(btn => {
                btn.addEventListener("click", function() {
                    const dressName = this.getAttribute("data-dress");
                    const dressImage = this.getAttribute("data-image");
                    previousModal = weatherSuggestionsModal; // Store the previous modal
                    startVirtualTryOn(dressName, dressImage);
                });
            });
        }
    }

    // Populate Weather-Based Suggestions Gallery with OpenWeatherMap API
    function populateWeatherSuggestionsGallery() {
        // Use your OpenWeatherMap API key
        const apiKey = "4747efe094cb12457ea264d1ae21bbcf";

        // Check if Geolocation is supported
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

                    fetch(url)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            const weatherCondition = data.weather[0].main.toLowerCase();
                            let currentWeather;
                            if (weatherCondition.includes("clear")) {
                                currentWeather = "sunny";
                            } else if (weatherCondition.includes("snow")) {
                                currentWeather = "snowy";
                            } else if (weatherCondition.includes("rain")) {
                                currentWeather = "rainy";
                            } else if (weatherCondition.includes("cloud")) {
                                currentWeather = "cloudy";
                            } else {
                                currentWeather = "windy"; // Fallback for other conditions like "Mist", "Haze", etc.
                            }

                            displayDressesForWeather(currentWeather);
                        })
                        .catch(error => {
                            console.error("Error fetching weather data:", error);
                            weatherInfo.textContent = "Unable to fetch weather data. Please try again later.";
                        });
                },
                error => {
                    console.error("Geolocation error:", error);

                    // Show pop-up to inform user about location access failure
                    alert("Unable to access your location. Using default location (Visakhapatnam, Andhra Pradesh).");

                    // Prompt user to select a weather type
                    const userWeatherInput = prompt(
                        "Please select the type of weather for dress recommendations (e.g., sunny, rainy, snowy, cloudy, windy):"
                    );

                    // Validate user input
                    if (userWeatherInput && weatherTypes.includes(userWeatherInput.toLowerCase().trim())) {
                        // User provided a valid weather type
                        const selectedWeather = userWeatherInput.toLowerCase().trim();
                        displayDressesForWeather(selectedWeather);
                    } else {
                        // User canceled the prompt or provided invalid input, fall back to Visakhapatnam
                        weatherInfo.textContent = "Fetching weather for default location (Visakhapatnam, Andhra Pradesh)...";

                        const city = "Visakhapatnam,Andhra Pradesh,IN";
                        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

                        fetch(url)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`HTTP error! Status: ${response.status}`);
                                }
                                return response.json();
                            })
                            .then(data => {
                                const weatherCondition = data.weather[0].main.toLowerCase();
                                let currentWeather;
                                if (weatherCondition.includes("clear")) {
                                    currentWeather = "sunny";
                                } else if (weatherCondition.includes("snow")) {
                                    currentWeather = "snowy";
                                } else if (weatherCondition.includes("rain")) {
                                    currentWeather = "rainy";
                                } else if (weatherCondition.includes("cloud")) {
                                    currentWeather = "cloudy";
                                } else {
                                    currentWeather = "windy"; // Fallback
                                }

                                displayDressesForWeather(currentWeather);
                            })
                            .catch(error => {
                                console.error("Error fetching weather data for default location:", error);
                                weatherInfo.textContent = "Unable to fetch weather data. Please try again later.";
                            });
                    }
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");

            // Show pop-up to inform user about Geolocation not supported
            alert("Geolocation is not supported by this browser. Using default location (Visakhapatnam, Andhra Pradesh).");

            // Prompt user to select a weather type
            const userWeatherInput = prompt(
                "Please select the type of weather for dress recommendations (e.g., sunny, rainy, snowy, cloudy, windy):"
            );

            // Validate user input
            if (userWeatherInput && weatherTypes.includes(userWeatherInput.toLowerCase().trim())) {
                // User provided a valid weather type
                const selectedWeather = userWeatherInput.toLowerCase().trim();
                displayDressesForWeather(selectedWeather);
            } else {
                // User canceled the prompt or provided invalid input, fall back to Visakhapatnam
                weatherInfo.textContent = "Fetching weather for default location (Visakhapatnam, Andhra Pradesh)...";

                const city = "Visakhapatnam,Andhra Pradesh,IN";
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        const weatherCondition = data.weather[0].main.toLowerCase();
                        let currentWeather;
                        if (weatherCondition.includes("clear")) {
                            currentWeather = "sunny";
                        } else if (weatherCondition.includes("snow")) {
                            currentWeather = "snowy";
                        } else if (weatherCondition.includes("rain")) {
                            currentWeather = "rainy";
                        } else if (weatherCondition.includes("cloud")) {
                            currentWeather = "cloudy";
                        } else {
                            currentWeather = "windy"; // Fallback
                        }

                        displayDressesForWeather(currentWeather);
                    })
                    .catch(error => {
                        console.error("Error fetching weather data for default location:", error);
                        weatherInfo.textContent = "Unable to fetch weather data. Please try again later.";
                    });
            }
        }
    }

    // Open Weather-Based Suggestions Modal
    weatherSuggestionsFeature.addEventListener("click", function() {
        populateWeatherSuggestionsGallery();
        weatherSuggestionsModal.style.display = "flex";
    });

    // Close Weather-Based Suggestions Modal
    weatherSuggestionsCloseBtn.addEventListener("click", function() {
        weatherSuggestionsModal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === weatherSuggestionsModal) {
            weatherSuggestionsModal.style.display = "none";
        }
    });
});