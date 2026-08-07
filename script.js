// REMPLACE PAR L'URL DONNÉE PAR APPS SCRIPT À L'ÉTAPE 1
const API_URL = "https://script.google.com/macros/s/AKfycbzn8CWZKpacH6P-3n9Ew79epzHWHukCSGHeSuSnYAHlpS4nIEDmr7jFEkY072L6xRwNEQ/exec";

document.addEventListener("DOMContentLoaded", () => {
  chargerCandidats();
});

async function chargerCandidats() {
  const grid = document.getElementById("candidates-grid");
  
  try {
    const response = await fetch(API_URL); // Appel HTTP GET vers Apps Script
    const result = await response.json();
    
    if (result.status === "success") {
      grid.innerHTML = ""; // On vide le texte "Chargement..."
      
      result.data.forEach(candidat => {
        // Transformation du lien Google Drive pour l'afficher en tant qu'image
        let photoUrl = candidat.photo;
        if (photoUrl.includes("file/d/")) {
          const fileId = photoUrl.split("file/d/")[1].split("/")[0];
          photoUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
        }

        // Création de la carte HTML pour le candidat
        const card = document.createElement("div");
        card.className = "candidate-card";
        card.innerHTML = `
          <img src="${photoUrl}" alt="${candidat.nom}" style="width:100%; border-radius:8px; margin-bottom:10px; height:200px; object-fit:cover;">
          <h3>${candidat.nom}</h3>
          <p style="font-size:14px; font-weight:normal; margin-top:10px;">${candidat.description}</p>
        `;
        grid.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Erreur:", error);
    grid.innerHTML = "<p>Impossible de charger les candidats.</p>";
  }
}
