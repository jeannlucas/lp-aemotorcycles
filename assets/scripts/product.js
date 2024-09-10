document.addEventListener("DOMContentLoaded", function () {
  function loadCategories() {
    axios
      .get("http://localhost:3000/categories")
      .then(function (response) {
        const categories = response.data;
        const filters = document.getElementById("portfolio-flters");

        filters.innerHTML =
          '<li data-filter="*" class="filter-active">All</li>';

        categories.forEach((category) => {
          const filterItem = document.createElement("li");
          const filterClass = `.filter-${category.name
            .replace(/\s+/g, "-")
            .toLowerCase()}`;
          filterItem.setAttribute("data-filter", filterClass);
          filterItem.textContent = category.name;
          filters.appendChild(filterItem);
        });

        filters.querySelectorAll("li").forEach((item) => {
          item.addEventListener("click", function () {
            document
              .querySelectorAll("#portfolio-flters li")
              .forEach((li) => li.classList.remove("filter-active"));
            this.classList.add("filter-active");
            const filter = this.getAttribute("data-filter");
            console.log("Selected filter:", filter);
            filterProducts(filter);
          });
        });
      })
      .catch(function (error) {
        console.error("Erro ao buscar categorias:", error);
      });
  }

  function loadProducts() {
    axios
      .get("http://localhost:3000/products")
      .then(function (response) {
        const products = response.data;
        const container = document.querySelector(".portfolio-container");

        container.innerHTML = "";

        // Limite de produtos a exibir
        const limit = 6;

        products.forEach((product, index) => {
          // Adiciona o limite de produtos
          if (
            index >= limit &&
            document
              .querySelector("#portfolio-flters .filter-active")
              .getAttribute("data-filter") === "*"
          ) {
            return;
          }

          const item = document.createElement("div");
          const categoryClass = `filter-${product.category.name
            .replace(/\s+/g, "-")
            .toLowerCase()}`;
          item.classList.add(
            "col-lg-4",
            "col-md-6",
            "portfolio-item",
            categoryClass
          );
          item.innerHTML = `
              <div class="portfolio-wrap">
                <img src="${
                  product.imageUrl || "assets/img/portfolio/portfolio-1.jpg"
                }" class="img-fluid" alt="${product.category.name}" />
                <div class="portfolio-info">
                  <h4>${product.name}</h4>
                  <p>${product.category.name}</p>
                  <div class="portfolio-links">
                    <a href="${
                      product.imageUrl || "#"
                    }" data-gallery="portfolioGallery" class="portfolio-lightbox" title="${
            product.name
          }"></a>
                    <a href="portfolio-details.html" title="More Details">
                      <i class="bx bx-link"></i>
                    </a>
                  </div>
                </div>
              </div>
            `;
          container.appendChild(item);
        });

        const filterActive = document
          .querySelector("#portfolio-flters .filter-active")
          .getAttribute("data-filter");
        filterProducts(filterActive);
      })
      .catch(function (error) {
        console.error("Erro ao buscar produtos:", error);
      });
  }

  function filterProducts(filter) {
    const items = document.querySelectorAll(".portfolio-item");
    const filterClass = filter === "*" ? null : filter.substring(1).trim();

    items.forEach((item) => {
      const itemClasses = Array.from(item.classList);
      const shouldShow =
        filterClass === null || itemClasses.includes(filterClass);
      item.style.display = shouldShow ? "block" : "none";
    });
  }

  loadCategories();
  loadProducts();
});
