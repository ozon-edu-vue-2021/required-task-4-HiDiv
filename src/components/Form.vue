<template>
  <b-card>
    <form-wrapper :validator="$v.formData">
      <b-form @submit.stop.prevent="onSubmit" novalidate>
        <b-form-row>
          <b-col>
            <h4>Личные данные</h4>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col md="4">
            <input-text-validated label="Фамилия" v-model="formData.lastname" name="lastname"></input-text-validated>
          </b-col>

          <b-col md="4">
            <input-text-validated label="Имя" v-model="formData.firstname" name="firstname"></input-text-validated>
          </b-col>

          <b-col md="4">
            <input-text-validated
              label="Отчество"
              v-model="formData.patronymic"
              name="patronymic"
            ></input-text-validated>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col md="6">
            <input-date-validated
              label="Дата рождения"
              v-model="formData.birthDate"
              name="birthDate"
            ></input-date-validated>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col md="12">
            <input-text-validated label="E-mail" v-model="formData.email" name="email"></input-text-validated>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col md="12">
            <input-radio-options
              id="sex"
              label="Пол"
              v-model="formData.sex"
              :options="sexOptions"
            ></input-radio-options>
          </b-col>
        </b-form-row>

        <b-form-row class="mt-4">
          <b-col>
            <h4>Паспортные данные</h4>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col md="6">
            <input-citizenship
              label="Гражданство"
              :value="formData.citizenship"
              @input="onChangeCitizenship"
              :options="citizenshipsOptions"
              name="citizenship"
            ></input-citizenship>
          </b-col>
        </b-form-row>
        <passport-russia v-bind.sync="formData.passport" v-if="isRussianPassport"></passport-russia>
        <passport-other v-bind.sync="formData.passport" v-else></passport-other>

        <b-form-row>
          <b-col md="12">
            <input-radio-options
              id="clf"
              label="Меняли ли фамилию или имя"
              :value="formData.isChangedLastnameOrFirstname"
              @input="onChangeClf"
              :options="clfOptions"
            ></input-radio-options>
          </b-col>
        </b-form-row>

        <b-form-row v-if="formData.isChangedLastnameOrFirstname">
          <b-col md="6">
            <input-text-validated
              label="Фамилия"
              v-model="formData.oldLastname"
              name="oldLastname"
            ></input-text-validated>
          </b-col>

          <b-col md="6">
            <input-text-validated
              label="Имя"
              v-model="formData.oldFirstname"
              name="oldFirstname"
            ></input-text-validated>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col class="text-right">
            <b-button type="submit" variant="primary">Отправить</b-button>
          </b-col>
        </b-form-row>
      </b-form>
    </form-wrapper>
  </b-card>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import {
  onlyRusLetters,
  onlyEngLetters,
  rusPassportId,
  rusPassportSeries,
  checkDateFormat,
  checkValidDate,
  dateLessThanCurrent,
} from "@/helpers/validators";
import { optionsUniq } from "@/helpers/utils";

import InputTextValidated from "@/components/InputTextValidated.vue";
import InputDateValidated from "@/components/InputDateValidated.vue";
import InputRadioOptions from "@/components/InputRadioOptions.vue";
import InputCitizenship from "@/components/InputCitizenship.vue";
import PassportRussia from "@/components/PassportRussia.vue";
import PassportOther from "@/components/PassportOther.vue";

import citizenships from "@/assets/data/citizenships.json";

export default {
  name: "Form",
  components: {
    InputTextValidated,
    InputDateValidated,
    InputRadioOptions,
    InputCitizenship,
    PassportRussia,
    PassportOther,
  },
  data() {
    return {
      sexOptions: [
        { text: "Мужской", value: "male" },
        { text: "Женский", value: "female" },
      ],
      clfOptions: [
        { text: "Нет", value: false },
        { text: "Да", value: true },
      ],
      citizenshipsOptions: optionsUniq(
        citizenships.map((item) => ({
          value: item.nationality,
          text: item.nationality,
        }))
      ),

      formData: {
        lastname: "",
        firstname: "",
        patronymic: "",
        birthDate: "",
        email: "",
        sex: "male",
        citizenship: "Russia",
        passport: {
          series: "",
          id: "",
          issueDate: "",
          latLastname: "",
          latFirstname: "",
          issueCountry: "",
          type: "",
        },
        isChangedLastnameOrFirstname: true,
        oldLastname: "",
        oldFirstname: "",
      },
    };
  },

  validations() {
    return {
      formData: this.rules,
    };
  },

  methods: {
    onChangeCitizenship(newValue, oldValue) {
      this.formData.citizenship = newValue;

      if (newValue !== oldValue) {
        this.formData.passport.latLastname = newValue === "Russia" ? undefined : "";
        this.formData.passport.latFirstname = newValue === "Russia" ? undefined : "";
        this.formData.passport.issueCountry = newValue === "Russia" ? undefined : "";
        this.formData.passport.type = newValue === "Russia" ? undefined : "";

        this.formData.passport.series = newValue !== "Russia" ? undefined : "";
        this.formData.passport.issueDate = newValue !== "Russia" ? undefined : "";
      }
    },
    onChangeClf(newValue, oldValue) {
      this.formData.isChangedLastnameOrFirstname = newValue;

      if (newValue !== oldValue) {
        this.formData.oldLastname = newValue === false ? undefined : "";
        this.formData.oldFirstname = newValue === false ? undefined : "";
      }
    },
    onSubmit() {
      this.$v.formData.$touch();

      if (this.$v.formData.$pending || this.$v.formData.$error) {
        return;
      }

      console.log(JSON.stringify(this.formData));
    },
  },
  computed: {
    rules() {
      const base = {
        lastname: { required, onlyRusLetters },
        firstname: { required, onlyRusLetters },
        patronymic: { required, onlyRusLetters },
        birthDate: { required, checkDateFormat, checkValidDate, dateLessThanCurrent },
        email: { required, email },
        citizenship: { required },
        passport: { id: { required } },
      };

      if (this.isRussianPassport) {
        base.passport.id = { required, rusPassportId };
        base.passport.series = { required, rusPassportSeries };
        base.passport.issueDate = { required, checkDateFormat, checkValidDate, dateLessThanCurrent };
      } else {
        base.passport.latLastname = { required, onlyEngLetters };
        base.passport.latFirstname = { required, onlyEngLetters };
        base.passport.issueCountry = { required };
        base.passport.type = { required };
      }

      if (this.formData.isChangedLastnameOrFirstname) {
        base.oldLastname = { required, onlyRusLetters };
        base.oldFirstname = { required, onlyRusLetters };
      }

      return base;
    },

    isRussianPassport() {
      return this.formData.citizenship === "Russia";
    },
  },
};
</script>
