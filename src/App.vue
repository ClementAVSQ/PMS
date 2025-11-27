<script setup>
import { ref, reactive, computed } from 'vue';
import { useStore } from './store/store.js';
let store = useStore();

//data récupérées du store
let link_img = store.link_img_client;
let quality_cards = store.quality_cards;
let fake_advice = store.fake_advice;
let footer_img = store.footer;

//checking du responsive pour les éléments qui sont sensé disparaitre sur petit écran
let responsive = ref(false);

window.onload = () => {
  if (window.innerWidth < 1919) {
    responsive.value = true;
  } else {
    responsive.value = false;
  }
};
window.addEventListener('resize', () => {
  if (window.innerWidth < 1919) {
    responsive.value = true;
  } else {
    responsive.value = false;
  }
});
let currentIndex = ref(0);

//logique du défilement automatique des avis
let incrementTimer = setInterval(() => {
  incrementIndex();
}, 10000);

function incrementIndex() {
  if (currentIndex.value < fake_advice.length - 1) {
    currentIndex.value += 1;
  } else {
    currentIndex.value = 0;
  }
}

function decrementIndex() {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
  } else {
    currentIndex.value = fake_advice.length - 1;
  }
}

//récuperation des données du formulaire
const formData = reactive({
  client: 'Collectivité',
  Surface: 500,
  Frequence: 1,
  visiteurs: 1
})

//prévenir si il y a une erreur dans le formulaire
function customError(event) {
  event.target.setCustomValidity("⚠️ La surface est plus grande que ce que nous proposons! Contactez nous pour un devis personnalisé.");
}

//remise a zéro lors de l'erreur
function resetError(event) {
  event.target.setCustomValidity("");
}

//futur logique de calcul de prix
const fake_price = computed(() => {
  return Math.round((2.25 * formData.Surface * formData.Frequence).toFixed(2));
});

// Booléen pour alterner entre darker et brighter
let switching = ref(true);

// Fonction pour alterner le mode à chaque création de div
function toggleDarkBright() {
  switching.value = !switching.value;
}

</script>


