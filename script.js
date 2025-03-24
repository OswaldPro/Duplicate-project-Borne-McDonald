let donnees = [];
let modalProduit = document.querySelector(".modal");

let productList = document.getElementById("productList");
let panier = JSON.parse(localStorage.getItem("panier")) || []; // Récupérer le panier existant ou initialiser un tableau vide
let commandList = document.querySelector(".commande");



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
  

  console.log(filteredProduct);
  // on va parcourir le tableau, en fonction de la valeurs du filtre. exemple si filtre = drinks, on parcoura uniquement la partie des boissons
  filteredProduct.forEach(function(product) { // comme filteredProduct conteint deja uniquement le produit filtree, pas besoin de refiltrer avec un for. Autant afficher chaque element de filteredProduct
    let card = document.createElement("div");// on cree la div qui va recevoir le contenu de la card
    card.classList.add("card");// on ajoute la class card pour pouvoir stylisé nos cards ensuite

    //on ajoute le contenu pour la card
    card.innerHTML = ` 
      <h2>${product.name}</h2>
      <img src="${product.image}" alt="${product.name}">
      <p class="description">${product.description}</p>
      <p class="prix">Prix : ${product.price} €</p>
      <p class="calories">${product.calories} kC</p>`;

    //on ajoute a la section productList
    productList.appendChild(card);

    function afficherModal(product){
      productList.classList.add("blur");
      modalProduit.classList.remove("d-none");
      modalProduit.innerHTML = "";

      for (let i = 0; i < filteredProduct.length; i++){
        if (filteredProduct[i].name === product.name){
            
        let modalContent = document.createElement("div");
        modalContent.classList.add("contenu-modal");
    
        modalContent.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}">
        <button class="ajouter" onclick="ajouterProduit('${product.name}')">Ajouter au panier<span class="prix">${product.price}</span></button>
        <button class="fermer-modal" onclick="fermerModal()">Fermer</button>`;
    
        modalProduit.appendChild(modalContent);
        }
      }
    }
    card.addEventListener("click", function(){
      afficherModal(product);      
    });
  });
}

function ajouterProduit(name) {
  // Vérifier si 'donnees.burgers' existe, et chercher dans cette liste par exemple
  let produitsList = [];

  if (window.location.pathname.includes("burger.html")) {
    produitsList = donnees.burgers;  // Si on est sur la page burger.html
  } else if (window.location.pathname.includes("sides.html")) {
    produitsList = donnees.sides;  // Si on est sur la page sides.html
  } else if (window.location.pathname.includes("drinks.html")) {
    produitsList = donnees.drinks;  // Si on est sur la page drinks.html
  } else if (window.location.pathname.includes("desserts.html")) {
    produitsList = donnees.desserts;  // Si on est sur la page desserts.html
  } else if (window.location.pathname.includes("menus.html")) {
    produitsList = donnees.menus;  // Si on est sur la page menus.html
  } else if (window.location.pathname.includes("happymeal.html")) {
    produitsList = donnees.happyMeal;  // Si on est sur la page happymeal.html
  }

  // Chercher le produit dans la liste appropriée
  let produitAjoute = produitsList.find(product => product.name === name);
  
  if (produitAjoute) {
    panier.push(produitAjoute);
    localStorage.setItem("panier", JSON.stringify(panier));    
    console.log("Produit ajouté au panier:", panier);
    fermerModal();
  }
}

function fermerModal(){
  modalProduit.classList.add("d-none");
  productList.classList.remove("blur")
};

function ouvrirPanier(){
  if (window.location.pathname.includes("panier.html")){
    commandList.innerHTML = ""; // Vider l'affichage avant de recharger le contenu

    if (panier.length === 0) {
    commandList.innerHTML = "<p>Votre panier est vide.</p>";
    return;
    }

    panier.forEach((produitsPanier, index) => {
      let cardPanier = document.createElement("div");
      cardPanier.classList.add("card-panier");


      cardPanier.innerHTML =`
        <h2>${produitsPanier.name}</h2>
        <p class="prix">Prix : ${produitsPanier.price} €</p>
        <button class="supp-panier" onclick="suppPanier(${index})">Retrier du panier</button>`;

        commandList.appendChild(cardPanier);
    });
  }
}

ouvrirPanier();

function suppPanier(index){;
  panier.splice(index, 1); //supprime un element du panier
  localStorage.setItem("panier", JSON.stringify(panier)); // maj du localsotrage

  ouvrirPanier();
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
