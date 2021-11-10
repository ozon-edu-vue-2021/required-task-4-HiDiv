<template>
  <form-group :name="name" :label="label">
    <template v-slot:default="props">
      <b-form-input v-bind="props.attrs" v-on="props.listeners" v-model="localValue" trim autocomplete="off" />
    </template>
  </form-group>
</template>

<script>
export default {
  name: "InputTextValidated",
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
