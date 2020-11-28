<template lang="pug">
  .checkbox-container(
    :class="styleType"
  )
    .checkbox(@click="checkhandler")
      input(
        type="checkbox"
        :name="name"
        :id="name"
        :disabled="disabled"
        :checked="checked"
        ref="checkbox"
      )
      .mark
        svg-icon(name="check" fill="#02ffff")
      label(v-if="withLabel")
        slot
    .error(v-if="errors.length") {{ error }}
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    withLabel: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    styleType: {
      type: String,
      default: '',
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    displayError() {
      if (!this.errors.length) return ''
      return String(this.errors[0])
    },
  },
  methods: {
    checkhandler() {
      if (!this.disabled) {
        const checked = !this.$refs.checkbox.checked
        if (this.required && !checked) {
          this.$emit('error', {
            name: this.name,
            msg: this.$t('inputs.errors.emptyChechbox'),
          })
        } else {
          this.$emit('valid', this.name)
        }
        this.$emit('input', checked)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.checkbox-container {
  .checkbox {
    position: relative;
    display: flex;
    align-items: center;

    input {
      display: none;

      &:checked + .mark {
        background: #3f8ae0;
        svg {
          display: block;
          fill: #ffffff;
        }
      }

      &:disabled + .mark {
        background: rgba(0, 0, 0, 0.12);
        cursor: default;
      }
    }

    .mark {
      position: relative;
      display: flex;
      min-width: 20px;
      width: 20px;
      height: 20px;
      border: 1px solid #b8c1cc;
      border-radius: 5px;

      cursor: pointer;

      svg {
        position: absolute;
        left: 3px;
        top: 5px;
        display: none;
        width: 11px;
        height: 9px;
      }
    }

    label {
      margin-left: 5px;
      user-select: none;

      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 20px;
      letter-spacing: 0.2px;
      color: #6d7885;

      cursor: pointer;
    }
  }
  .errors {
    margin-top: 5px;
    min-height: 12px;
    font-size: 12px;
    line-height: 100%;
  }

  &.blue {
    .checkbox {
      .mark {
        border: 1px solid #4e95fd;
        border-radius: 1px;

        svg {
          fill: #4e95fd;
        }
      }

      input:checked + .mark {
        background: #ffffff;
        svg {
          display: block;
          fill: #4e95fd;
        }
      }
    }
  }
}
</style>
