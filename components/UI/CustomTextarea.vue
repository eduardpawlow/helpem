<template lang="pug">
  .textarea-container(
    :class="{error: errors.length}"
  )
    label(
      v-if="label"
    ) {{ label }} #[span.required(v-if="required") *]
    .value(
      v-if="changeable && !editing"
      :class="filterForDisplayValue"
    ) {{ displayValue }}
    .textarea-wrapper(:class="{dirty: isDirty}")
      textarea(
        v-if="(changeable && editing) || !changeable"
        v-bind="$attrs"
        :name="name"
        :id="name"
        :value="value"
        @change="changeHandler"
        @input="inputHandler"
        resizable="false"
        @focus="focused = true; $emit('focus')"
        @blur="focused = false"
      )
      slot(name="after-input-inner")
    .subinfo(v-if="errors.length || submessage")
      .error(v-if="errors.length") {{ displayError }}
      .submessage(v-if="submessage && !errors.length") {{ submessage }}
    slot(name="after-input")
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: () => [],
    },
    submessage: {
      type: String,
      default: '',
    },
    validators: {
      type: Array,
      default: () => [],
    },
    changeable: {
      type: Boolean,
      default: false,
    },
    editing: {
      type: Boolean,
      default: false,
    },
    filterForDisplayValue: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    focused: false,
  }),
  computed: {
    displayError() {
      if (!this.errors.length) return ''
      return String(this.errors[0])
    },
    displayValue() {
      switch (this.filterForDisplayValue) {
        case 'hidden':
          return '*'.repeat(this.value.length)
        default:
          return this.value
      }
    },
    isDirty() {
      return !this.focused && this.value
    },
  },
  methods: {
    changeHandler(e) {
      if (this.validators.length > 0) {
        for (const validator of this.validators) {
          const isValid = validator.method(e.target.value)
          if (!isValid) {
            this.$emit('error', { field: this.name, msg: validator.msg })
            return
          } else this.$emit('valid', this.name)
        }
      } else {
        this.$emit('valid', this.name)
      }
      this.$emit('change', e.target.value)
    },
    inputHandler(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.textarea-container {
  display: flex;
  flex-direction: column;
  width: max-content;

  color: #000;

  &.full-width {
    width: 100%;
  }

  &:not(:first-child) {
    margin-top: 20px;
  }

  label {
    display: inline-block;
    margin-bottom: 10px;

    font-size: 18px;
    line-height: 20px;
    letter-spacing: 0.2px;
    color: #6d7885;

    .required {
      color: #ff0013;
    }
  }

  &.full-width {
    width: 100%;
  }

  .value {
    font-size: 15px;
    line-height: 17px;

    &.hidden {
      letter-spacing: 0.3em;
    }
  }

  .textarea-wrapper {
    display: flex;
    background: #f2f3f5;
    border: 1px solid #d5d6d8;
    border-radius: 5px;

    height: 100%;

    &.dirty textarea {
      color: #000;
    }

    textarea {
      flex: 1;
      padding: 10px;
      font-size: 18px;
      line-height: 20px;
      border: none;
      resize: none;
      background: #f2f3f5;

      font-family: 'Arial', sans-serif;

      &:hover {
      }

      &::placeholder {
        color: #afb5bd;
      }

      &:focus,
      &:active {
        outline: none;
      }
    }
  }

  .subinfo {
    margin-top: 5px;

    font-size: 11px;
    line-height: 13px;

    .submessage {
      color: #999999;
    }

    .error {
      color: #ff0013;
    }
  }

  &.error {
    textarea {
      border: 1px solid #ff0013;
      color: #ff0013;
    }
  }
}
</style>
