<template> 
  <div>
    <div class="alert alert-error shadow-lg my-4" v-if="contactsError">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mr-3 stroke-current">    
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>                      
        </svg> 
        <span>{{contactsError}}</span>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="w-full max-w-3xl mx-auto">
      <div class="animate-pulse space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="h-10 bg-base-300 dark:bg-neutral-700 rounded"></div>
          <div class="h-10 bg-base-300 dark:bg-neutral-700 rounded"></div>
        </div>
        <div class="h-10 bg-base-300 dark:bg-neutral-700 rounded"></div>
        <div class="h-32 bg-base-300 dark:bg-neutral-700 rounded"></div>
        <div class="h-10 bg-base-300 dark:bg-neutral-700 rounded"></div>
        <div class="flex justify-end space-x-2">
          <div class="h-10 w-24 bg-base-300 dark:bg-neutral-700 rounded"></div>
          <div class="h-10 w-32 bg-base-300 dark:bg-neutral-700 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Form -->
    <form v-else class="w-full max-w-3xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Name Input -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-medium text-base-content dark:text-neutral-content">Name</span>
            <span class="label-text-alt text-error" v-if="errorContact_name">*Required</span>
          </label> 
          <input 
            type="text" 
            placeholder="Enter name" 
            v-model="contact_name" 
            class="input input-bordered w-full focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-base-100 dark:bg-neutral-800 text-base-content dark:text-neutral-content"
          >
          <label class="label" v-if="errorContact_name">
            <span class="label-text-alt text-error flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {{ errorContact_name }}
            </span>
          </label>
        </div>

        <!-- Email Input -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-medium text-base-content dark:text-neutral-content">Email</span>
            <span class="label-text-alt text-error" v-if="errorContact_email">*Required</span>
          </label> 
          <input 
            type="email"
            placeholder="Enter email address" 
            v-model="contact_email" 
            class="input input-bordered w-full focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-base-100 dark:bg-neutral-800 text-base-content dark:text-neutral-content"
          >
          <label class="label" v-if="errorContact_email">
            <span class="label-text-alt text-error flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {{ errorContact_email }}
            </span>
          </label>
        </div>
      </div>

      <!-- Subject Input -->
      <div class="form-control mt-4">
        <label class="label">
          <span class="label-text font-medium text-base-content dark:text-neutral-content">Subject</span>
          <span class="label-text-alt text-error" v-if="errorContact_subject">*Required</span>
        </label> 
        <input 
          type="text"
          placeholder="Enter subject" 
          v-model="contact_subject" 
          class="input input-bordered w-full focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-base-100 dark:bg-neutral-800 text-base-content dark:text-neutral-content"
        >
        <label class="label" v-if="errorContact_subject">
          <span class="label-text-alt text-error flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {{ errorContact_subject }}
          </span>
        </label>
      </div>

      <!-- Message Input -->
      <div class="form-control mt-4">
        <label class="label">
          <span class="label-text font-medium text-base-content dark:text-neutral-content">Message</span>
          <span class="label-text-alt text-error" v-if="errorContact_message">*Required</span>
        </label> 
        <textarea
          placeholder="Enter message" 
          v-model="contact_message" 
          rows="6"
          class="textarea textarea-bordered w-full focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-base-100 dark:bg-neutral-800 text-base-content dark:text-neutral-content"
        ></textarea>
        <label class="label" v-if="errorContact_message">
          <span class="label-text-alt text-error flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {{ errorContact_message }}
          </span>
        </label>
      </div>

      <!-- Status Selection -->
      <div class="form-control mt-4">
        <label class="label">
          <span class="label-text font-medium text-base-content dark:text-neutral-content">Status</span>
          <span class="label-text-alt text-error" v-if="errorContact_status">*Required</span>
        </label> 
        <select 
          v-model="contact_status" 
          class="select select-bordered w-full focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-base-100 dark:bg-neutral-800 text-base-content dark:text-neutral-content"
        >
          <option value="new">New</option>
          <option value="processed">Processed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <label class="label" v-if="errorContact_status">
          <span class="label-text-alt text-error flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {{ errorContact_status }}
          </span>
        </label>
      </div>

      <!-- Hidden date fields that will be auto-filled -->
      <input type="hidden" v-model="created">
      <input type="hidden" v-model="updated">

      <!-- Submit button -->
      <div class="flex justify-end gap-2 mt-8">
        <router-link :to="`/contacts/detail/${route?.params.id}`" class="btn btn-ghost">
          Cancel
        </router-link>
        <button 
          type="button" 
          @click="update" 
          class="btn btn-primary gap-2" 
          :class="contactsLoading && 'loading btn-disabled'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="!contactsLoading">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Update Contact
        </button>
      </div>
    </form>   
  </div>   
</template>



<script>

import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from 'vue';
import useUpdate from './updateValidate';
import useContacts from '../../../../compositions/useModelContacts';

export default {
    setup(){ 
        const route = useRoute();
        const {validate, errors, values, setValues} = useUpdate();
        const router = useRouter();
        const {loading: contactsLoading, error: contactsError, updateItem: updateContacts, getItem: getContacts, data: contactsData} = useContacts();
        
        onMounted(() => {
            getContacts({ id: route.params.id })
            .then(response => {
                setValues({contact_name:response.contact_name})
                setValues({contact_email:response.contact_email})
                setValues({contact_subject:response.contact_subject})
                setValues({contact_message:response.contact_message})
                setValues({contact_status:response.contact_status})
                setValues({created:response.created})
                setValues({updated:response.updated})
            })
            .catch(error => console.log(error))
        })
       
        const update = () => {
            validate().then(validateSuccess => {
                !validateSuccess.valid && console.log("Check the form.", errors.value) 
                if(validateSuccess.valid){
                    updateContacts({id: route.params.id, ...values}).then(response => {
                        router.push(`/contacts/detail/${response.id}`)
                    })
                }
            }).catch(validateError => {
                console.log(validateError);
            }) 
        }

        return {
            ...useUpdate(),
            update,
            contactsLoading,
            contactsError,
            route,
            loading: contactsLoading,
        }
    }
}
</script>


