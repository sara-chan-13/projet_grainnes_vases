// 1. Initialiser le panier (On récupère ce qui existe déjà, sinon on crée un tableau vide)
let panier = JSON.parse(localStorage.getItem('panier_rose_eternelle')) || [];

// 2. Fonction principale pour ajouter un article au panier
function ajouterAuPanier(nom, prix, image) {
    // Vérifier si le produit est déjà dans le panier
    let articleExistant = panier.find(item => item.nom === nom);
    
    if (articleExistant) {
        // S'il existe, on ajoute juste +1 à la quantité
        articleExistant.quantite += 1;
    } else {
        // Sinon, on ajoute le nouveau produit au tableau
        panier.push({ 
            nom: nom, 
            prix: prix, 
            image: image, 
            quantite: 1 
        });
    }
    
    // On sauvegarde le tableau mis à jour dans le localStorage du navigateur
    localStorage.setItem('panier_rose_eternelle', JSON.stringify(panier));
    
    // Petite alerte pour confirmer à l'utilisateur
    alert(nom + " a été ajouté à votre panier avec succès ! 🛒");
}

// 3. Capturer les clics sur les boutons des "Vases"
let boutonsVases = document.querySelectorAll('.btn-acheter');
boutonsVases.forEach(bouton => {
    bouton.addEventListener('click', function() {
        // 'this.closest' kay-jbed l-boîte kbira li jam3a l-bouton w t-tswira
        let box = this.closest('.vase-box'); 
        
        let image = box.querySelector('img').src;
        let nom = "Vase Recyclé"; // Bima annek ma dayrach h3 l-vases, 3tinahom smiya
        let prixTexte = box.querySelector('.vase-price').innerText; 
        
        // Kan-7iydou " DH" w kan-rddouh raqm (Integer)
        let prix = parseInt(prixTexte); 

        ajouterAuPanier(nom, prix, image);
    });
});

// 4. Capturer les clics sur les boutons des "Packs"
let boutonsPacks = document.querySelectorAll('.btn-acheter-pack');
boutonsPacks.forEach(bouton => {
    bouton.addEventListener('click', function() {
        let container = this.closest('.pack-container');
        
        let nom = container.querySelector('.pack-title').innerText.trim();
        let image = container.querySelector('img').src; // Kan-akhdou t-tswira lowla f l-pack
        let prixTexte = container.querySelector('.total-price').innerText;
        let prix = parseInt(prixTexte);

        ajouterAuPanier(nom, prix, image);
    });
});