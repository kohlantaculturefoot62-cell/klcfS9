const API_URL = "https://script.google.com/macros/s/AKfycbzn8CWZKpacH6P-3n9Ew79epzHWHukCSGHeSuSnYAHlpS4nIEDmr7jFEkY072L6xRwNEQ/exec";

document.addEventListener("DOMContentLoaded", () => {
  chargerCandidats();

  // Si le joueur est déjà connecté, on adapte le bouton de la bannière
  const loginBtn = document.querySelector(".login-btn");
  if (loginBtn && localStorage.getItem("joueur_connecte")) {
    loginBtn.innerText = "Mon Espace";
    loginBtn.onclick = () => { window.location.href = "espace_candidat.html"; };
  }
});

async function chargerCandidats() {
  const grid = document.getElementById("candidates-grid");
  
  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    
    if (result.status === "success") {
      grid.innerHTML = ""; // On vide le texte "Chargement..."
      
      result.data.forEach(candidat => {
        let photoUrl = candidat.photo;
        
        // Extraction de l'ID de l'image Drive et utilisation du meilleur format d'URL
        if (photoUrl.includes("file/d/")) {
          const fileId = photoUrl.split("file/d/")[1].split("/")[0];
          photoUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
        }

        const card = document.createElement("div");
        card.className = "candidate-card";
        card.innerHTML = `
          <img src="${photoUrl}" alt="Photo de ${candidat.nom}" loading="lazy">
          <h3>${candidat.nom}</h3>
          <div class="candidate-desc">${candidat.description}</div>
        `;
        
        grid.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Erreur:", error);
    grid.innerHTML = "<p>Impossible de charger les candidats.</p>";
  }
}
