<template>
  <div class="bg-base-100 rounded-lg  p-0">
    <div class="p-6">
      <div class="alert alert-error mb-6" v-if="usersError">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ usersError }}</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div class="grid grid-cols-1 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium ">First Name</span>
              </label> 
              <input type="text" placeholder="First name" v-model="name" class="input input-bordered ">
              <label class="label" v-if="errorName">
                <span class="label-text-alt text-error">{{ errorName }}</span>
              </label>
            </div>       
            
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium ">Last Name</span>
              </label> 
              <input type="text" placeholder="Last name" v-model="lastName" class="input input-bordered ">
              <label class="label" v-if="errorLastName">
                <span class="label-text-alt text-error">{{ errorLastName }}</span>
              </label>
            </div>       

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium ">Email</span>
              </label> 
              <input type="email" placeholder="Email address" v-model="email" class="input input-bordered ">
              <label class="label" v-if="errorEmail">
                <span class="label-text-alt text-error">{{ errorEmail }}</span>
              </label>
            </div>     

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium ">Password</span>
              </label> 
              <input type="password" placeholder="Change password (leave empty to keep current)" v-model="password" class="input input-bordered ">
              <label class="label" v-if="errorPassword">
                <span class="label-text-alt text-error">{{ errorPassword }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class=" p-6 rounded-lg">
          <h3 class="text-lg font-medium  mb-4">Account Information</h3>
          <div class="flex items-start mb-6">
            <div class="flex-shrink-0 h-16 w-16  rounded-full flex items-center justify-center  text-xl font-bold">
              {{ name ? name.charAt(0).toUpperCase() : '' }}{{ lastName ? lastName.charAt(0).toUpperCase() : '' }}
            </div>
            <div class="ml-4">
              <p class=" text-sm mb-1">Profile photo</p>
              <button class="btn btn-sm btn-outline">Change photo</button>
            </div>
          </div>
          
          <div class="divider"></div>
          
          <div class="form-control">
            <label class="cursor-pointer label justify-start gap-2">
              <input type="checkbox" checked class="checkbox checkbox-sm checkbox-primary">
              <span class="label-text">Receive email notifications</span>
            </label>
          </div>
          <div class="form-control mt-2">
            <label class="cursor-pointer label justify-start gap-2">
              <input type="checkbox" checked class="checkbox checkbox-sm checkbox-primary">
              <span class="label-text">Two-factor authentication</span>
            </label>
          </div>
        </div>
      </div>

      <div class="flex justify-between mt-8">
        <button class="btn btn-outline">Cancel</button>
        <button @click="update" class="btn btn-primary" :class="usersLoading && 'loading btn-disabled'">
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import useUserUpdate from "./userUpdateValidate";
import { useRouter, useRoute } from "vue-router";
import useUser from "../../../../compositions/useModelUser";

export default {
  setup() {
    const { validate, errors, values, setValues } = useUserUpdate();
    const router = useRouter();
    const route = useRoute();

    const { usersLoading, usersError, updateUser, getUser } = useUser();

    getUser({ id: route.params.id }).then((response) => {
      setValues({
        email: response.email,
        name: response.name,
        lastName: response.lastName,
        password: response.password,
      });
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