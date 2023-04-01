const nav = document.querySelector('#navbar');

fetch('/components/navigation.html')
  .then(response => response.text())
  .then(html => {
    nav.innerHTML = html;
  });

const footer = document.querySelector('#footer');

  fetch('/components/footer.html')
    .then(response => response.text())
    .then(html => {
      footer.innerHTML = html;
    });