<template>
  <section id="presentation">
    <aside id="SN">
      <img src="./assets/RS/linkedin.svg" alt="logo linkedin">
      <img src="./assets/RS/facebook.svg" alt="logo facebook">
      <img src="./assets/RS/instagram.png" alt="logo instagram">
    </aside>
    <figure>
      <figcaption>
        <div id="who">
          <img src="./assets/logo.png" alt="logo PMS" id="logo">
          <button><img src="./assets/icon_phone.svg" alt="icon tel" style="margin-right: 5px;"> 04 89 41 08 07</button>
        </div>
        <h1>PMS-PROPRETÉ MAINTENANCE SERVICES</h1>
        <h3 id="pres">Des solution de nettoyage et de maintenance <span>sur mesure </span>
          <h3 v-if="!responsive"> pour vos locaux professionnels</h3>
        </h3>
        <p><strong>30 ans d'expertise</strong> au service des entreprises <strong>du Gard et de l'Hérault</strong></p>
        <a href="#simulating"><button id="devis">Faites une simulation de tarifs</button></a>
        <p><i>Devis gratuit, repide et sans engagement</i></p>
      </figcaption>
      <img src="./assets/presentation_guys.png" alt="illustration" id="illu">
    </figure>
    <div id="clients">
      <img v-for="(img, index) in link_img" :key="index" :src="img" :alt="'logo client ' + (index + 1)" class="client">
    </div>
  </section>
  <section id="service">
    <div id="text">
      <h1>-NOS SERVICES-</h1>
      <h3>Votre expert du nettoyage industriel en Occitanie</h3>
      <p>Découvrez la société PLS en <strong>1 minute :</strong><br> Notre métier, nos valeurs et notre engagement
        local.</p>
    </div>
    <video src="./assets/video_presentation.mp4" controls autoplay muted loop></video>
    <button id="contact">Prenez contact en moins de 2 minutes</button>
  </section>
  <section id="quality">
    <h1>-QUALITÉ DE SERVICE-</h1>
    <h3>Pourquoi faire confiance à PMS</h3>
    <p>PMS propose des prestations sur mesure de <strong>nettoyage professionnel et de remise en état</strong>, adaptées
      à chaque espace</p>
    <div id="optimized">
      <div class="card" v-for="(card, index) in quality_cards" :key="index">
        <img :src="card.icon" alt="contenu futur" class="icon">
        <h4>{{ card.title }}</h4>
        <p v-if="!responsive">{{ card.description }}</p>
      </div>
    </div>
  </section>

  <section id="advice">
    <h1>-RECOMMANDATIONS-</h1>
    <h3>Depuis 1995, PMS fait de la propreté une priorité</h3>
    <p>Découvrez des témoignages qui reflètent notre engagement à répondre à vos besoins spécifiques</p>
    <div id="avis">
      <button @click="decrementIndex">&#8592;</button>
      <div id="content">
        <div id="rating">
          <img src="./assets/rating_star.svg" alt="" v-for="n in fake_advice[currentIndex].rating" :key="n">
        </div>
        <p>"{{ fake_advice[currentIndex].content }}"</p>
        <h4>- {{ fake_advice[currentIndex].client }}, {{ fake_advice[currentIndex].lieux }} -</h4>
      </div>
      <button @click="incrementIndex">&#8594;</button>
    </div>
  </section>
  <section id="simulating">
    <div id="param">
      <h1>-SIMULATEUR PROPRETÉ-</h1>
      <h3><strong>Estimez en 3 clics</strong> <span id="adjustement">le coût</span> de vos prestations de nettoyage</h3>
      <form>
        <div class="parameter">
          <label for="client">
            <p>Spécificité des locaux</p>
          </label>
          <select id="client" v-model="formData.client">
            <option value="Collectivité">Collectivité</option>
            <option value="administration">administrations</option>
            <option value="Copropriétés">Copropriétés</option>
            <option value="bureaux">bureaux</option>
            <option value="autre">autre</option>
          </select>
        </div>
        <div class="parameter">
          <label for="Surface">
            <p>Surface des locaux en m²</p>
          </label>
          <div id="Surface">
            <input type="number" id="Surfaceinput" min="0" max="1000" v-model.number="formData.Surface"
              @invalid="customError" @input="resetError()" />
            <input type="range" id="SurfaceRange" min="0" max="1000" v-model.number="formData.Surface" />
          </div>
        </div>
        <div class="parameter">
          <label for="frequence">
            <p>Fréquence d'intervention</p>
          </label>
          <input type="range" id="SurfaceRange" min="0" max="10" v-model.number="formData.Frequence" />
        </div>
        <div class="parameter">
          <label for="visiteur">
            <p>Fréquence quotidienne des visiteurs?</p>
          </label>
          <input type="range" id="SurfaceRange" min="0" max="5" v-model.number="formData.visiteurs" />

        </div>

      </form>


    </div>
    <div id="result">
      <div id="estimation" v-if="fake_price !== 0">
        <h1>Votre estimation :</h1>
        <h4><strong>{{ fake_price }}€ </strong>HT/mois</h4>
        <p><i>Montant estimé donné à titre indicatif</i></p>
        <button>Recevoir ma simulation</button>
      </div>
      <div id="particulier">
        <h1>Vous avez une demande de nettoyage particulière?</h1>
        <button>Contactez notre équipe &#8594;</button>
        <div v-if="!responsive">
          <i>
            <p>Tel: 04 89 41 08 07</p>
            <p>Email: contact@pms-nettoyage.com</p>
            <p>151 rue Gilles Roberval, 30900 Nîmes</p>
          </i>
        </div>

      </div>
    </div>
  </section>
  <footer>
    <div id="content_footer">
      <div v-for="(content, index) in footer_img" :key="index" class="part">
        <div v-if="content.position" class="box_footer darker">
          <img :src="content.img" :alt="content.alt">
          <p>{{ content.title }}</p>
        </div>
        <div v-else class="box_footer brighter">
          <img :src="content.img" :alt="content.alt">
          <p>{{ content.title }}</p>
        </div>
      </div>
    </div>
    <p>Politique de cookies - Mention légales</p>
  </footer>
