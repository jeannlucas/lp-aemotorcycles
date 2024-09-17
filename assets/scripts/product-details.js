import { axiosInstance } from "../lib/api.js";

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    console.error("ID do produto não encontrado na URL");
    return;
  }

  async function loadProductDetails() {
    try {
      // Requisição para buscar os detalhes do produto
      const response = await axiosInstance.get(`/products/${productId}`);
      const product = response.data;

      // Atualizar as informações do produto na página
      document.querySelector(".portfolio-info ul").innerHTML = `
        <h3>${product.name}</h3>
        <li><strong>Categoria</strong>: ${product.category.name}</li>
        <li><strong>Marca</strong>: ${product.brand.name}</li>
        <li><strong>Preço Varejo</strong>: R$ ${product.price_varejo.toFixed(
          2
        )}</li>
        <li><strong>Preço Atacado</strong>: <a href="https://wa.me/5544999300014?text=Olá, tenho interesse em realizar compras no atacado. Poderia me orientar sobre os passos que devo seguir?">
          Sob Consulta</a></li>
        <li><strong>Anúncio no Mercado Livre</strong>: <a href="${
          product.mercado_livre
        }" target="_blank">Clique aqui</a></li>
      `;

      document.querySelector(".portfolio-description p").textContent =
        product.description;

      await loadProductImages(product.id);
    } catch (error) {
      console.error("Erro ao carregar os detalhes do produto:", error);
    }
  }

  async function loadProductImages(productId) {
    try {
      const response = await axiosInstance.get(`/products/images/${productId}`);
      const images = response.data;

      const sliderWrapper = document.querySelector(
        ".portfolio-details-slider .swiper-wrapper"
      );
      sliderWrapper.innerHTML = "";

      images.forEach((imageData) => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        slide.innerHTML = `<img src="data:image/jpeg;base64,${imageData.image}" alt="Imagem do Produto">`;
        sliderWrapper.appendChild(slide);
      });

      initializeSwiper();
    } catch (error) {
      console.error("Erro ao carregar as imagens do produto:", error);
    }
  }

  function initializeSwiper() {
    new Swiper(".portfolio-details-slider", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  }

  loadProductDetails();
});
