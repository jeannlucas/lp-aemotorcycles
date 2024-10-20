import { axiosInstance } from "../lib/api.js";

document.addEventListener("DOMContentLoaded", function () {
      function loadCategories() {
            axiosInstance.get("/categories")
                  .then(function (response) {
                        const categories = response.data;
                        const filters = document.getElementById("portfolio-flters");
                        filters.innerHTML = `
                    <li data-filter="*" class="filter-active">All</li>
                `;
                        categories.forEach((category) => {
                              const filterItem = document.createElement("li");
                              const filterClass = `.filter-${category.name.replace(/\s+/g, "-").toLowerCase()}`;
                              filterItem.setAttribute("data-filter", filterClass);
                              filterItem.textContent = category.name;
                              filters.appendChild(filterItem);
                        });

                        filters.querySelectorAll("li").forEach((item) => {
                              item.addEventListener("click", function () {
                                    document.querySelectorAll("#portfolio-flters li").forEach((li) => li.classList.remove("filter-active"));
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

      function loadProductImages(productId) {
            return axiosInstance.get(`/products/images/${productId}`)
                  .then((response) => response.data)
                  .catch((error) => {
                        console.error(`Erro ao buscar imagens do produto ${productId}:`, error);
                        return [];
                  });
      }

      function loadProducts() {
            axiosInstance.get("/products")
                  .then(function (response) {
                        const products = response.data;
                        const container = document.querySelector("#productContainer");
                        container.innerHTML = "";

                        const limit = 12;
                        products.forEach((product, index) => {
                              if (index >= limit && document.querySelector("#portfolio-flters .filter-active").getAttribute("data-filter") === "*") {
                                    return;
                              }
                              loadProductImages(product.id).then((images) => {
                                    const item = document.createElement("div");
                                    const categoryClass = `filter-${product.category.name.replace(/\s+/g, "-").toLowerCase()}`;
                                    item.classList.add("col-lg-4", "col-md-6", "portfolio-item", categoryClass);

                                    const imageUrl = images.length > 0 ? `data:image/jpeg;base64,${images[0].image}` : "assets/img/portfolio/portfolio-1.jpg";
                                    item.innerHTML = `
                            <div class="portfolio-wrap">
                                <figure>
                                    <img src="${imageUrl}" class="img-fluid" alt="${product.name}" />
                                    <a href="${imageUrl}"  data-gallery="portfolioGallery" title="${product.name}">
                                    </a>
                                    <a href="portfolio-details.html?id=${product.id}" class="link-details" title="More Details">
                                        <i class="bi bi-link"></i>
                                    </a>
                                </figure>
                                <div class="portfolio-info">
                                    <h4><a href="portfolio-details.html?id=${product.id}">${product.name}</a></h4>
                                    <p><a href="portfolio-details.html?id=${product.id}">Clique e Saiba Mais</a></p>
                                </div>
                            </div>
                        `;
                                    container.appendChild(item);
                              });
                        });

                        const filterActive = document.querySelector("#portfolio-flters .filter-active").getAttribute("data-filter");
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
                  const shouldShow = filterClass === null || itemClasses.includes(filterClass);
                  item.style.display = shouldShow ? "block" : "none";
            });
      }

      loadCategories();
      loadProducts();
});
