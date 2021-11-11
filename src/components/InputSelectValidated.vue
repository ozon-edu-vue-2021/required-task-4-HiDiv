<template>
  <form-group :name="name" :label="label">
    <template v-slot:default="props">
      <b-form-select
        v-bind="props.attrs"
        v-on="props.listeners"
        v-model="localValue"
        :options="options"
      ></b-form-select>
    </template>
  </form-group>
</template>

<script>
export default {
  name: "InputSelectValidated",
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
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: "",
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
