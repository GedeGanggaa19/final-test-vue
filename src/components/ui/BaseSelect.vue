<template>
    <select name="" :id="id" class="form-select"
        @input="$emit('update:modelValue', $event.target.value)">
        <option :value="item" v-for="(item, index) in data" :key="index" :selected="modelValue === item">
            {{ item }}
        </option>
    </select>
</template>

<script setup>
defineProps({
    data: { type: Array, require: true },
    id: { type: String, require: true },
    modelValue: {type: [String, Number] },
});
</script>