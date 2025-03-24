let donnees = [];

let productList = document.getElementById("productList");



fetch("mcdo.json") // on va chercher notre fichier json
  .then(function(response) { //then s'execute quand le fichier est trouvé
    if (!response.ok) { // si la reponse n'est pas OK
      throw new Error("Erreur : pas de fichier JSON chargé"); // on affiche l'erreur
    }
    return response.json() // si c'est ok, on transform l'objet en tableau, on charge et on lit le fichier json 
  })

  .then(function(products){
    donnees = products;
    console.log(products);

    displayList();
  })

  function displayList(){ // on va faire une fonction pour montrer la liste de produit, en fonction de se qu'il se trouve dans l'url de la page. ex sur burger.html, on afficher que les "burgers" du json
    productList.innerHTML = "" // on vide la liste 

    let filteredProduct = donnees; // on cree une variable filtre et pour l'instant on ne filtre pas par defaut

    // on va changer la valeur du filtre en fonction de la page ou on se trouve
    if (window.location.pathname.includes("burger.html")){ //si l'url de la page contient burger.html, alors
      filteredProduct = donnees.burgers // ne prends que les donnees de burgers dans le json
    } else if (window.location.pathname.includes("sides.html")){
      filteredProduct = donnees.sides;

    } else if (window.location.pathname.includes("drinks.html")){
      filteredProduct = donnees.drinks;

    } else if (window.location.pathname.includes("desserts.html")){
      filteredProduct = donnees.desserts;

    } else if (window.location.pathname.includes("menus.html")){
      filteredProduct = donnees.menus;
    
    } else if (window.location.pathname.includes("happymeal.html")){
      filteredProduct = donnees.happyMeal;
    }

    // on va parcourir le tableau, en fonction de la valeurs du filtre. exemple si filtre = drinks, on parcoura uniquement la partie des boissons
    filteredProduct.forEach(function(product) { // comme filteredProduct conteint deja uniquement le produit filtree, pas besoin de refiltrer avec un for. Autant afficher chaque element de filteredProduct
      let card = document.createElement("div");// on cree la div qui va recevoir le contenu de la card
      card.classList.add("card");// on ajoute la class card pour pouvoir stylisé nos cards ensuite

      //on ajoute le contenu pour la card
      card.innerHTML = `  
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}">
        <p class="description">${product.description}</p>
        <p class="prix">${product.price}</p>
        <p class="calories">${product.calories}</p>
      `;

      //on ajoute a la section productList
      productList.appendChild(card);
  });
}


document.addEventListener("DOMContentLoaded", function () {// Exécuter le code quand la page est complètement chargée
  
  let payerBtn = document.querySelector("#payer");// Sélection du bouton "PAYER"

  
  let modal = document.querySelector("#modal");// Sélection de la modale (fenêtre)

  
  let btnComptoir = document.querySelector("#comptoir");// Sélection des boutons dans la modale
  let btnCaisse = document.querySelector("#caisse");

  
  payerBtn.addEventListener("click", function () {// Écouteur d'événement : afficher la modale quand on clique sur "PAYER"
      modal.style.display = "flex"; // Afficher la modale
  });

  btnComptoir.addEventListener("click", function () {  // Écouteur d'événement : bouton "Payer au comptoir"

      alert("Vous avez choisi de payer au comptoir."); // Afficher un message
      modal.style.display = "none"; // Cacher la modale
  });

  
  btnCaisse.addEventListener("click", function () {// Écouteur d'événement : bouton "payer sur la borne"
      alert("Vous avez choisi de payer sur la borne"); // Afficher un message
      modal.style.display = "none"; // Cacher la modale
  });

  modal.addEventListener("click", function (event) {//Écouteur d'événement : fermer la modale en cliquant en dehors du contenu
      if (event.target === modal) { // Vérifier si l'utilisateur clique en dehors
          modal.style.display = "none"; // Cacher la modale
      }
  });
});
