<template> 
  <div class="m-4">
    <form class="w-full max-w-sm">
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name1">
            Schema Text
          </label>
        </div>
        <div class="md:w-2/3">
          <input class="appearance-none border-2  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Schema Text" v-model="schemaText">
          <p class="text-red-500 text-xs">{{errorSchemaText}}</p>
        </div>
      </div>



      <div class="md:flex md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
            <button @click="update" class="shadow mr-3 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Update
            </button>
        </div>
      </div>
    </form>    
  </div>   
</template>


<script>

import useUpdate from './updateValidate';
import { useRouter, useRoute } from "vue-router";
import useSchema from '../../../../compositions/useModelSchema'


export default {
    setup(){ 
        const {validate, errors, values} = useUpdate();
        const router = useRouter();
        const route = useRoute();

        const {schemaLoading, schemaError, updateSchema, getSchema} = useSchema();

        getSchema({id:route.params.id})
          .then(response => {
              values.schemaText = response.schemaText
          })


        const update = () => {
            validate().then(validateSuccess => {
                !validateSuccess.valid && console.log("formu kontrol ediniz.", errors.value) 
                if(validateSuccess.valid){
                    updateSchema(route.params.id, {...values}).then(response => {
                        router.push(`/schema/detail/${response.id}`)
                    })
                }
            }).catch(validateError => {
                console.log(validateError);
            }) 
        }

        return {
            ...useUpdate(),
            update,
        }
    }
}
</script>