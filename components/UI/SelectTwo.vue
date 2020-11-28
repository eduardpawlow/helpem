<template lang="pug">
.select-input-container(
  :class='{ error: errors.length }',
  v-click-outside='closePanel'
)
  label(v-if='label') {{ label }} #[span.required(v-if='required') *] #[span.label_subinfo {{ labelSubinfo }}]

  .select-input__selected(
    @click='tooglePanel',
    :class='{ disabled: disabled || !items.length, open: panelIsOpen, placeholder: displayTitle === placeholder || onlyPlaceholder }'
  )
    input(
      v-if='withSearch',
      style='position: absolute;',
      v-model='searchInput',
      @blur='saveFocus',
      :ref='name'
    )
    .select-input__title(
      :class='{ "visibility-hidden": withSearch && panelIsOpen || onlyPlaceholder}'
    ) {{ displayTitle }}
    .select-input__arrow(:class='{ up: panelIsOpen }')
      svg-icon(name='arrow' width=10 height=10)

  .select-input__panel(v-if='panelIsOpen')
    .select-input__panel__items-wrapper
      .select-input__panel-item(
        v-for='item in items',
        :key='item.id || item',
        :class='{ active: isSelected(item) }',
        @click.stop='selectItem(item)'
      ) {{ item[nameFieldForDisplayValue] || item }}
    button.default.yellow.select-input__panel__apply-btn(
      v-if='multipleWithButton',
      @click.prevent='applySelectedItems'
    ) {{ multipleButtonText }}
  .subinfo(v-if='errors.length || submessage')
    .error(v-if='errors.length') {{ displayError }}
    .submessage(v-if='submessage && !errors.length') {{ submessage }}
  slot(name='after-input')
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    selected: {
      type: [Number, String, Object, Array],
      default: () => {
        return {
          title: '',
        }
      },
    },
    nameFieldForDisplayValue: {
      type: String,
      default: 'title',
    },
    items: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
    labelSubinfo: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    multipleMaxCountSelect: {
      type: [Number],
      default: null,
    },
    multipleWithButton: {
      type: Boolean,
      default: false,
    },
    multipleButtonText: {
      type: String,
      default: 'Выбрать',
    },
    displayTitleById: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    submessage: {
      type: String,
      default: '',
    },
    withSearch: {
      type: Boolean,
      default: false,
    },
    onlyPlaceholder: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      panelIsOpen: false,
      tempItemsForMultipleWithButton: [],
      searchInput: '',
    }
  },
  computed: {
    isEmptySelected() {
      if (Array.isArray(this.selected) && this.selected.length !== 0)
        return true
      else if (typeof this.selected === 'string' && !this.selected) return true
      else if (
        typeof this.selected === 'object' &&
        Object.keys(this.selected).length === 0
      )
        return true

      return false
    },
    displayTitle() {
      if (this.onlyPlaceholder) {
        return this.placeholder
      }

      if (this.displayTitleById) {
        const item = this.items.find((el) => el.id === this.selected.id)
        if (item) {
          return item[this.nameFieldForDisplayValue] || this.placeholder
        } else {
          return this.placeholder
        }
      }

      if (Array.isArray(this.selected) && this.selected.length !== 0) {
        if (typeof this.selected[0] === 'string')
          return this.selected.join(', ')
        else {
          return this.selected
            .map((el) => el[this.nameFieldForDisplayValue] || '')
            .join(', ')
        }
      } else if (typeof this.selected === 'string') {
        return this.selected ? this.selected : this.placeholder
      } else {
        return this.selected[this.nameFieldForDisplayValue] || this.placeholder
      }
    },
  },
  watch: {
    searchInput(value) {
      if (!value) return

      let elements = this.$el.getElementsByClassName('select-input__panel-item')
      elements = Array.prototype.slice.call(elements)

      const searchItems = elements.filter(
        (item) => !item.innerHTML.toLowerCase().indexOf(value.toLowerCase())
      )

      if (searchItems.length > 0) {
        const wrapper = this.$el
          .getElementsByClassName('select-input__panel__items-wrapper')[0]
          .scrollTo(0, searchItems[0].offsetTop)
      }
    },
  },
  methods: {
    saveFocus() {
      if (this.withSearch && this.panelIsOpen) {
        this.$refs[this.name].focus()
      }
    },
    tooglePanel() {
      if (this.panelIsOpen) this.closePanel()
      else this.openPanel()
    },
    openPanel() {
      if (this.items.length === 0) return

      if (this.multipleWithButton && Array.isArray(this.selected)) {
        this.tempItemsForMultipleWithButton = [...this.selected]
      }
      this.panelIsOpen = true

      if (this.withSearch) {
        this.$refs[this.name].focus()
      }
    },
    closePanel() {
      if (this.multipleWithButton) {
        this.tempItemsForMultipleWithButton = []
      }
      this.panelIsOpen = false

      if (this.withSearch) {
        this.searchInput = ''
        this.$refs[this.name].blur()
      }
    },
    applySelectedItems() {
      this.$emit('input', this.tempItemsForMultipleWithButton)
      this.panelIsOpen = false
    },
    selectItem(item) {
      if (this.multiple && Array.isArray(this.selected)) {
        if (!this.multipleWithButton) {
          const index = this.selected.findIndex((el) => {
            if (typeof el === 'string') {
              return el === item
            } else {
              return el.id === item.id
            }
          })

          if (index !== -1) {
            this.selected.splice(index, 1)
            this.$emit('input', this.selected)
          } else if (
            this.multipleMaxCountSelect !== null &&
            this.selected.length >= this.multipleMaxCountSelect
          ) {
          } else {
            this.$emit('input', [...this.selected, item])

            if (this.selected.length >= this.multipleMaxCountSelect - 1)
              this.closePanel()
          }
        } else {
          const index = this.tempItemsForMultipleWithButton.findIndex((el) => {
            if (typeof el === 'string') {
              return el === item
            } else {
              return el.id === item.id
            }
          })

          if (index !== -1) {
            this.tempItemsForMultipleWithButton.splice(index, 1)
          } else if (
            this.multipleMaxCountSelect !== null &&
            this.tempItemsForMultipleWithButton.length >=
              this.multipleMaxCountSelect
          ) {
          } else {
            this.tempItemsForMultipleWithButton.push(item)
          }
        }
      } else {
        this.$emit('input', item)
      }

      if (!this.multiple) this.closePanel()
      this.$emit('valid', this.name)
    },
    isSelected(item) {
      if (Array.isArray(this.selected)) {
        if (this.multipleWithButton) {
          return this.tempItemsForMultipleWithButton.find((el) => {
            if (typeof el === 'string') {
              return el === item
            } else {
              return el.id === item.id
            }
          })
        }
        return this.selected.find((el) => {
          if (typeof el === 'string') {
            return el === item
          } else {
            return el.id === item.id
          }
        })
      } else if (typeof this.selected === 'string')
        return this.selected === item
      else {
        return this.selected.id === item.id
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.select-input-container {
  position: relative;
  display: flex;
  flex-direction: column;
  user-select: none;
  color: #000;

  &:not(:first-child) {
    margin-top: 20px;
  }

  label {
    display: inline-block;
    margin-bottom: 5px;

    font-size: 18px;
    line-height: 20px;
    letter-spacing: 0.2px;
    color: #6d7885;

    .required {
    }

    .label_subinfo {
      color: #b3b3b3;
    }
  }

  .select-input__selected {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background: #f2f3f5;
    border: 1px solid #d5d6d8;
    border-radius: 5px;
    cursor: pointer;

    input {
      background: transparent;
      border: none;
      outline: none;
      font-size: 14px;
      line-height: 16px;

      width: calc(100% - 40px);
      height: inherit;
    }

    font-size: 18px;
    line-height: 20px;

    &:hover {
      // border: 1px solid $secondTextColor;
    }

    &.placeholder .select-input__title {
      color: #afb5bd;
    }

    &:not(.placeholder) {
      // border: 1px solid $mainColor;
    }

    .select-input__title {
      // color: $mainColor;

      &.visibility-hidden {
        opacity: 0;
      }
    }

    &.open {
      border: 1px solid #000000;
      // border-bottom-color: $inactiveColor;
    }

    .select-input__arrow {
      margin-left: 10px;

      svg {
        // stroke: $linkColor;
      }

      &.up {
        transform: rotate(180deg);
      }
    }

    &.disabled {
      pointer-events: none;
      .select-input__title {
        // color: $inactiveColor;
      }
    }
  }

  .select-input__panel {
    position: absolute;
    z-index: 20;
    top: 94%;
    right: 0;
    width: 100%;
    background: #f2f3f5;
    border: 1px solid #000000;
    border-radius: 0px 0px 5px 5px;

    .select-input__panel__items-wrapper {
      overflow: auto;
      max-height: 180px;
      .select-input__panel-item {
        padding: 10px;
        cursor: pointer;
        font-size: 18px;
        line-height: 20px;
        letter-spacing: 0.2px;
        color: #6d7885;

        &.active {
          font-weight: bold;
          color: #000;
        }

        &:hover {
          background: rgba(0%, 33%, 73%, 0.1);
        }

        &:not(:last-child) {
          border-bottom: 1px solid #000;
        }
      }

      &::-webkit-scrollbar {
        width: 9px;
      }

      &::-webkit-scrollbar-thumb {
        height: 100px;
        width: 3px;
        border: 3px solid white;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        // background: $inactiveColor;
      }

      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
    }

    .select-input__panel__apply-btn {
      width: 100%;
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
      // color: $warningColor;
    }
  }

  &.error {
    input {
      // border: 1px solid $warningColor;
      // color: $warningColor;
    }
  }
}
</style>
