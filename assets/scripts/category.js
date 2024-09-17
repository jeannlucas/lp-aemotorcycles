import { axiosInstance } from "../lib/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axiosInstance.get("/categories");

    // Em vez de verificar `response.ok`, verificamos o status diretamente
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    // A resposta já está no formato `data` em Axios
    const categories = response.data;

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
