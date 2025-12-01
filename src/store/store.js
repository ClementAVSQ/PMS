import { defineStore } from 'pinia'
const ecolabel = new URL('./icon/footer/ecolabel.svg', import.meta.url).href;

export const useStore = defineStore('Store', {
    state: () => ({
        link_img_client :["/logo_client/Domis_mpt.png", "/logo_client/Groupe_PA.svg", "/logo_client/Marcorelles.png", "/logo_client/Monique.png",],
        quality_cards :[
            {
                icon: "./icon/clean.svg",
                title: "MAINTENANCE & NETTOYAGE",
                alt: "propreté",
                description: "Solution d'entretien adaptées à chaque espaces professionnels : collectivités locales, administrations, copropriétés, bureaux, et industries."
            },
            {
                icon: "./icon/gain.svg",
                title: "GAIN DE TEMP ET DE BUDGET",
                alt: "économie",
                description: "Des prestations optimisées vous permettent de réduire vos côuts tout en libérant du temps pour votre activité."
            },
            {
                icon: "./icon/quality.svg",
                title: "SERVICE QUALITATIF ET DURABLE",
                alt: "écologie",
                description: "Nous utilisons des technologies avancées efficaces et des produits respectueux de l'environnement, dans une démarche responsable et durable."
            },
            {
                icon: "./icon/satisfaction.svg",
                title: "SATISFACTION GARANTIE",
                alt: "satisfaction",
                description: "Notre priorité : votre satisfaction. Nos équipes sont à votre écoute et s'adaptent à vos besoins pour un service irréprochable."
            }
        ],
        fake_advice:[
            {
                client: "Entreprise X",
                content: "PMS a transformé nos locaux avec un service impeccable et une équipe professionnelle. Hautement recommandé !",
                lieux: "Nîmes",
                rating: 5
            },
            {
                client: "Société Y",
                content: "Depuis que nous travaillons avec PMS, la propreté de nos bureaux n'a jamais été aussi bonne. Leur attention aux détails est remarquable.",
                lieux: "Montpellier",
                rating: 4
            },
            {
                client: "Association Z",
                content: "Le professionnalisme et la réactivité de PMS sont exceptionnels. Ils comprennent vraiment nos besoins et y répondent parfaitement.",
                lieux: "Alès",
                rating: 3
            }
        ],
        footer:[
            { img: "./icon/footer/ecolabel.svg",
              alt: "footer image",
              title: "Produits certifiés Eco label",
              position: true
            },
            { img: "./icon/footer/humanity.svg",
              alt: "icon représentant l'humain",
              title: "L'humain au coeur de nos valeurs",
              position: false
            },
            { img: "./icon/footer/reactivity.svg",
              alt: "icon de réactivité",
              title: "Une équipe réactive et encadrée",
              position: true
            },
            { img: "./icon/footer/maintenance.svg",
              alt: "footer image",
              title: "Matériel professionnel & technologies avancées",
                position: false
            }
        ],
        devis_client:{
            surface:0,
            frequence:0,
            mail:"",
            locaux:""
        }

    }),
    actions: {

    }
})