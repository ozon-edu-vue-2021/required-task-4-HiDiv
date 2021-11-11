import Vue from "vue";
import App from "./App.vue";

import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Vuelidate from "vuelidate";
import VuelidateErrorExtractor, { templates } from "vuelidate-error-extractor";
import FormGroup from "@/components/FormGroup.vue";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.use(Vuelidate);
Vue.use(VuelidateErrorExtractor, {
  // Define common validation messages.
  messages: {
    required: "Поле '{attribute}' должно быть заполнено.",
    email: "В поле '{attribute}' введен неверный Email-адрес.",
    onlyRusLetters: "Поле '{attribute}' может содержать только русские буквы.",
    onlyEngLetters: "Поле '{attribute}' может содержать только английские буквы.",
    rusPassportId: "Поле '{attribute}' должно содержать 4 цифры.",
    rusPassportSeries: "Поле '{attribute}' должно содержать 6 цифр.",
    checkDateFormat: "Дата должна быть в формате дд.мм.гггг",
    checkValidDate: "Неправильная дата.",
    dateLessThanCurrent: "Дата в поле '{attribute}' должна быть не позже сегодняшнего числа.",
  },
  attributes: {
    lastname: "Фамилия",
    firstname: "Имя",
    patronymic: "Отчество",
    birthDate: "Дата рождения",
    email: "Email",
    citizenship: "Гражданство",
    oldLastname: "Фамилия",
    oldFirstname: "Имя",
    "passport.id": "Номер паспорта",
    "passport.series": "Серия паспорта",
    "passport.issueDate": "Дата выдачи",
    "passport.latLastname": "Фамилия на латинице",
    "passport.latFirstname": "Имя на латинице",
    "passport.issueCountry": "Страна выдачи",
    "passport.type": "Тип паспорта",
  },
});

Vue.component("form-group", FormGroup);
Vue.component("form-wrapper", templates.FormWrapper);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
