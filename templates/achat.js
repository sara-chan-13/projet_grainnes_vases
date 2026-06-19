// 1. On cible les éléments HTML où on va afficher les données
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// 2. Fonction pour afficher le panier
function afficherPanier() {
    // Récupérer le panier depuis le localStorage
    let panier = JSON.parse(localStorage.getItem('panier_rose_eternelle')) || [];
    
    // Vider le conteneur avant de le remplir
    cartItemsContainer.innerHTML = ""; 
    let prixTotal = 0;

    // Si le panier est vide
    if (panier.length === 0) {
        cartItemsContainer.innerHTML = "<p style='text-align:center; font-size:1.2em;'>Votre panier est actuellement vide. 🌸</p>";
        cartTotalElement.innerText = "0";
        return; // On arrête la fonction ici
    }

    // S'il y a des produits, on boucle sur chaque produit
    panier.forEach((produit) => {
        let sousTotal = produit.prix * produit.quantite;
        prixTotal += sousTotal; // On ajoute au grand total

        // On crée le HTML pour ce produit
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${produit.image}" alt="${produit.nom}">
                <div class="item-details">
                    <h4>${produit.nom}</h4>
                    <p>Prix unitaire : ${produit.prix} DH</p>
                    <p>Quantité : <strong>${produit.quantite}</strong></p>
                </div>
                <div class="item-subtotal">
                    <p><strong>${sousTotal} DH</strong></p>
                </div>
            </div>
        `;
    });

    // On met à jour le texte du prix total en bas
    cartTotalElement.innerText = prixTotal;
}

// 3. Fonction pour vider le panier
function viderPanier() {
    // Demander confirmation avant de tout supprimer
    if(confirm("Êtes-vous sûr de vouloir vider votre panier ?")) {
        localStorage.removeItem('panier_rose_eternelle'); // Supprime les données
        afficherPanier(); // Rafraîchit l'affichage (qui sera vide)
    }
}

// 4. Fonction pour envoyer la commande sur WhatsApp
function validerCommande() {
    let panier = JSON.parse(localStorage.getItem('panier_rose_eternelle')) || [];
    
    // Ila kan l-panier khawi
    if (panier.length === 0) {
        alert("Votre panier est vide. Veuillez ajouter des produits avant de valider.");
        return; // Kan-7ebsou l-khedma hna
    }

    // 1. N-wjdou l-Message li ghadi y-t-ssifet f WhatsApp
    let message = "Bonjour La Rose Éternelle 🌸, je souhaite passer cette commande :\n\n";
    let prixTotal = 0;

    // N-zidou les produits l-message wa7ed b wa7ed
    panier.forEach((produit) => {
        let sousTotal = produit.prix * produit.quantite;
        prixTotal += sousTotal;
        message += `- ${produit.nom} (Quantité: ${produit.quantite}) : ${sousTotal} DH\n`;
    });

    // N-zidou l-Prix Total f l-kher dyal l-message
    message += `\n💰 *Total à payer : ${prixTotal} DH*`;
    message += "\n\nMerci de me confirmer la commande !";

    // 2. N-nmra dyal WhatsApp dyalek (Format international bla '+')
    // 07 66 55 14 70 kat-wlli 212766551470
    let numeroWhatsApp = "212766551470";

    // 3. N-saybou l-Lien dyal WhatsApp
    // 'encodeURIComponent' kat-red l-espaces w s-stoura m-qaddin bach y-diwhom l-lien
    let urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(message)}`;

    // 4. N-7ellou WhatsApp f tab jdid
    window.open(urlWhatsApp, '_blank');

    // 5. N-khwiw l-panier 7it l-kleyan rah ssifet l-commande
    localStorage.removeItem('panier_rose_eternelle');
    
    // N-rddouh l-page d'accueil awla n-actualisiw l-panier
    afficherPanier();
}

// 5. Exécuter l'affichage dès que la page se charge
afficherPanier();