<template>
<div class="min-h-screen flex items-center justify-center">
  <div class="card w-96 bg-base-100 shadow-xl">
    <figure class="px-10 pt-10">
      <div class="flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title text-2xl">Oops! Erişim Engeli</h2>
      <p class="text-lg mb-4">Bu sayfaya girebilmek için özel güçlere sahip olman gerekiyor. Yoksa süper kahramanlık başvurun reddedildi mi?</p>
      <div class="card-actions">
        <router-link to="/" class="btn btn-primary">Ana Sayfaya Dön</router-link>
      </div>
    </div>
  </div>
</div>
</template>

