<template>
  <b-form-row>
    <b-col md="3">
      <input-text-validated label="Серия паспорта" v-model="localSeries" name="passport.series"></input-text-validated>
    </b-col>

    <b-col md="3">
      <input-text-validated label="Номер паспорта" v-model="localId" name="passport.id"></input-text-validated>
    </b-col>

    <b-col md="6">
      <input-date-validated
        label="Дата выдачи"
        v-model="localIssueDate"
        name="passport.issueDate"
      ></input-date-validated>
    </b-col>
  </b-form-row>
</template>

<script>
import InputTextValidated from "@/components/InputTextValidated.vue";
import InputDateValidated from "@/components/InputDateValidated.vue";

export default {
  name: "PassportRussia",
  components: {
    InputTextValidated,
    InputDateValidated,
  },
  props: {
    series: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    issueDate: {
      type: String,
      required: true,
    },
  },
  computed: {
    localSeries: {
      get() {
        return this.series;
      },
      set(value) {
        this.$emit("update:series", value);
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
    localIssueDate: {
      get() {
        return this.issueDate;
      },
      set(value) {
        this.$emit("update:issueDate", value);
      },
    },
  },
};
</script>