</template>
<style>
@media screen and (max-width: 1919px) {
  .card h4 {
    height: 20vh;
  }

  .card {
    height: fit-content !important;
    padding: 20px 5px !important;
  }
}

:root {
  /* Couleurs */
  --primary-color: #1f5a92;
  --secondary-color: #f6c82c;
  --third-color: #7cb3e2;

  --size-small: clamp(12px, calc(10px + 0.5vw), 16px);
  --size-normal: clamp(16px, calc(14px + 0.8vw), 22px);
  --size-medium: clamp(18px, calc(18px + 1.2vw), 28px);
  --size-large: clamp(20px, calc(24px + 1.8vw), 44px);
  --size-xlarge: clamp(36px, calc(32px + 2.4vw), 56px);

  --spacing-xs: clamp(4px, calc(2px + 0.3vw), 8px);
  --spacing-sm: clamp(8px, calc(6px + 0.5vw), 12px);
  --spacing-md: clamp(12px, calc(10px + 0.8vw), 18px);
  --spacing-lg: clamp(18px, calc(16px + 1.2vw), 28px);
  --spacing-xl: clamp(28px, calc(24px + 1.8vw), 44px);

  --width-container: clamp(300px, 95vw, 1400px);
  --width-card: clamp(150px, calc(80vw / 4), 280px);
}

.box_footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.box_footer p {
  margin-top: 10px;
  color: white;
  width: 40%;
  text-align: center;
}

.box_footer img {
  height: 50%;
}

html,
body {
  scroll-behavior: smooth;
  transition: all 0.5s ease-in-out;

}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
  transition: all 0.3s ease-in-out;
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
  transition: all 0.3s ease-in-out;
}

#content_footer {
  height: 35vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1ebeb;
}

.part {
  width: 25%;
  height: 100%;
}

.darker {
  background-color: var(--primary-color);
  height: 100%;
}

.brighter {
  background-color: var(--third-color);
  height: 100%;
}


button {
  transition: all 0.3s ease-in-out;
}

#rating {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  height: 50px;
  margin-bottom: 50px;
  gap: 10px;
}

#rating img {
  width: auto;
  height: 100%;
}

#advice button {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  color: var(--primary-color);
  background-color: var(--secondary-color);
  font-size: var(--size-medium);
  font-weight: 700;
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, .1))
}

footer img {
  width: 100%;
  height: auto
}

footer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px
}

#result {
  margin-top: 20px;
  width: 30%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 20px
}

#particulier {
  width: 80%;
  height: 45vh;
  background-color: var(--primary-color);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  text-align: center;
  padding: 20px;
  margin-bottom: 20px
}

#estimation p,
#estimation h1,
#particulier p,
#particulier h1 {
  color: #fff;
  margin: 0
}

#estimation h4 {
  font-size: var(--size-large);
  color: #fff;
  margin: 0
}

#estimation button,
#particulier button {
  padding: 15px 30px;
  border-radius: 5px;
  border: none;
  color: var(--primary-color);
  background-color: #fff;
  font-size: var(--size-normal);
  font-weight: 700;
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, .1))
}

#estimation {
  width: 80%;
  height: 45vh;
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  text-align: center;
  padding: 20px
}

input[type=range] {
  width: 50vw;
  appearance: none;
  -webkit-appearance: none;
  background: var(--third-color);
  height: 5px;
  border-radius: 3px
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 25px;
  background: var(--secondary-color);
  border-radius: 10px;
  cursor: pointer
}

