<script setup>
import { ref } from 'vue';
import { useStore } from '../store/store.js';
import { RouterLink } from 'vue-router';
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


const showPopup = ref(false)

function copyText() {
  navigator.clipboard.writeText("04 89 41 08 07")
    .then(() => {
      showPopup.value = true
      setTimeout(() => showPopup.value = false, 2000)
    })
    .catch(err => {
      console.error("Erreur:", err);
    });
}

</script>



<template>
  <section id="presentation">
    <aside id="SN">
      <img src="../assets/RS/linkedin.svg" alt="logo linkedin">
      <img src="../assets/RS/facebook.svg" alt="logo facebook">
      <img src="../assets/RS/instagram.png" alt="logo instagram">
    </aside>
    <figure>
      <figcaption>
        <div id="who">
          <img src="../assets/logo.png" alt="logo PMS" id="logo">
          <button @click="copyText()" v-if="!responsive"><img src="../assets/icon_phone.svg" alt="icon tel" style="margin-right: 5px;"> 04
            89 41 08 07</button>
          <div v-if="showPopup" class="toast">
            Vous avez copié le numéro! Appelez nous vite!
          </div>
        </div>
        <h1>PROPRETÉ MAINTENANCE SERVICES</h1>
        <h3 id="pres">Des solutions de nettoyage et de maintenance<span> sur mesure </span>
        </h3>
        <p><strong>30 ans d'expertise</strong> au service des entreprises <strong>du Gard et de l'Hérault</strong></p>
        <router-link to="/contact"><button id="devis">FAITES VOTRE DEVIS GRATUIT !</button></router-link>
        <p><i>Devis gratuit, rapide et sans engagement</i></p>
      </figcaption>
      <img src="../assets/presentation_guys.png" alt="illustration" id="illu">
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
    <video src="" controls autoplay muted loop></video>
    <RouterLink to="/contact"><button id="contact">Prenez contact en moins de 2 minutes</button></RouterLink>
  </section>
  <section id="quality">
    <h1>-QUALITÉ DE SERVICE-</h1>
    <h3>Pourquoi faire confiance à PMS</h3>
    <p>PMS propose des prestations sur mesure de <strong>nettoyage professionnel et de remise en état</strong>, adaptées
      à chaque espace</p>
    <div id="optimized">
      <div class="card" v-for="(card, index) in quality_cards" :key="index">
        <img :src="card.icon" :alt="card.alt" class="icon">
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
          <img src="../assets/rating_star.svg" alt="" v-for="n in fake_advice[currentIndex].rating" :key="n">
        </div>
        <p>"{{ fake_advice[currentIndex].content }}"</p>
        <h4>- {{ fake_advice[currentIndex].client }}, {{ fake_advice[currentIndex].lieux }} -</h4>
      </div>
      <button @click="incrementIndex">&#8594;</button>
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
    <p>Politique de cookies - Mentions légales</p>
  </footer>
</template>
<style scoped>
.toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  animation: fadein 0.2s;
}

@keyframes fadein {
  from {
    opacity: 0;
    transform: translate(-50%, 10px);
  }

  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

@media screen and (max-width: 1919px) {
  .card h4 {
    height: 20vh;
  }

  .card {
    height: fit-content !important;
    padding: 20px 5px !important;
  }
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
  height: 700px;
  border-radius: 10px;
  background-color: #fff;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, .1));
  padding: 10px;
  transition: all 0.3s ease-in-out;
}

#optimized {
  margin: 20px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center
}

#quality {
  height: fit-content;
  padding: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background-color: #fefefe;
  gap: 50px;
}

button {
  cursor: pointer
}

#logo {
  width: 300px;
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
  overflow: hidden;

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