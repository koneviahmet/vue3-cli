<template>
  <div class="py-6 px-4 min-h-screen">
    <div class="flex items-center justify-between mb-6">
      <div class="text-2xl font-bold text-base-content">Site Settings</div>
      <router-link to="/admin" class="btn btn-sm btn-outline">
        Back to Dashboard
      </router-link>
    </div>
    
    <div v-if="loading" class="bg-base-100 p-6 rounded-lg shadow animate-pulse">
      <div v-for="i in 8" :key="i" class="h-10 bg-base-300 rounded my-4"></div>
    </div>
    
    <div v-else class="bg-base-100 p-6 rounded-lg shadow">
      <form @submit.prevent="saveSettings">
        <!-- General Settings -->
        <div class="border-b border-base-300 pb-4 mb-4">
          <h3 class="text-lg font-medium mb-4">General Settings</h3>
          
          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">Site Name</span>
            </label>
            <input 
              type="text" 
              v-model="formData.siteName" 
              placeholder="Enter site name" 
              class="input input-bordered w-full"
            />
          </div>
          
          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">Site Description</span>
            </label>
            <textarea 
              v-model="formData.siteDescription" 
              placeholder="Enter site description" 
              class="textarea textarea-bordered w-full"
              rows="3"
            ></textarea>
          </div>
          
          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">Site Logo URL</span>
            </label>
            <input 
              type="text" 
              v-model="formData.logoUrl" 
              placeholder="Enter logo URL" 
              class="input input-bordered w-full"
            />
          </div>
          
          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">Favicon URL</span>
            </label>
            <input 
              type="text" 
              v-model="formData.faviconUrl" 
              placeholder="Enter favicon URL" 
              class="input input-bordered w-full"
            />
          </div>
        </div>
        
        <!-- Contact Information -->
        <div class="border-b border-base-300 pb-4 mb-4">
          <h3 class="text-lg font-medium mb-4">Contact Information</h3>
          
          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">Contact Email</span>
            </label>
            <input 
              type="email" 
              v-model="formData.contactEmail" 
              placeholder="Enter contact email" 
              class="input input-bordered w-full"
            />
          </div>
          
          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">Phone Number</span>
            </label>
            <input 
              type="text" 
              v-model="formData.phoneNumber" 
              placeholder="Enter phone number" 
              class="input input-bordered w-full"
            />
          </div>
          
          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">Address</span>
            </label>
            <textarea 
              v-model="formData.address" 
              placeholder="Enter address" 
              class="textarea textarea-bordered w-full"
              rows="3"
            ></textarea>
          </div>
        </div>
        
        <!-- Social Media Links -->
        <div class="border-b border-base-300 pb-4 mb-4">
          <h3 class="text-lg font-medium mb-4">Social Media Links</h3>
          
          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">Facebook</span>
            </label>
            <input 
              type="text" 
              v-model="formData.socialLinks.facebook" 
              placeholder="Enter Facebook URL" 
              class="input input-bordered w-full"
            />
          </div>
          
          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">Twitter</span>
            </label>
            <input 
              type="text" 
              v-model="formData.socialLinks.twitter" 
              placeholder="Enter Twitter URL" 
              class="input input-bordered w-full"
            />
          </div>
          
          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">Instagram</span>
            </label>
            <input 
              type="text" 
              v-model="formData.socialLinks.instagram" 
              placeholder="Enter Instagram URL" 
              class="input input-bordered w-full"
            />
          </div>
          
          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">LinkedIn</span>
            </label>
            <input 
              type="text" 
              v-model="formData.socialLinks.linkedin" 
              placeholder="Enter LinkedIn URL" 
              class="input input-bordered w-full"
            />
          </div>
        </div>
        
        <!-- Appearance Settings -->
        <div class="border-b border-base-300 pb-4 mb-4">
          <h3 class="text-lg font-medium mb-4">Appearance Settings</h3>
          
          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">Theme</span>
            </label>
            <select 
              v-model="formData.theme" 
              class="select select-bordered w-full"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="cupcake">Cupcake</option>
              <option value="bumblebee">Bumblebee</option>
              <option value="emerald">Emerald</option>
              <option value="corporate">Corporate</option>
              <option value="synthwave">Synthwave</option>
              <option value="retro">Retro</option>
              <option value="cyberpunk">Cyberpunk</option>
            </select>
          </div>
          
          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">Primary Color</span>
            </label>
            <div class="flex items-center gap-2">
              <input 
                type="color" 
                v-model="formData.primaryColor" 
                class="input input-bordered w-12 h-12 p-1"
              />
              <input 
                type="text" 
                v-model="formData.primaryColor" 
                placeholder="#ffffff" 
                class="input input-bordered flex-1"
              />
            </div>
          </div>
          
          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">Secondary Color</span>
            </label>
            <div class="flex items-center gap-2">
              <input 
                type="color" 
                v-model="formData.secondaryColor" 
                class="input input-bordered w-12 h-12 p-1"
              />
              <input 
                type="text" 
                v-model="formData.secondaryColor" 
                placeholder="#ffffff" 
                class="input input-bordered flex-1"
              />
            </div>
          </div>
        </div>
        
        <!-- Advanced Settings -->
        <div>
          <h3 class="text-lg font-medium mb-4">Advanced Settings</h3>
          
          <div class="form-control mb-4">
            <label class="label cursor-pointer">
              <span class="label-text">Maintenance Mode</span>
              <input 
                type="checkbox" 
                v-model="formData.maintenanceMode" 
                class="toggle toggle-primary"
              />
            </label>
          </div>
          
          <div class="form-control mb-4">
            <label class="label cursor-pointer">
              <span class="label-text">Enable User Registration</span>
              <input 
                type="checkbox" 
                v-model="formData.enableUserRegistration" 
                class="toggle toggle-primary"
              />
            </label>
          </div>
          
          <div class="form-control mb-4">
            <label class="label cursor-pointer">
              <span class="label-text">Enable API Access</span>
              <input 
                type="checkbox" 
                v-model="formData.enableApiAccess" 
                class="toggle toggle-primary"
              />
            </label>
          </div>
          
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Default Language</span>
            </label>
            <select 
              v-model="formData.defaultLanguage" 
              class="select select-bordered w-full"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="tr">Turkish</option>
            </select>
          </div>
          
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Default Time Zone</span>
            </label>
            <select 
              v-model="formData.defaultTimeZone" 
              class="select select-bordered w-full"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London</option>
              <option value="Europe/Paris">Paris</option>
              <option value="Asia/Tokyo">Tokyo</option>
            </select>
          </div>
        </div>
        
        <div class="flex justify-end gap-2 mt-6">
          <button 
            type="button"
            @click="resetForm"
            class="btn btn-outline"
            :disabled="loading"
          >
            Reset
          </button>
          <button 
            type="submit"
            class="btn btn-primary"
            :disabled="loading"
          >
            <span v-if="loading">Saving...</span>
            <span v-else>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import useSiteSettings from "../../compositions/useSiteSettings";

const { loading, error, getSettings, updateSettings } = useSiteSettings();

const formData = reactive({
  siteName: '',
  siteDescription: '',
  logoUrl: '',
  faviconUrl: '',
  contactEmail: '',
  phoneNumber: '',
  address: '',
  socialLinks: {
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  },
  theme: 'light',
  primaryColor: '#570df8',
  secondaryColor: '#f000b8',
  maintenanceMode: false,
  enableUserRegistration: true,
  enableApiAccess: true,
  defaultLanguage: 'en',
  defaultTimeZone: 'UTC'
});

const originalData = reactive({});

const loadSettings = async () => {
  try {
    const settings = await getSettings();
    if (settings) {
      Object.assign(formData, settings);
      Object.assign(originalData, settings);
    }
  } catch (err) {
    console.error('Error loading settings:', err);
  }
};

const saveSettings = async () => {
  try {
    await updateSettings(formData);
    Object.assign(originalData, formData);
  } catch (err) {
    console.error('Error saving settings:', err);
  }
};

const resetForm = () => {
  Object.assign(formData, originalData);
};

onMounted(() => {
  loadSettings();
});
</script>

<style scoped>
</style> 