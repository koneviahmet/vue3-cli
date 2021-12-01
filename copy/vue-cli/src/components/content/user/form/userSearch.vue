<template>
    {{ usersData }}

    <div class="p-10">
      <div class="alert alert-error my-4" v-if="usersError">
        <div class="flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">    
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>                      
          </svg> 
          <label>{{usersError}}</label>
        </div>
      </div>

      <div class="form-control">
        <input type="text" placeholder="searchText" v-model="searchText" class="input input-bordered">
         <label class="label">
          <span class="label-text-alt text-red-400">{{errorSearchText}}</span>
        </label>
      </div> 

      <div class="form-control mt-6">
          <a @click="search" class="btn btn-primary" :class="usersLoading && 'loading btn-disabled'">search</a>
      </div>
    </div>


</template>


<script>
import useUserSearch from "./userSearchValidate";
import { useRouter, useRoute } from "vue-router";
import useUser from "../../../../compositions/useModelUser";

export default {
  setup() {
    const { validate, errors, values } = useUserSearch();
    const router = useRouter();
    const route = useRoute();

    const { usersLoading, usersError, searchUsers, usersData } = useUser();

    const search = () => {
      validate()
        .then((validateSuccess) => {
          !validateSuccess.valid && console.log("Check the form.");

          if (validateSuccess.valid) {
            searchUsers({ id: 1 });
          }
        })
        .catch((validateError) => {
          console.log(validateError);
        });
    };

    return {
      ...useUserSearch(),
      search,
      usersData,
      usersLoading,
      usersError
    };
  },
};
</script>