<template>
  <b-form-group :id="`fieldset-${$attrs.id}`" :label="label" :label-for="`radio-group-${$attrs.id}`">
    <b-form-radio-group
      :id="`radio-group-${$attrs.id}`"
      :checked="value"
      @input="$emit('input', $event)"
      :options="options"
    >
    </b-form-radio-group>
  </b-form-group>
</template>

<script>
export default {
  name: "InputRadioOptions",
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Boolean],
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      required: true,
    },
  },
};
</script>
