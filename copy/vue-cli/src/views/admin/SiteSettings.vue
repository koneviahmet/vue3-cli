<template>
  <div class="p-6 bg-base-200 min-h-screen">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
      <div>
        <h1 class="text-2xl font-bold text-primary">Site Settings</h1>
        <p class="text-sm opacity-70 mt-1">Configure and customize your BookSwap application</p>
      </div>
      <div class="flex gap-2">
        <router-link to="/admin" class="btn btn-outline btn-sm gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back to Dashboard
        </router-link>
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-base-100 p-6 rounded-lg shadow-lg animate-pulse">
        <div class="h-8 bg-base-300 rounded mb-4"></div>
        <div class="h-36 bg-base-300 rounded"></div>
      </div>
      <div class="bg-base-100 p-6 rounded-lg shadow-lg animate-pulse">
        <div class="h-8 bg-base-300 rounded mb-4"></div>
        <div class="h-36 bg-base-300 rounded"></div>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>{{ error }}</span>
      <button class="btn btn-sm" @click="fetchSettings">Retry</button>
    </div>

    <div v-else class="space-y-6">
      <form @submit.prevent="saveSettings" class="space-y-6">
        <!-- General Settings -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-xl mb-4">General Settings</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Site Name</span>
                </label>
                <input 
                  type="text" 
                  v-model="siteSettings.general.siteName" 
                  class="input input-bordered w-full" 
                  placeholder="BookSwap"
                />
                <label class="label">
                  <span class="label-text-alt text-base-content/60">The name of your site, displayed in browser tabs and emails</span>
                </label>
              </div>
              
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Site Description</span>
                </label>
                <textarea 
                  v-model="siteSettings.general.description" 
                  class="textarea textarea-bordered w-full" 
                  rows="2"
                  placeholder="A platform for exchanging books with other readers..."
                ></textarea>
                <label class="label">
                  <span class="label-text-alt text-base-content/60">A brief description of your site, used for SEO</span>
                </label>
              </div>
              
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Logo URL</span>
                </label>
                <div class="flex gap-2">
                  <input 
                    type="text" 
                    v-model="siteSettings.general.logoUrl" 
                    class="input input-bordered flex-1" 
                    placeholder="https://example.com/logo.png"
                  />
                  <button 
                    type="button" 
                    class="btn"
                    @click="previewImage('logo')"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <label class="label">
                  <span class="label-text-alt text-base-content/60">URL to your site's logo</span>
                </label>
              </div>
              
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Favicon URL</span>
                </label>
                <div class="flex gap-2">
                  <input 
                    type="text" 
                    v-model="siteSettings.general.faviconUrl" 
                    class="input input-bordered flex-1" 
                    placeholder="https://example.com/favicon.ico"
                  />
                  <button 
                    type="button" 
                    class="btn"
                    @click="previewImage('favicon')"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <label class="label">
                  <span class="label-text-alt text-base-content/60">URL to your site's favicon</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Contact Information -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-xl mb-4">Contact Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Support Email</span>
                </label>
                <input 
                  type="email" 
                  v-model="siteSettings.contact.email" 
                  class="input input-bordered w-full" 
                  placeholder="support@example.com"
                />
                <label class="label">
                  <span class="label-text-alt text-base-content/60">Email address for support inquiries</span>
                </label>
              </div>
              
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Phone Number</span>
                </label>
                <input 
                  type="tel" 
                  v-model="siteSettings.contact.phone" 
                  class="input input-bordered w-full" 
                  placeholder="+1 (555) 123-4567"
                />
                <label class="label">
                  <span class="label-text-alt text-base-content/60">Phone number for customer support</span>
                </label>
              </div>
              
              <div class="form-control w-full md:col-span-2">
                <label class="label">
                  <span class="label-text">Address</span>
                </label>
                <textarea 
                  v-model="siteSettings.contact.address" 
                  class="textarea textarea-bordered w-full" 
                  rows="2"
                  placeholder="123 Main St, City, Country"
                ></textarea>
                <label class="label">
                  <span class="label-text-alt text-base-content/60">Physical address of your business</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Social Media -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-xl mb-4">Social Media</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Facebook</span>
                </label>
                <div class="input-group">
                  <span class="flex items-center justify-center px-4 bg-base-300 text-base-content border border-r-0 border-base-300 rounded-l-md">
                    facebook.com/
                  </span>
                  <input 
                    type="text" 
                    v-model="siteSettings.social.facebook" 
                    class="input input-bordered w-full rounded-l-none" 
                    placeholder="yourpage"
                  />
                </div>
              </div>
              
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Twitter</span>
                </label>
                <div class="input-group">
                  <span class="flex items-center justify-center px-4 bg-base-300 text-base-content border border-r-0 border-base-300 rounded-l-md">
                    twitter.com/
                  </span>
                  <input 
                    type="text" 
                    v-model="siteSettings.social.twitter" 
                    class="input input-bordered w-full rounded-l-none" 
                    placeholder="username"
                  />
                </div>
              </div>
              
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Instagram</span>
                </label>
                <div class="input-group">
                  <span class="flex items-center justify-center px-4 bg-base-300 text-base-content border border-r-0 border-base-300 rounded-l-md">
                    instagram.com/
                  </span>
                  <input 
                    type="text" 
                    v-model="siteSettings.social.instagram" 
                    class="input input-bordered w-full rounded-l-none" 
                    placeholder="username"
                  />
                </div>
              </div>
              
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">LinkedIn</span>
                </label>
                <div class="input-group">
                  <span class="flex items-center justify-center px-4 bg-base-300 text-base-content border border-r-0 border-base-300 rounded-l-md">
                    linkedin.com/in/
                  </span>
                  <input 
                    type="text" 
                    v-model="siteSettings.social.linkedin" 
                    class="input input-bordered w-full rounded-l-none" 
                    placeholder="username"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Appearance -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-xl mb-4">Appearance</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Theme</span>
                </label>
                <select v-model="siteSettings.appearance.theme" class="select select-bordered w-full">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System (Auto)</option>
                  <option value="custom">Custom</option>
                </select>
                <label class="label">
                  <span class="label-text-alt text-base-content/60">The visual theme for your site</span>
                </label>
              </div>
              
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Primary Color</span>
                </label>
                <div class="flex gap-2">
                  <input 
                    type="color" 
                    v-model="siteSettings.appearance.primaryColor" 
                    class="w-12 h-10 rounded border border-base-300 cursor-pointer"
                  />
                  <input 
                    type="text" 
                    v-model="siteSettings.appearance.primaryColor" 
                    class="input input-bordered flex-1" 
                    placeholder="#6366F1"
                  />
                </div>
                <label class="label">
                  <span class="label-text-alt text-base-content/60">Main color used throughout the site</span>
                </label>
              </div>
              
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Font Family</span>
                </label>
                <select v-model="siteSettings.appearance.fontFamily" class="select select-bordered w-full">
                  <option value="sans">Sans-serif</option>
                  <option value="serif">Serif</option>
                  <option value="mono">Monospace</option>
                  <option value="custom">Custom</option>
                </select>
                <label class="label">
                  <span class="label-text-alt text-base-content/60">Font used throughout the site</span>
                </label>
              </div>
              
              <div class="form-control w-full" v-if="siteSettings.appearance.fontFamily === 'custom'">
                <label class="label">
                  <span class="label-text">Custom Font</span>
                </label>
                <input 
                  type="text" 
                  v-model="siteSettings.appearance.customFont" 
                  class="input input-bordered w-full" 
                  placeholder="Roboto, Arial, sans-serif"
                />
                <label class="label">
                  <span class="label-text-alt text-base-content/60">Custom font family</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- SEO Settings -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-xl mb-4">SEO Settings</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="form-control w-full md:col-span-2">
                <label class="label">
                  <span class="label-text">Meta Keywords</span>
                </label>
                <textarea 
                  v-model="siteSettings.seo.keywords" 
                  class="textarea textarea-bordered w-full" 
                  rows="2"
                  placeholder="books, swap, reading, exchange, literature"
                ></textarea>
                <label class="label">
                  <span class="label-text-alt text-base-content/60">Comma-separated keywords for search engines</span>
                </label>
              </div>
              
              <div class="form-control w-full md:col-span-2">
                <label class="label">
                  <span class="label-text">Google Analytics ID</span>
                </label>
                <input 
                  type="text" 
                  v-model="siteSettings.seo.googleAnalyticsId" 
                  class="input input-bordered w-full" 
                  placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX"
                />
                <label class="label">
                  <span class="label-text-alt text-base-content/60">Your Google Analytics tracking ID</span>
                </label>
              </div>
              
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-2">
                  <input 
                    type="checkbox" 
                    v-model="siteSettings.seo.sitemapEnabled" 
                    class="checkbox checkbox-primary" 
                  />
                  <span class="label-text">Generate Sitemap</span>
                </label>
              </div>
              
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-2">
                  <input 
                    type="checkbox" 
                    v-model="siteSettings.seo.robotsEnabled" 
                    class="checkbox checkbox-primary" 
                  />
                  <span class="label-text">Generate robots.txt</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Form Actions -->
        <div class="flex justify-end gap-2">
          <button 
            type="button" 
            class="btn btn-outline"
            @click="resetSettings"
          >
            Reset
          </button>
          <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="isSaving"
          >
            <span v-if="isSaving">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
            <span v-else>Save Settings</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Image Preview Modal -->
    <div class="modal" :class="{'modal-open': previewImageUrl !== null}">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">Image Preview</h3>
        <div class="flex justify-center">
          <img 
            v-if="previewImageUrl" 
            :src="previewImageUrl" 
            alt="Image preview" 
            class="max-h-64 object-contain"
            @error="imageLoadError = true"
          />
          <div v-else-if="imageLoadError" class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Failed to load image</span>
          </div>
        </div>
        <div class="modal-action">
          <button class="btn" @click="closeImagePreview">Close</button>
        </div>
      </div>
      <label class="modal-backdrop" @click="closeImagePreview"></label>
    </div>

    <!-- Success Notification -->
    <div 
      v-if="showSuccessNotif" 
      class="toast toast-end z-50"
    >
      <div class="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Settings saved successfully!</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import useSiteSettings from "../../compositions/useSiteSettings";

