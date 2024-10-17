// Créez un élément pour afficher le nombre total d'enfants, l'ID et les classes
const infoBox = document.createElement('div');
infoBox.style.position = 'absolute';
infoBox.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
infoBox.style.color = 'white';
infoBox.style.padding = '5px';
infoBox.style.borderRadius = '5px';
infoBox.style.fontSize = '12px';
infoBox.style.pointerEvents = 'none';
infoBox.style.zIndex = '9999';
infoBox.style.display = 'none';
document.body.appendChild(infoBox);


let previousElement = null; // Stocke l'élément précédemment survolé
let currentElement = null; // Stocke l'élément actuellement survolé

// Fonction pour mettre à jour l'infoBox et l'encadrement

// Écouteur d'événement pour détecter le survol d'un élément
document.body.addEventListener('mouseover', function (event) {
    currentElement = event.target;
    updateInfoBox(currentElement, event);
});

// Écouteur d'événement pour masquer l'infoBox et supprimer l'encadrement lorsque la souris quitte l'élément
document.body.addEventListener('mouseout', function () {
    if (previousElement) {
        previousElement.style.outline = ''; // Supprime l'encadrement
    }
    infoBox.style.display = 'none';
});

// Écouteur d'événement pour détecter un clic avec la touche + enfoncée (élément parent)
document.body.addEventListener('keydown', function (event) {
    if (event.key === '+') { // Touche +
        const parentElement = currentElement.parentElement;
        if (parentElement) {
            currentElement = parentElement;
            updateInfoBox(currentElement, event);
        }
    }
});

// Écouteur d'événement pour détecter un clic avec la touche - enfoncée (élément enfant précédent)
let navigationHistory = []; // Stocke l'historique de navigation

document.body.addEventListener('keydown', function (event) {
    if (event.key === '-') { // Touche -
        if (navigationHistory.length > 1) {
            navigationHistory.pop(); // Supprime le dernier élément de l'historique
            currentElement = navigationHistory[navigationHistory.length - 1]; // Récupère le nouvel élément courant
            updateInfoBox(currentElement, event);
        }
    }
});

// Mise à jour de la fonction updateInfoBox pour ajouter l'élément actuel à l'historique
function updateInfoBox(element, event) {
    const totalDescendantsCount = element.getElementsByTagName('*').length;
    const elementId = element.id ? `#${element.id}` : 'Pas d\'ID';
    const elementClasses = element.classList.length > 0 ? `.${[...element.classList].join('.')}` : 'Pas de classes';

    if (previousElement) {
        previousElement.style.outline = '';
    }

    element.style.outline = '2px solid red';
    previousElement = element;

    if (navigationHistory[navigationHistory.length - 1] !== element) {
        navigationHistory.push(element);
    }

    infoBox.innerHTML = `
        Utilisez les touches + et - pour naviguer<br>
        Type d'élément : <strong>${element.tagName.toLowerCase()}</strong><br>
        DOM enfants : <strong>${totalDescendantsCount}</strong><br>
        ID : <strong>${elementId}</strong><br>
        Classes : <strong>${elementClasses}</strong>
    `;
    infoBox.style.left = `${event.pageX + 10}px`;
    infoBox.style.top = `${event.pageY + 10}px`;
    infoBox.style.display = 'block';
    infoBox.style.fontSize = '15px';
}