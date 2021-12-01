<template>
    <div class="hero min-h-screen bg-base-200">
      <div class="flex-col hero-content lg:flex-row-reverse">
        <img src="https://picsum.photos/id/1005/600/600" class="max-w-sm rounded-lg shadow-2xl"> 
        <div>
          <lottie-animation
              :animationData="animJson"
            />

          <h1 class="mb-5 text-5xl font-bold">
                Hello there
              </h1> 
          <p class="mb-5">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
              </p> 
          <router-link to="/user/signIn" class="btn btn-primary">Get Started</router-link>
        </div>
      </div>
    </div>

    <div class="bg-primary w-full p-24">
    <div class="mockup-window bg-base-300">
    <div class="flex justify-center px-4 py-16 bg-base-200">
      <div class="flex space-x-2 ">
        <button class="btn">neutral</button> 
        <button class="btn btn-primary">primary</button> 
        <button class="btn btn-secondary">secondary</button> 
        <button class="btn btn-accent">accent</button> 
        <button class="btn btn-ghost">ghost</button> 
        <button class="btn btn-link">link</button>
      </div>        
    </div>
    </div>
  </div>
</template>


<script setup>
//80701-science-in-blue
</script>