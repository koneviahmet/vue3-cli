<template>
  <div class="rounded-lg">
    <div class="p-6">
      <div class="alert alert-error mb-6" v-if="usersError">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ usersError }}</span>
      </div>

      <div class="flex flex-col md:flex-row gap-4">
        <div class="form-control flex-grow">
          <label class="label">
            <span class="label-text font-medium ">Search Users</span>
          </label>
          <div class="relative">
            <input 
              type="text" 
              placeholder="Search by name, email or other details" 
              v-model="searchText" 
              class="input input-bordered w-full pl-10 bg-base-50"
            >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 " viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
          <label class="label" v-if="errorSearchText">
            <span class="label-text-alt text-error">{{ errorSearchText }}</span>
          </label>
        </div>
        
        <div class="mt-6 md:mt-8">
          <button 
            @click="search" 
            class="btn btn-primary" 
            :class="usersLoading && 'loading btn-disabled'"
          >
            Search
          </button>
        </div>
      </div>

      <!-- Results section -->
      <div v-if="usersData && usersData.length > 0" class="mt-8">
        <h3 class="text-lg font-medium  mb-4">Search Results</h3>
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead class="bg-base-100">
              <tr>
                <th class="py-3 px-4 text-left text-xs font-medium  uppercase tracking-wider">ID</th>
                <th class="py-3 px-4 text-left text-xs font-medium  uppercase tracking-wider">Name</th>
                <th class="py-3 px-4 text-left text-xs font-medium  uppercase tracking-wider">Email</th>
                <th class="py-3 px-4 text-right text-xs font-medium  uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-base-300 bg-base-100">
              <tr v-for="user in usersData" :key="user.id" class="hover:bg-base-50">
                <td class="py-4 px-4">{{ user.id }}</td>
                <td class="py-4 px-4">{{ user.name }} {{ user.lastName }}</td>
                <td class="py-4 px-4 ">{{ user.email }}</td>
                <td class="py-4 px-4 text-right space-x-1">
                  <router-link :to="`/user/detail/${user.id}`" class="btn btn-sm btn-primary">
                    View
                  </router-link>
                  <router-link :to="`/user/update/${user.id}`" class="btn btn-sm btn-secondary">
                    Edit
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div v-else-if="usersData && usersData.length === 0 && !usersLoading" class="mt-8 text-center py-12 bg-base-50 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto  mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-lg font-medium ">No users found</p>
        <p class=" mt-1">Try adjusting your search criteria</p>
      </div>
    </div>
  </div>
</template>

<script>
import useUserSearch from "./userSearchValidate";
import { useRouter, useRoute } from "vue-router";
import useUser from "../../../../compositions/useModelUser";

export default {
  setup() {
    const { validate, errors, values, setValues } = useUserSearch();
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