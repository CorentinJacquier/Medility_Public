<img src="https://cdn.discordapp.com/attachments/759837532589916170/983340608393470062/icon.png?width=100&height=100">

## 💉 Medility

Le nom Medility vient de “Medicament Utility” qui signifie utilitaire pour la gestion des medicaments des clients du laboratoires GSB.

L'application permet de faire un suivi du poids en fonction de la dose prise en gramme d'un médicament par le patient. Seul le patient a accès à ses données. 

L'application utilise FireStore (Firebase de Google) comme base de données et codée en React Native avec l'aide des outils Expo. 


Voir les [Documentations](https://corentin-jacquier.fr/docs/projets/Documentations%20Medility%202022%20%20-%20Projet%20Mobile%20bis%20-Corentin%20Jacquier.pdf).

Voir l'application [Petility](https://github.com/CorentinJacquier/Petility_Public).

## 🔧 Base de données

Les paramètres de connexion à la base de données (Firebase) sont dans `src/firebase/config.json` :

```js
const firebaseConfig = {
    apiKey: "clé_api",
    authDomain: "domaine",
    databaseURL: "url_bdd",
    projectId: "id_projet",
    storageBucket: "num_bucket",
    messagingSenderId: "id_envoie",
    appId: "id_application",
    measurementId: "id_meusure"
};

## 📷 Capture d'écran

### Page de connexion
<img src="https://media.discordapp.net/attachments/759837532589916170/983386143456378930/Screenshot_2022-06-06-17-03-19-06_19b5f59622b34cc5e799cce4b6f0f8f9.jpg?width=313&height=697">

### Menu principal
<img src="https://media.discordapp.net/attachments/759837532589916170/983386160262938644/Screenshot_2022-06-06-17-02-03-46_19b5f59622b34cc5e799cce4b6f0f8f9.jpg?width=313&height=697">

### Détails du médicament
<img src="https://media.discordapp.net/attachments/759837532589916170/983386178864697425/Screenshot_2022-06-06-17-02-07-80_19b5f59622b34cc5e799cce4b6f0f8f9.jpg?width=313&height=697">

### Création d'un nouveau médicament
<img src="https://media.discordapp.net/attachments/759837532589916170/983386193926438912/Screenshot_2022-06-06-17-02-13-00_19b5f59622b34cc5e799cce4b6f0f8f9.jpg?width=313&height=697">

### Création d'un nouveau médicament
<img src="https://media.discordapp.net/attachments/759837532589916170/983386193926438912/Screenshot_2022-06-06-17-02-13-00_19b5f59622b34cc5e799cce4b6f0f8f9.jpg?width=313&height=697">

### Modification d'un nouveau médicament
<img src="https://media.discordapp.net/attachments/759837532589916170/983386223387217960/Screenshot_2022-06-06-17-02-33-53_19b5f59622b34cc5e799cce4b6f0f8f9.jpg?width=313&height=697">

### Ajout de données pour un médicament
<img src="https://media.discordapp.net/attachments/759837532589916170/983386247101837332/Screenshot_2022-06-06-17-02-30-38_19b5f59622b34cc5e799cce4b6f0f8f9.jpg?width=313&height=697">

### Page d'astuces 
<img src="https://media.discordapp.net/attachments/759837532589916170/983386332892135424/Screenshot_2022-06-06-17-02-19-92_19b5f59622b34cc5e799cce4b6f0f8f9.jpg?width=313&height=697">

### Page de la gestion du compte 
<img src="https://media.discordapp.net/attachments/759837532589916170/983386353725243502/Screenshot_2022-06-06-17-02-16-18_19b5f59622b34cc5e799cce4b6f0f8f9.jpg?width=313&height=697">