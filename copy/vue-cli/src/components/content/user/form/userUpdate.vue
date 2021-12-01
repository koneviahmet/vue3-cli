<template>



  <div class="flex flex-col lg:flex-row w-full">
  <div class="grid flex-grow card">
    
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
        <label class="label">
          <span class="label-text">Name</span>
        </label> 
        <input type="text" placeholder="name" v-model="name" class="input input-bordered">
         <label class="label">
          <span class="label-text-alt text-red-400">{{errorName}}</span>
        </label>
      </div>       
      
      <div class="form-control">
        <label class="label">
          <span class="label-text">Last Name</span>
        </label> 
        <input type="text" placeholder="lastName" v-model="lastName" class="input input-bordered">
         <label class="label">
          <span class="label-text-alt text-red-400">{{errorLastName}}</span>
        </label>
      </div>       

      <div class="form-control">
        <label class="label">
          <span class="label-text">Email</span>
        </label> 
        <input type="text" placeholder="email" v-model="email" class="input input-bordered">
         <label class="label">
          <span class="label-text-alt text-red-400">{{errorEmail}}</span>
        </label>
      </div>     

      <div class="form-control">
        <label class="label">
          <span class="label-text">Password</span>
        </label> 
        <input type="text" placeholder="password" v-model="password" class="input input-bordered">
         <label class="label">
          <span class="label-text-alt text-red-400">{{errorPassword}}</span>
        </label>
      </div> 

      <div class="form-control mt-6">
          <a @click="update" class="btn btn-primary" :class="usersLoading && 'loading btn-disabled'">update</a>
      </div>
    </div>

    

  </div> 
  <div class="grid flex-grow  card justify-center items-center">
    content
  </div>
</div>


</template>


<script>
import useUserUpdate from "./userUpdateValidate";
import { useRouter, useRoute } from "vue-router";
import useUser from "../../../../compositions/useModelUser";

export default {
  setup() {
    const { validate, errors, values, email } = useUserUpdate();
    const router = useRouter();
    const route = useRoute();

    const { usersLoading, usersError, updateUser, getUser } = useUser();

    getUser({ id: route.params.id }).then((response) => {
      values.email = response.email;
      values.name = response.name;
      values.lastName = response.lastName;
      values.password = response.password;
    });

    const update = () => {
      validate()
        .then((validateSuccess) => {
          !validateSuccess.valid &&
            console.log("Check the form.", errors.value);
          if (validateSuccess.valid) {
            updateUser(route.params.id, { ...values }).then((response) => {
              router.push(`/user/detail/${response.id}`);
            });
          }
        })
        .catch((validateError) => {
          console.log(validateError);
        });
    };

    return {
      ...useUserUpdate(),
      update,
      usersLoading,
      usersError
    };
  },
};
</script>