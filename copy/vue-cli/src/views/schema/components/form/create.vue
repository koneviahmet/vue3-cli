<template> 
  <div>
    <form class="w-full max-w-md mx-auto">
      <div class="alert alert-error shadow-lg my-4" v-if="schemaError">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mr-3 stroke-current">    
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>                      
          </svg> 
          <span>{{schemaError}}</span>
        </div>
      </div>

      <!--form-->
      <div class="form-control">
        <label class="label">
          <span class="label-text font-medium">Schema Text</span>
        </label> 
        <input 
          type="text" 
          placeholder="Enter schema text" 
          v-model="schemaText" 
          class="input input-bordered w-full focus:ring-2 focus:ring-primary/20 transition-all duration-200"
        >
        <label class="label" v-if="errorSchemaText">
          <span class="label-text-alt text-error flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {{ errorSchemaText }}
          </span>
        </label>
      </div>
      <!--#form-->

      <!--add-->

      <div class="form-control mt-6">
        <button 
          type="button" 
          @click="save" 
          class="btn btn-primary w-full gap-2" 
          :class="schemaLoading && 'loading btn-disabled'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="!schemaLoading">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Save Schema
        </button>
      </div>
    </form>    
  </div>   
</template>


<script>

import useCreate from './createValidate';
import { useRouter } from "vue-router";
import useSchema from '../../../../compositions/useModelSchema'
import { onMounted } from "vue";

export default {
    setup(){ 
        const {validate, errors, values, setValues} = useCreate();
        const router = useRouter();
        const {loading: schemaLoading, error: schemaError, addItem: addSchema} = useSchema();
       
        onMounted(() => {
          const now = new Date().toISOString();
          setValues({author_created_at:now})
          setValues({author_updated_at:now})
        })


        const save = () => {
            validate().then(validateSuccess => {
                !validateSuccess.valid && console.log("Check the form.", errors.value) 
                if(validateSuccess.valid){
                    addSchema({...values}).then(response => {
                        router.push(`/schema/detail/${response.id}`)
                    })
                }
            }).catch(validateError => {
                console.log(validateError);
            }) 
        }

        return {
            ...useCreate(),
            save,
            schemaLoading,
            schemaError
        }
    }
}
</script>