<template>
  <div class="task-form">
    <div class="form-control w-full mb-3">
      <label class="label">
        <span class="label-text font-semibold">Title</span>
      </label>
      <input 
        type="text" 
        placeholder="Task title" 
        class="input input-bordered w-full" 
        v-model="form.title"
      />
    </div>
    
    <div class="form-control w-full mb-3">
      <label class="label">
        <span class="label-text font-semibold">Description</span>
      </label>
      <textarea 
        placeholder="Task description" 
        class="textarea textarea-bordered w-full" 
        rows="3"
        v-model="form.description"
      ></textarea>
    </div>
    
    <div class="grid grid-cols-2 gap-4 mb-3">
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text font-semibold">Priority</span>
        </label>
        <select class="select select-bordered w-full" v-model="form.priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text font-semibold">Due Date</span>
        </label>
        <input 
          type="date" 
          class="input input-bordered w-full" 
          v-model="form.dueDate"
        />
      </div>
    </div>
    
    <div class="form-control w-full mb-3">
      <label class="label">
        <span class="label-text font-semibold">Tags</span>
      </label>
      <div class="flex flex-wrap items-center gap-2 p-2 border rounded-lg border-base-300 min-h-12">
        <div 
          v-for="(tag, index) in form.tags" 
          :key="index"
          class="badge badge-primary gap-1"
        >
          {{ tag }}
          <button @click="removeTag(index)" class="btn btn-xs btn-ghost btn-circle">×</button>
        </div>
        
        <div class="flex gap-2 mt-1">
          <input 
            type="text" 
            placeholder="Add tag" 
            class="input input-sm input-bordered flex-grow" 
            v-model="newTag"
            @keydown.enter.prevent="addTag"
          />
          <button 
            class="btn btn-sm btn-primary"
            @click="addTag"
            :disabled="!newTag.trim()"
          >
            Add
          </button>
        </div>
      </div>
    </div>
    
    <div class="form-control w-full mb-3">
      <label class="label">
        <span class="label-text font-semibold">Checklist</span>
      </label>
      <div class="border rounded-lg border-base-300 divide-y">
        <div 
          v-for="(item, index) in form.checklist" 
          :key="item.id"
          class="p-2 flex items-center gap-2"
        >
          <input 
            type="checkbox" 
            class="checkbox checkbox-sm" 
            v-model="item.completed"
          />
          <input 
            type="text" 
            class="input input-sm input-bordered flex-grow" 
            v-model="item.text"
          />
          <button 
            @click="removeChecklistItem(index)" 
            class="btn btn-sm btn-ghost btn-circle"
          >
            ×
          </button>
        </div>
        
        <div class="p-2 flex gap-2">
          <input 
            type="text" 
            placeholder="Add item" 
            class="input input-sm input-bordered flex-grow" 
            v-model="newChecklistItem"
            @keydown.enter.prevent="addChecklistItem"
          />
          <button 
            class="btn btn-sm btn-primary"
            @click="addChecklistItem"
            :disabled="!newChecklistItem.trim()"
          >
            Add
          </button>
        </div>
      </div>
    </div>
    
    <div class="form-control w-full mb-3">
      <label class="label">
        <span class="label-text font-semibold">Assigned To</span>
      </label>
      <select class="select select-bordered w-full" v-model="form.assignedTo">
        <option :value="user.id">{{ user.name }} - {{ user?.username }}</option>
      </select>
    </div>
    
    <div class="flex justify-end gap-2 mt-5">
      <button class="btn" @click="$emit('cancel')">Cancel</button>
      <button 
        class="btn btn-primary" 
        @click="submitForm"
        :disabled="!isFormValid"
      >
        {{ editMode ? 'Update Task' : 'Create Task' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    default: null
  },
  columnId: {
    type: [String, Number],
    default: null
  },
  user: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['submit', 'cancel']);

const editMode = computed(() => !!props.task);
const newTag = ref('');
const newChecklistItem = ref('');

const form = reactive({
  title: '',
  description: '',
  priority: 'medium',
  dueDate: null,
  tags: [],
  checklist: [],
  assignedTo: null,
  columnId: null
});

const isFormValid = computed(() => {
  return form.title.trim() !== '';
});

onMounted(() => {
  if (editMode.value) {
    // Edit mode - populate form with task data
    Object.keys(form).forEach(key => {
      if (props.task[key] !== undefined) {
        if (key === 'checklist' || key === 'tags') {
          form[key] = JSON.parse(JSON.stringify(props.task[key] || []));
        } else {
          form[key] = props.task[key];
        }
      }
    });
  } else {
    // Create mode - set default values
    form.columnId = props.columnId;
    form.assignedTo = props.user.id;
    
    // Set the current date as the due date (in YYYY-MM-DD format)
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate() + 7).padStart(2, '0'); // Default to one week from now
    form.dueDate = `${yyyy}-${mm}-${dd}`;
  }
});

const addTag = () => {
  if (newTag.value.trim()) {
    form.tags.push(newTag.value.trim());
    newTag.value = '';
  }
};

const removeTag = (index) => {
  form.tags.splice(index, 1);
};

const addChecklistItem = () => {
  if (newChecklistItem.value.trim()) {
    form.checklist.push({
      id: Date.now(),
      text: newChecklistItem.value.trim(),
      completed: false
    });
    newChecklistItem.value = '';
  }
};

const removeChecklistItem = (index) => {
  form.checklist.splice(index, 1);
};

const submitForm = () => {
  if (!isFormValid.value) return;
  
  const currentDate = new Date().toISOString();
  
  const formData = {
    ...form,
    created_at: props.task?.created_at || currentDate,
    updated_at: currentDate
  };
  
  if (editMode.value) {
    formData.id = props.task.id;
  }
  
  emit('submit', formData);
};
</script> 