input[type=range]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #007BFF;
  border-radius: 50%;
  cursor: pointer
}

#Surface {
  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap
}

#Surfaceinput {
  border-radius: 3px;
  border-color: var(--third-color);
  padding: 2px;
  text-align: center
}

#SurfaceRange {
  width: 80%;
  margin-left: 20px
}

select {
  border-radius: 5px;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  font-size: var(--size-normal)
}

.parameter label p {
  font-size: var(--size-normal);
  color: var(--primary-color);
  margin: 0;
  font-weight: 700;
  height: fit-content
}

.parameter {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center
}

form {
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around
}

#param {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around
}

#simulating {
  width: 100%;
  height: 90vh;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
  margin-bottom: 100px
}

#avis {
  width: 60%;
  height: 40vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, .1));
  padding: 10px
}

#advice {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #f1ebeb;
  text-align: center
}

.card p {
  padding: 20px;
  font-size: var(--size-medium);
  font-weight: 700;
  color: var(--primary-color);
  margin: 10px;
  text-align: center
}

h4 {
  font-size: var(--size-medium);
  color: var(--secondary-color);
  margin-top: 20px;
  text-align: center;
  padding: 10px
}

.icon {
  padding: 0px 5%;
  width: 50%;
}

.card {
  width: 20%;
  height: 65vh;
  border-radius: 10px;
  background-color: #fff;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, .1));
  padding: 10px;
  transition: all 0.3s ease-in-out;
}

#optimized {
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center
}

#quality {
  height: 110vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background-color: #fefefe
}

button {
  cursor: pointer
}

#logo {
  width: 150px;
  height: auto
}

#contact {
  padding: 20px 50px;
  border-radius: 5px;
  border: none;
  color: #fff;
  background-color: var(--primary-color);
  font-size: var(--size-medium);
  font-weight: 700;
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, .1));
  margin-bottom: 100px
}

#pres {
  width: 150%
}

video {
  width: 60%;
  height: 50%;
  object-fit: cover
}

#service {
  height: 130vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #f6f6f6
}

#text {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  padding-top: 5%;
  height: 30%
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif
}

#clients {
  padding: 0 10%;
  width: 100%;
  height: 100px;
  background-color: #fafafa;
  display: flex;
  justify-content: space-around;
  align-items: center
}

.client {
  max-height: 70%;
  max-width: 150px;
  object-fit: contain
}

#devis {
  padding: 5% 5%;
  width: 80%;
  border-radius: 5px;
  border: none;
  color: #fff;
  background-color: var(--secondary-color);
  font-size: var(--size-medium);
  font-weight: 700;
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, .1));
  transition: all 0.3s ease-in-out;

}

p {
  font-size: var(--size-normal);
  color: var(--primary-color);
  margin-bottom: 20px;
  max-width: 40vw;
}

h3 {
  font-size: var(--size-large);
  color: var(--primary-color);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;

}

#adjustement {
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin-bottom: 5px;
}


h3 span {
  color: var(--secondary-color);

}

h1 {
  font-size: var(--size-medium);
  color: var(--third-color)
}

#who {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 160%;
  height: 10%
}

#who button {
  padding: 2%;
  border-radius: 5px;
  border: none;
  color: #fff;
  background-color: var(--third-color);
  font-size: var(--size-medium);
  font-weight: 700;
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, .1))
}

figcaption {
  height: 95%;
  padding-top: 5%;
  padding-left: 10%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between
}

figure {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: 90vh;
  margin: 0
}

#illu {
  width: auto;
  height: 90vh
}

#SN {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  min-width: 40px;
  min-height: 175px;
  margin: 2%;
  width: 2%;
  height: 10vh;
  z-index: 2
}

#SN img {
  width: 100%;
  height: auto
}
</style>