const { loading, error, settings: fetchedSettings, saveSettings: apiSaveSettings, getSettings } = useSiteSettings();

const siteSettings = reactive({
  general: {
    siteName: '',
    description: '',
    logoUrl: '',
    faviconUrl: ''
  },
  contact: {
    email: '',
    phone: '',
    address: ''
  },
  social: {
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  },
  appearance: {
    theme: 'light',
    primaryColor: '#6366F1',
    fontFamily: 'sans',
    customFont: ''
  },
  seo: {
    keywords: '',
    googleAnalyticsId: '',
    sitemapEnabled: true,
    robotsEnabled: true
  }
});

const originalSettings = ref(null);
const isSaving = ref(false);
const showSuccessNotif = ref(false);
const previewImageUrl = ref(null);
const imageLoadError = ref(false);

const fetchSettings = async () => {
  await getSettings();
  if (fetchedSettings.value) {
    // Deep copy the fetched settings to our reactive object
    Object.keys(fetchedSettings.value).forEach(key => {
      if (siteSettings[key]) {
        Object.keys(fetchedSettings.value[key]).forEach(subKey => {
          if (siteSettings[key][subKey] !== undefined) {
            siteSettings[key][subKey] = fetchedSettings.value[key][subKey];
          }
        });
      }
    });
    // Keep a copy of the original settings for the reset functionality
    originalSettings.value = JSON.parse(JSON.stringify(siteSettings));
  }
};

