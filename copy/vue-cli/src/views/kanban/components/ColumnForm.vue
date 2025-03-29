<template>
  <div class="column-form">
    <div class="form-control w-full mb-4">
      <label class="label">
        <span class="label-text font-semibold">Column Title</span>
      </label>
      <input 
        type="text" 
        placeholder="Enter column title" 
        class="input input-bordered w-full" 
        v-model="form.title"
      />
    </div>
    
    <div class="form-control w-full mb-4">
      <label class="label">
        <span class="label-text font-semibold">Column Order</span>
      </label>
      <input 
        type="number" 
        min="0"
        placeholder="Enter column order" 
        class="input input-bordered w-full" 
        v-model="form.order"
      />
      <label class="label">
        <span class="label-text-alt">Lower numbers appear first</span>
      </label>
    </div>
    
    <div class="flex justify-end gap-2 mt-5">
      <button class="btn" @click="$emit('cancel')">Cancel</button>
      <button 
        class="btn btn-primary" 
        @click="submitForm"
        :disabled="!isFormValid"
      >
        {{ editMode ? 'Update Column' : 'Create Column' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue';

const props = defineProps({
  column: {
    type: Object,
    default: null
  },
  boardId: {
    type: [String, Number],
    required: true
  }
});

const emit = defineEmits(['submit', 'cancel']);

const editMode = computed(() => !!props.column);

const form = reactive({
  title: '',
  order: 0,
  boardId: null
});

const isFormValid = computed(() => {
  return form.title.trim() !== '';
});

onMounted(() => {
  if (editMode.value) {
    // Edit mode - populate form with column data
    form.title = props.column.title;
    form.order = props.column.order;
    form.boardId = props.column.boardId;
  } else {
    // Create mode - set default values
    form.boardId = props.boardId;
  }
});

const submitForm = () => {
  if (!isFormValid.value) return;
  
  const currentDate = new Date().toISOString();
  
  const formData = {
    ...form,
    created_at: props.column?.created_at || currentDate,
    updated_at: currentDate
  };
  
  if (editMode.value) {
    formData.id = props.column.id;
  }
  
  emit('submit', formData);
};
</script> 