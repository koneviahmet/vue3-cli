<template> 
  <div class="m-4">
    <form class="w-full max-w-sm">
      <div class="alert alert-error my-4" v-if="schemaError">
        <div class="flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">    
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>                      
          </svg> 
          <label>{{schemaError}}</label>
        </div>
      </div>

      <!--form-->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Schema Text</span>
          </label> 
          <input type="text" placeholder="schemaText" v-model="schemaText" class="input input-bordered">
          <label class="label">
            <span class="label-text-alt text-red-400">{{ errorSchemaText }}</span>
          </label>
        </div>
      <!--#form-->

      <!--add-->

      <div class="form-control mt-6">
        <a @click="update" class="btn btn-primary" :class="schemaLoading && 'loading btn-disabled'">update</a>
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
              console.log(values.schemaText);
          })


        const update = () => {
            validate().then(validateSuccess => {
                !validateSuccess.valid && console.log("formu kontrol ediniz.", errors.value) 
                if(validateSuccess.valid){
                    updateSchema({id:route.params.id,...values}).then(response => {
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
            schemaLoading,
            schemaError
        }
    }
}
</script>