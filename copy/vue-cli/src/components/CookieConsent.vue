<template>
  <div
    v-if="showConsent"
    class="fixed bottom-0 left-0 right-0 bg-base-200 shadow-lg p-4 z-50 border-t border-base-300 transform transition-transform duration-300"
    :class="{ 'translate-y-0': showConsent, 'translate-y-full': !showConsent }"
  >
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex-1">
        <p class="text-base-content">
          Bu web sitesi, size daha iyi bir deneyim sunmak için çerezleri kullanmaktadır. Sitemizi kullanmaya devam ederek, çerez politikamızı kabul etmiş olursunuz.
          <router-link to="/cookie-policy" class="link link-primary">Çerez Politikası</router-link> sayfasından daha fazla bilgi alabilirsiniz.
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          @click="acceptCookies"
          class="btn btn-primary btn-sm"
        >
          Kabul Et
        </button>
        <button
          @click="declineCookies"
          class="btn btn-outline btn-sm"
        >
          Reddet
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showConsent = ref(false);

const acceptCookies = () => {
  localStorage.setItem('cookie-consent', 'accepted');
  showConsent.value = false;
};

const declineCookies = () => {
  localStorage.setItem('cookie-consent', 'declined');
  showConsent.value = false;
};

onMounted(() => {
  // Check if user has already made a choice
  const consentChoice = localStorage.getItem('cookie-consent');
  
  // If no choice has been made, show the consent popup after a short delay
  if (!consentChoice) {
    setTimeout(() => {
      showConsent.value = true;
    }, 1000);
  }
});
</script> 