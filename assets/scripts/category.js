document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3000/categories");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const categories = await response.json();

    const portfolioFilters = document.getElementById("portfolio-flters");

    portfolioFilters
      .querySelectorAll("li:not(.filter-active)")
      .forEach((item) => item.remove());

    categories.forEach((category) => {
      const li = document.createElement("li");
      li.textContent = category.name;
      li.setAttribute("data-filter", `.filter-${category.id}`);
      portfolioFilters.appendChild(li);
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
});
