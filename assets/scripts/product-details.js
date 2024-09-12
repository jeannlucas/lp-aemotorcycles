document.addEventListener("DOMContentLoaded", function () {
  // Capturar o ID do produto da URL
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    console.error("ID do produto não encontrado na URL");
    return;
  }

  // Função para carregar os dados do produto
  async function loadProductDetails() {
    try {
      // Requisição para buscar os detalhes do produto
      const response = await axios.get(
        `http://localhost:3000/products/${productId}`
      );
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

      // Carregar imagens do produto
      await loadProductImages(product.id);
    } catch (error) {
      console.error("Erro ao carregar os detalhes do produto:", error);
    }
  }

  // Função para carregar as imagens do produto
  async function loadProductImages(productId) {
    try {
      // Requisição para buscar as imagens do produto
      const response = await axios.get(
        `http://localhost:3000/products/images/${productId}`
      );
      const images = response.data;

      const sliderWrapper = document.querySelector(
        ".portfolio-details-slider .swiper-wrapper"
      );
      sliderWrapper.innerHTML = ""; // Limpa o slider antes de adicionar novas imagens

      // Loop para adicionar cada imagem ao slider
      images.forEach((imageData) => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        slide.innerHTML = `<img src="data:image/jpeg;base64,${imageData.image}" alt="Imagem do Produto">`;
        sliderWrapper.appendChild(slide);
      });
    } catch (error) {
      console.error("Erro ao carregar as imagens do produto:", error);
    }
  }

  // Carregar os detalhes do produto quando a página for carregada
  loadProductDetails();
});
