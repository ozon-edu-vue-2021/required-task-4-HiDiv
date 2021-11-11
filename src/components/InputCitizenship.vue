<template>
  <form-group :name="name" :label="label" v-click-outside="dropDownClose">
    <input
      class="form-control"
      type="text"
      :value="filterStr"
      @focus="dropDownOpen"
      @input="changeFilterStr"
      @keypress.enter.prevent.stop="onKeyEnter"
    />

    <ul
      role="menu"
      tabindex="-1"
      class="dropdown-menu show input-dropdown-menu"
      x-placement="bottom-start"
      v-show="dropDownOpened"
    >
      <li role="presentation" v-if="filteredOptions.length === 0">
        <div role="menuitem" href="#" target="_self" class="dropdown-item">Ничего не найдено</div>
      </li>

      <li role="presentation" v-for="item of filteredOptions" :key="item.value">
        <a
          role="menuitem"
          href="#"
          target="_self"
          class="dropdown-item"
          :class="{ active: item.value === value }"
          @click.prevent="selectItem(item.value)"
        >
          {{ item.text }}
        </a>
      </li>
    </ul>
  </form-group>
</template>

<script>
import ClickOutside from "vue-click-outside";
import { debounce } from "@/helpers/utils";

export default {
  name: "InputCitizenship",
  inheritAttrs: false,
  directives: {
    ClickOutside,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
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
  data() {
    return {
      dropDownOpened: false,
      filterStr: "",
    };
  },
  created() {
    this.debounceFilter = debounce(this.updateFilterStr, 1000);
  },
  methods: {
    dropDownOpen() {
      this.dropDownOpened = true;
    },
    dropDownClose() {
      this.dropDownOpened = false;
      this.filterStr = this.value;
    },

    changeFilterStr(event) {
      this.debounceFilter(event.target.value);
    },
    updateFilterStr(newFilterStr) {
      this.filterStr = newFilterStr;
    },
    selectItem(newValue) {
      this.$emit("input", newValue);
      this.dropDownClose();
    },
    onKeyEnter() {
      if (this.filteredOptions.length === 1) {
        this.$emit("input", this.filteredOptions[0].value);
      }
    },
  },
  computed: {
    filteredOptions() {
      return this.options.filter((item) => this.filterStr === "" || item.text.includes(this.filterStr));
    },
  },
  watch: {
    value: {
      immediate: true,
      handler: function (newValue) {
        this.filterStr = newValue;
      },
    },
  },
};
</script>

<style scoped>
.input-dropdown-menu {
  position: absolute;
  top: 66px;
  left: 5px;
  max-height: 300px;
  overflow: auto;
}
</style>
