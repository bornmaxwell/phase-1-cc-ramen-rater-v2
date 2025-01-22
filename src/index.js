// Base URL for API
const baseURL = "http://localhost:3000/ramens";

// Callbacks

// Function to handle ramen click event and display details
const handleClick = (ramen) => {
  const detailImage = document.querySelector("#ramen-detail .detail-image");
  const detailName = document.querySelector("#ramen-detail .name");
  const detailRestaurant = document.querySelector("#ramen-detail .restaurant");
  const ratingDisplay = document.getElementById("rating-display");
  const commentDisplay = document.getElementById("comment-display");

  // Update the DOM with selected ramen details
  detailImage.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};

// Function to add submit event listener to the new ramen form
const addSubmitListener = () => {
  const form = document.getElementById("new-ramen");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get form values
    const newRamen = {
      name: event.target.name.value,
      restaurant: event.target.restaurant.value,
      image: event.target.image.value,
      rating: event.target.rating.value,
      comment: event.target["new-comment"].value,
    };

    // Add new ramen to the menu
    renderRamenImage(newRamen);

    // Reset the form after submission
    form.reset();
  });
};

// Function to display all ramen images in the #ramen-menu div
const displayRamens = () => {
  fetch(`${baseURL}`)
    .then((response) => response.json())
    .then((ramens) => {
      const ramenMenu = document.getElementById("ramen-menu");

      ramens.forEach((ramen) => {
        renderRamenImage(ramen);
      });

      // Display the first ramen on page load
      if (ramens.length > 0) {
        handleClick(ramens[0]);
      }
    })
    .catch((error) => console.error("Error fetching ramen data:", error));
};

// Helper function to render a ramen image and add event listener
const renderRamenImage = (ramen) => {
  const ramenMenu = document.getElementById("ramen-menu");
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;

  img.addEventListener("click", () => handleClick(ramen));

  ramenMenu.appendChild(img);
};

// Main function to start the app
const main = () => {
  document.addEventListener("DOMContentLoaded", () => {
    displayRamens();
    addSubmitListener();
  });
};

main();


// Invoke main to start the application
main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
