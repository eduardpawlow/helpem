<template lang="pug">
  .input-container(
    :class="{error: errors.length}"
  )
    label(
      v-if="label"
    ) {{ label }} #[span.required(v-if="required") *]
    .input-wrapper-outer
      .input-wrapper-inner
        input(
          v-if="(changeable && editing) || !changeable"
          v-bind="$attrs"
          :name="name"
          :id="name"
          :value="value"
          @change="changeHandler"
          @input="inputHandler"
        )
        slot(name="after-input-inner")
      slot(name="after-input-outer")
    .subinfo(v-if="errors.length || submessage")
      .error(v-if="errors.length") {{ displayError }}
      .submessage(v-if="submessage && !errors.length") {{ submessage }}
    slot(name="after-input-down")
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
    typeInput: {
      type: String,
      default: 'text',
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
  },
  computed: {
    displayError() {
      if (this.errors.length === 0) return ''
      return String(this.errors[0])
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
.input-container {
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

    font-weight: bold;
    font-size: 13px;
    line-height: 15px;

    .required {
      color: #ff0013;
    }
  }

  .input-wrapper-outer {
    display: flex;
    // width: max-content;
    padding: 0 20px 0 50px;
    width: 100%;

    .input-wrapper-inner {
      display: flex;
      width: 100%;

      input {
        width: 100%;
        padding: 10px;
        font-size: 15px;
        line-height: 17px;
        border: none;

        &:focus,
        &:active {
          outline: none;
        }
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
    .input-wrapper-inner {
      border: 1px solid #ff0013;
      input {
        color: #ff0013;
      }
    }
  }
}
</style>
