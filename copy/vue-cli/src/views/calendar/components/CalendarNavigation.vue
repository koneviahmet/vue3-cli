<template>
  <div class="calendar-navigation flex justify-between items-center mb-6">
    <div class="flex items-center space-x-2">
      <button 
        @click="$emit('prev')" 
        class="btn btn-sm btn-ghost"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
      
      <button 
        @click="$emit('today')" 
        class="btn btn-sm bg-gray-100 hover:bg-gray-200 text-gray-800"
      >
        Today
      </button>
      
      <button 
        @click="$emit('next')" 
        class="btn btn-sm btn-ghost"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    
    <h2 class="text-xl font-semibold text-gray-800">{{ formattedDate }}</h2>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentDate: {
    type: Date,
    required: true
  }
});

defineEmits(['prev', 'next', 'today']);

const formattedDate = computed(() => {
  const options = { year: 'numeric', month: 'long' };
  return props.currentDate.toLocaleDateString(undefined, options);
});
</script> 