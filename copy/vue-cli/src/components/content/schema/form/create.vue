<template> 
  <div class="m-4">
    
    <form class="w-full max-w-sm">
      <!--form-->
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name1">
            Schema Text
          </label>
        </div>
        <div class="md:w-2/3">
          <input class="appearance-none border-2  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="schemaText" v-model="schemaText">
          <p class="text-red-500 text-xs">{{errorSchemaText}}</p>
        </div>
      </div>
      <!--#form--> 


    </form>    
  </div>   
</template>

