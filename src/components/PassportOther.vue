<template>
  <b-form-row>
    <b-col md="6">
      <input-text-validated
        label="Фамилия на латинице"
        v-model="localLatLastname"
        name="passport.latLastname"
      ></input-text-validated>
    </b-col>

    <b-col md="6">
      <input-text-validated
        label="Имя на латинице"
        v-model="localLatFirstname"
        name="passport.latFirstname"
      ></input-text-validated>
    </b-col>

    <b-col md="3">
      <input-text-validated label="Номер паспорта" v-model="localId" name="passport.id"></input-text-validated>
    </b-col>

    <b-col md="3">
      <input-select-validated
        label="Страна выдачи"
        v-model="localIssueCountry"
        :options="countriesOptions"
        name="passport.issueCountry"
      ></input-select-validated>
    </b-col>

    <b-col md="6">
      <input-select-validated
        label="Тип паспорта"
        v-model="localType"
        :options="typeOptions"
        name="passport.type"
      ></input-select-validated>
    </b-col>
  </b-form-row>
</template>

<script>
import { optionsUniq } from "@/helpers/utils";

import InputTextValidated from "@/components/InputTextValidated.vue";
import InputSelectValidated from "@/components/InputSelectValidated.vue";

import citizenships from "@/assets/data/citizenships.json";
import passportTypes from "@/assets/data/passport-types.json";

export default {
  name: "PassportOther",
  components: {
    InputTextValidated,
    InputSelectValidated,
  },
  props: {
    latLastname: {
      type: String,
      required: true,
    },
    latFirstname: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    issueCountry: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    countriesOptions: optionsUniq(
      citizenships.map((item) => ({
        value: item.nationality,
        text: item.nationality,
      }))
    ),
    typeOptions: passportTypes.map((item) => ({
      value: item.type,
      text: item.type,
    })),
  }),
  computed: {
    localLatLastname: {
      get() {
        return this.latLastname;
      },
      set(value) {
        this.$emit("update:latLastname", value);
      },
    },
    localLatFirstname: {
      get() {
        return this.latFirstname;
      },
      set(value) {
        this.$emit("update:latFirstname", value);
      },
    },
    localId: {
      get() {
        return this.id;
      },
      set(value) {
        this.$emit("update:id", value);
      },
    },
    localIssueCountry: {
      get() {
        return this.issueCountry;
      },
      set(value) {
        this.$emit("update:issueCountry", value);
      },
    },
    localType: {
      get() {
        return this.type;
      },
      set(value) {
        this.$emit("update:type", value);
      },
    },
  },
};
</script>
