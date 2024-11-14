<template>
  <div>
    <label :for="identity" class="fw-semibold">
      {{ label }}<span style="color: #cb3a31">*</span>
      <slot></slot>
    </label>
    <input
      :class="[{ 'd-none': isImage}, 'form-control']"
      :type="type"
      :id="identity"
      :placeholder="placeholder"
      :readonly="readonly === '1'"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup="$emit('keyInput', $event.target.value)"
    />
  </div>
</template>

<script setup>
  defineProps({
    type: { type: String, require: true },
    label: { type: String, require: true },
    identity: { type: String, require: true },
    placeholder: { type: String, require: false },
    isImage: { type: Boolean, require: true, default: false },
    readonly: { type: String, require: true, default: "0" },
    modelValue: { type: [String, Number] },
  });
  </script>

