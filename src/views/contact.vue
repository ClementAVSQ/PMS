<script setup>
import { RouterLink } from 'vue-router';
import { reactive } from 'vue'
import Mapping from '../components/map.vue';



const form = reactive({
    "mail": '',
    "content": ''
})

function submitForm() {
    console.log(form)
}
</script>

<template>
    <img src="../assets/contact/background.svg" alt="page contact" id="background">
    <section id="content">
        <aside>
            <RouterLink to="/"><button id="back">&#8592</button></RouterLink>
        </aside>
        <img src="../assets/logo.png" alt="logo de PMS">
        <h1> Prenez contact avec <span>des professionnels</span></h1>
    </section>
    <section id="contact">
        <section id="info">
            <Mapping />
            <h3>Adresse:</h3>
            <p>151 rue Gilles Roberval, 30900 Nimes</p>
            <h3>Mail:</h3>
            <p>contact@pms-nettoyage.com</p>
        </section>
        <img src="../assets/contact/separation.svg">
        <div id="send">
            <form @submit.prevent="submitForm">
                <label>Mail :</label>
                <input type="email" v-model="form.mail" />

                <label>Message :</label>
                <textarea v-model="form.content"></textarea>

                <button type="submit" id="submit">Envoyer</button>
            </form>
        </div>
    </section>
</template>

<style scoped>

#submit{
    width: 100%;
    background-color: var(--secondary-color);
}

form {
    display: flex;
    flex-direction: column;
}

label {
    color: var(--primary-color);
    font-size: var(--size-large);
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    margin: 5%;
}

input {
    width: 95%;
    border-radius: 10px;
    height: 50px;
    border: solid 5px var(--third-color);
    padding: 0px 20px;
    font-size: var(--size-normal);
}

input:focus, textarea:focus{
    outline: none;
    border: solid 5px var(--primary-color);
}

textarea {
    width: 95%;
    margin-bottom: 20px;
    height: 40vh;
    border-radius: 10px;
    border: solid 5px var(--third-color);
    padding: 20px;
    font-size: var(--size-medium);
}

h3 {
    color: var(--primary-color);
    font-size: var(--size-large);
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
}

p {
    color: var(--primary-color);
    font-size: var(--size-medium);
    font-family: Arial, Helvetica, sans-serif;
}

#contact img {
    height: 90%;
}

#send {
    height: 100%;
    width: 40%;
}

#info {
    height: 100%;
    width: 40%;
}

#contact {
    padding: 5% 0;
    height: 80vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 50px;
}


h1 {
    font-size: var(--size-xlarge);
    font-family: Arial, Helvetica, sans-serif;

    color: var(--primary-color);
}

h1 span {
    color: var(--secondary-color);
}

aside {
    align-self: self-start;
}

#content img {
    margin-top: 5%;
    height: 500px;
    width: auto;
    position: inherit;
}

#content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#back {
    margin: 20px;
    background-color: var(--third-color);

}

button {
    font-size: var(--size-medium);
    padding: 10px;
    z-index: 1;
    border-radius: 10px;
    border: none;
}

#background {
    width: 100%;
    position: absolute;
    z-index: -10;
}
</style>