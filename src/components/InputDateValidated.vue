<template>
  <form-group :name="name" :label="label">
    <template v-slot:default="props">
      <b-input-group>
        <b-form-input
          v-bind="props.attrs"
          v-on="props.listeners"
          v-model="localValue"
          trim
          placeholder="дд.мм.гггг"
          autocomplete="off"
        ></b-form-input>

        <b-input-group-append>
          <b-form-datepicker
            :value="localValue"
            @input="onChangeDatepicker"
            button-only
            right
            locale="ru-RU"
            :max="new Date()"
            start-weekday="1"
            value-as-date
          ></b-form-datepicker>
        </b-input-group-append>
      </b-input-group>
    </template>
  </form-group>
</template>

<script>
import { format } from "date-fns";

export default {
  name: "InputDateValidated",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
  },
  methods: {
    onChangeDatepicker(newDate) {
      if (newDate instanceof Date) {
        this.localValue = format(newDate, "dd.MM.yyyy");
      }
    },
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
