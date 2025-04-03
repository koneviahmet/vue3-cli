<template>
  <div class="bg-base-100 shadow-md rounded-lg p-6">
    <form @submit.prevent="handleSubmit">
      <!-- Notification component -->
      <div v-if="notification.show" 
           class="mb-4 p-3 rounded-md text-sm" 
           :class="notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
        {{ notification.message }}
        <button @click="notification.show = false" class="float-right">
          <span class="text-xs">×</span>
        </button>
      </div>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium  mb-1">Email</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.email && touched.email }"
          @blur="touchField('email')"
        />
        <p v-if="errors.email && touched.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
      </div>

      <div class="flex flex-col space-y-3 mt-6">
        <button
          type="submit"
          class="btn btn-primary w-full"
          :disabled="isSubmitting"
        >
          {{ formAction.submit.title }}
          <span v-if="isSubmitting" class="ml-2">
            <span class="loading loading-spinner loading-xs"></span>
          </span>
        </button>
        
        <button
          type="button"
          class="btn btn-outline btn-info w-full"
          @click="resetForm"
        >
          {{ formAction.clear.title }}
        </button>
        
        <router-link
          :to="formAction.cancel.to"
          class="btn btn-outline btn-ghost w-full"
        >
          {{ formAction.cancel.title }}
        </router-link>
      </div>

      <div class="mt-4 text-center">
        <p class="text-sm ">
          Remember your password?
          <router-link to="/users/login" class="text-blue-600 hover:underline">Login here</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import {
  validationSchema,
  initialValues,
  formAction,
} from "./userForgotPasswordValidate";

const router = useRouter();
const isSubmitting = ref(false);

const formData = reactive({ ...initialValues });
const errors = reactive({});
const touched = reactive({});

// Notification system
const notification = reactive({
  show: false,
  type: 'success',
  message: '',
  timeout: null
});

// Show notification
function showNotification(type, message, duration = 3000) {
  // Clear any existing timeout
  if (notification.timeout) {
    clearTimeout(notification.timeout);
  }

  // Set notification properties
  notification.show = true;
  notification.type = type;
  notification.message = message;

  // Auto-hide after duration
  notification.timeout = setTimeout(() => {
    notification.show = false;
  }, duration);
}

// Validate a single field
function validateField(field) {
  try {
    validationSchema.validateSyncAt(field, formData);
    errors[field] = '';
    return true;
  } catch (error) {
    errors[field] = error.message;
    return false;
  }
}

// Validate all form fields
function validateForm() {
  let isValid = true;
  
  try {
    validationSchema.validateSync(formData, { abortEarly: false });
    // Clear all errors if validation passes
    Object.keys(formData).forEach(field => {
      errors[field] = '';
    });
  } catch (validationErrors) {
    // Set errors for each field that failed validation
    if (validationErrors.inner) {
      validationErrors.inner.forEach(error => {
        errors[error.path] = error.message;
        touched[error.path] = true;
        isValid = false;
      });
    }
  }
  
  return isValid;
}

// Mark a field as touched
function touchField(field) {
  touched[field] = true;
  validateField(field);
}

// Reset the form
function resetForm() {
  Object.assign(formData, initialValues);
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });
  Object.keys(touched).forEach(key => {
    touched[key] = false;
  });
}

async function handlePasswordReset() {
  try {
    isSubmitting.value = true;
    
    // Here you would integrate with your password reset API
    // Example: const response = await authService.forgotPassword(formData.email);
    
    setTimeout(() => {
      // Simulating API call
      showNotification('success', 'Password reset link sent to your email');
      
      router.push("/users/login");
      isSubmitting.value = false;
    }, 1500);
    
  } catch (error) {
    showNotification('error', error.message || 'Failed to send password reset link');
    isSubmitting.value = false;
  }
}

function handleSubmit() {
  // Touch all fields so errors show
  Object.keys(formData).forEach(field => {
    touched[field] = true;
  });
  
  // Validate all fields
  const isValid = validateForm();
  
  if (isValid) {
    handlePasswordReset();
  }
}
</script> 