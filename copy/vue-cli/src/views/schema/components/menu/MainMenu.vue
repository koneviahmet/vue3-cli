<template>
    <div class="mb-6">
        <div class="flex flex-col sm:flex-row items-center">
            <div class="tabs tabs-boxed bg-base-200 p-1 flex-wrap justify-center mb-2 sm:mb-0">
                <router-link v-for="url in urlArr" :key="url.id"
                    :to="url.to"
                    class="tab tab-sm sm:tab-md transition-all duration-200"
                    :class="[route.fullPath == url.to ? 'tab-active bg-primary text-primary-content' : 'hover:bg-base-300']">
                    {{url.title}}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {useRoute} from "vue-router";
    import {ref} from 'vue';
    const route = useRoute();
    const urlArr = ref([
        {
            id: 1,
            to: "/schema",
            title: "Schema Home Page"
        },
        {
            id: 2,
            to: "/schema/create",
            title: "Schema Create"
        },
        {
            id: 3,
            to: "/schema/update/1",
            title: "Schema Update"
        },
        {
            id: 4,
            to: "/schema/list",
            title: "Schema List"
        },
        {
            id: 5,
            to: "/schema/detail/1",
            title: "Schema Detail"
        },
        {
            id: 6,
            to: "/schema/search",
            title: "schema Search"
        }
    ])
</script>

