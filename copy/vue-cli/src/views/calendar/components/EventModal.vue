<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden">
      <div class="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-800">
          {{ isNew ? 'Add New Event' : 'Edit Event' }}
        </h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <form @submit.prevent="saveEvent">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
            <input
              v-model="formData.title"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter event title"
              required
            />
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="formData.description"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter event description"
              rows="3"
            ></textarea>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              v-model="formData.date"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
            <select
              v-model="formData.type"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="task">Task</option>
              <option value="kanban">Kanban Task</option>
            </select>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <div class="flex space-x-4">
              <label class="inline-flex items-center">
                <input type="radio" v-model="formData.priority" value="low" class="text-blue-500" />
                <span class="ml-2 text-sm text-gray-700">Low</span>
              </label>
              <label class="inline-flex items-center">
                <input type="radio" v-model="formData.priority" value="medium" class="text-amber-500" />
                <span class="ml-2 text-sm text-gray-700">Medium</span>
              </label>
              <label class="inline-flex items-center">
                <input type="radio" v-model="formData.priority" value="high" class="text-red-500" />
                <span class="ml-2 text-sm text-gray-700">High</span>
              </label>
            </div>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <div
                v-for="(tag, index) in formData.tags"
                :key="index"
                class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center"
              >
                {{ tag }}
                <button
                  type="button"
                  @click="removeTag(index)"
                  class="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="flex">
              <input
                v-model="newTag"
                @keydown.enter.prevent="addTag"
                type="text"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Add a tag"
              />
              <button
                type="button"
                @click="addTag"
                class="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200"
              >
                Add
              </button>
            </div>
          </div>
          
          <div class="flex justify-between pt-4 border-t border-gray-100">
            <div>
              <button
                v-if="!isNew"
                type="button"
                @click="confirmDelete"
                class="px-4 py-2 bg-red-50 text-red-500 rounded-md hover:bg-red-100"
              >
                Delete
              </button>
            </div>
            <div class="flex space-x-2">
              <button
                type="button"
                @click="$emit('close')"
                class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watchEffect } from 'vue';

const props = defineProps({
  event: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      start: new Date(),
      end: new Date(),
      allDay: true,
      type: 'task',
      priority: 'medium',
      tags: []
    })
  },
  isNew: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['close', 'save', 'delete']);

const formData = reactive({
  title: '',
  description: '',
  date: '',
  type: 'task',
  priority: 'medium',
  tags: []
});

const newTag = ref('');

// Initialize form data from props
watchEffect(() => {
  if (props.event) {
    formData.title = props.event.title || '';
    formData.description = props.event.description || '';
    formData.date = props.event.start ? new Date(props.event.start).toISOString().split('T')[0] : '';
    formData.type = props.event.type || 'task';
    formData.priority = props.event.priority || 'medium';
    formData.tags = [...(props.event.tags || [])];
  }
});

const addTag = () => {
  if (newTag.value.trim() === '') return;
  if (!formData.tags.includes(newTag.value.trim())) {
    formData.tags.push(newTag.value.trim());
  }
  newTag.value = '';
};

const removeTag = (index) => {
  formData.tags.splice(index, 1);
};

const saveEvent = () => {
  const eventData = {
    ...props.event,
    title: formData.title,
    description: formData.description,
    start: new Date(formData.date),
    end: new Date(formData.date),
    type: formData.type,
    priority: formData.priority,
    tags: [...formData.tags],
    allDay: true
  };
  
  emit('save', eventData);
};

const confirmDelete = () => {
  if (confirm('Are you sure you want to delete this event?')) {
    emit('delete', props.event);
  }
};
</script> 