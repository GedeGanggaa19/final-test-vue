<template>
    <div>
        <label :for="identity" class="fw-semibold">{{ label }}
            <span style="color: #cb3a31">*</span>
        </label>
        <textarea name="" :id="identity" class="form-control"
            @keyup="$emit('update:modelValue', $event.target.value)" v-text="modelValue"
        ></textarea>
    </div>
</template>

<script setup>
defineProps({
    identity: { type: String, require: true },
    label: { type: String, require: true },
    placeholder: { type: String, require: true },
    modelValue: { type: String }
});

let emit = defineEmits(['update:modelValue']);
</script>