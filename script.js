let donnees = [];

let productList = document.querySelector(".productList");



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

    for (let i = 0; i < filteredProduct.length; i ++){
      let productList = filteredProduct[i];
      




      let cardContent = `
      <div class="card">
        <h2>${productList.name}</h2>
        <p class="description"></p>
        <p class="prix"></p>
        <p class="calorie"></p>
        <img src="" alt="">
      </div>
      `
  }
}
    
 
