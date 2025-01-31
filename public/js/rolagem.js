// Detecta o evento de rolar a página
window.addEventListener('scroll', function() {
    const categories = document.querySelectorAll('.menu-category');
    
    categories.forEach(function(category) {
      // Verifica a posição da categoria em relação à tela
      const rect = category.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        // Se a categoria está visível, adiciona a classe 'visible'
        category.classList.add('visible');
      } else {
        // Se não está visível, remove a classe 'visible'
        category.classList.remove('visible');
      }
    });
});