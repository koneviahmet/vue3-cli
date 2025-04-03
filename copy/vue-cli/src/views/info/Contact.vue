<template>
  <div class="container mx-auto px-4 py-12">
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <div class="bg-primary/10 p-6 border-b border-primary/20">
        <h1 class="text-3xl font-bold text-primary">İletişim</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Bizimle iletişime geçmek için formu doldurun veya iletişim bilgilerimizi kullanın.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <!-- Contact Form Section -->
        <div class="lg:col-span-7 p-6 lg:p-8 order-2 lg:order-1">
          <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Bize Ulaşın</h2>
          <Contact />
        </div>

        <!-- Contact Information Section -->
        <div class="lg:col-span-5 bg-base-50 dark:bg-gray-750 p-6 lg:p-8 order-1 lg:order-2 border-b lg:border-b-0 lg:border-l border-gray-200 dark:border-gray-700">
          <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">İletişim Bilgilerimiz</h2>
          
          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="bg-primary rounded-full p-3 text-white flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-lg text-gray-800 dark:text-white">E-posta</h3>
                <a href="mailto:info@example.com" class="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">info@example.com</a>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <div class="bg-primary rounded-full p-3 text-white flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-lg text-gray-800 dark:text-white">Telefon</h3>
                <a href="tel:+905551234567" class="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">+90 (555) 123 4567</a>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <div class="bg-primary rounded-full p-3 text-white flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-lg text-gray-800 dark:text-white">Adres</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Atatürk Cad. No:123<br>
                  Ankara, Türkiye
                </p>
              </div>
            </div>
            
            <div class="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
              <h3 class="font-semibold text-lg text-gray-800 dark:text-white mb-4">Çalışma Saatleri</h3>
              <div class="space-y-2 text-gray-600 dark:text-gray-300">
                <div class="flex justify-between">
                  <span>Pazartesi - Cuma:</span>
                  <span class="font-medium">09:00 - 18:00</span>
                </div>
                <div class="flex justify-between">
                  <span>Cumartesi:</span>
                  <span class="font-medium">10:00 - 14:00</span>
                </div>
                <div class="flex justify-between">
                  <span>Pazar:</span>
                  <span class="font-medium">Kapalı</span>
                </div>
              </div>
            </div>
            
            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 class="font-semibold text-lg text-gray-800 dark:text-white mb-4">Bizi Takip Edin</h3>
              <div class="flex space-x-4">
                <a href="#" class="btn btn-circle btn-sm btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" class="btn btn-circle btn-sm btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" class="btn btn-circle btn-sm btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="#" class="btn btn-circle btn-sm btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Contact from '../contacts/components/form/create.vue'

</script>

<style scoped>
/* Additional styles if needed */
</style> 