const saveSettings = async () => {
  isSaving.value = true;
  try {
    await apiSaveSettings(siteSettings);
    showSuccessNotif.value = true;
    setTimeout(() => {
      showSuccessNotif.value = false;
    }, 3000);
    // Update original settings after successful save
    originalSettings.value = JSON.parse(JSON.stringify(siteSettings));
  } catch (err) {
    console.error('Error saving settings:', err);
  } finally {
    isSaving.value = false;
  }
};

const resetSettings = () => {
  if (originalSettings.value) {
    // Reset to original values
    Object.keys(originalSettings.value).forEach(key => {
      if (siteSettings[key]) {
        Object.keys(originalSettings.value[key]).forEach(subKey => {
          if (siteSettings[key][subKey] !== undefined) {
            siteSettings[key][subKey] = originalSettings.value[key][subKey];
          }
        });
      }
    });
  }
};

const previewImage = (type) => {
  imageLoadError.value = false;
  if (type === 'logo') {
    previewImageUrl.value = siteSettings.general.logoUrl;
  } else if (type === 'favicon') {
    previewImageUrl.value = siteSettings.general.faviconUrl;
  }
};

const closeImagePreview = () => {
  previewImageUrl.value = null;
  imageLoadError.value = false;
};

onMounted(() => {
  fetchSettings();
});
</script>

<style scoped>
</style> 