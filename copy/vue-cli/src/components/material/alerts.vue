<template>
  <div v-if="model == 'basic'" :class="getClass" role="alert">
    <slot></slot>
  </div>

  <div v-if="model == 'icon'" :class="getClass" role="alert">
    <svg
      class="w-5 h-5 inline mr-3"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clip-rule="evenodd"
      ></path>
    </svg>
    <div>
      <slot></slot>
    </div>
  </div>

  <div v-if="model == 'basic_close' && aShow" :class="getClass" role="alert">
    <svg
      class="w-5 h-5 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clip-rule="evenodd"
      ></path>
    </svg>
    <div class="ml-3 text-sm font-medium">
      <slot />
    </div>
    <button
      @click="setShow"
      type="button"
      class="
        ml-auto
        -mx-1.5
        -my-1.5
        text-blue-500
        rounded-lg
        focus:ring-2 focus:ring-blue-400
        p-1.5
        hover:bg-blue-200
        inline-flex
        h-8
        w-8
      "
    >
      <svg
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  </div>
</template>



<script>
import { computed, ref, watch } from "vue";

export default {
  props: {
    color: {
      type: String,
      default: "gray",
    },
    size: {
      type: String,
      default: "base",
    },
    type: {
      type: String,
      default: "fill",
    },
    model: {
      type: String,
      default: "basic_close",
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const aShow = ref(props.show);

    watch(
      () => props.show,
      (first, last) => {
        if (first) aShow.value = true;
      }
    );

    const colorArr = {
      basic: {
        gray: {
          fill: "bg-gray-100 rounded-lg  text-gray-700",
          outline: "bg-gray-100 rounded-lg  text-gray-700",
        },
        red: {
          fill: "bg-red-100 rounded-lg  text-red-700",
          outline: "bg-white border-2 border-red-100 rounded-lg  text-red-500",
        },
        yellow: {
          fill: "bg-yellow-100 rounded-lg  text-yellow-700",
          outline:
            "bg-white border-2 border-yellow-100 rounded-lg  text-yellow-500",
        },
        green: {
          fill: "bg-green-100 rounded-lg  text-green-700",
          outline:
            "bg-white border-2 border-green-100 rounded-lg  text-green-500",
        },
        blue: {
          fill: "bg-blue-100 rounded-lg  text-blue-700",
          outline:
            "bg-white border-2 border-blue-100 rounded-lg  text-blue-500",
        },
        indigo: {
          fill: "bg-indigo-100 rounded-lg  text-indigo-700",
          outline:
            "bg-white border-2 border-indigo-100 rounded-lg  text-indigo-500",
        },
        purple: {
          fill: "bg-purple-100 rounded-lg  text-purple-700",
          outline:
            "bg-white border-2 border-purple-100 rounded-lg  text-purple-500",
        },
        pink: {
          fill: "bg-pink-100 rounded-lg  text-pink-700",
          outline:
            "bg-white border-2 border-pink-100 rounded-lg  text-pink-500",
        },
      },
      icon: {
        gray: {
          fill: "flex bg-gray-100 rounded-lg text-gray-700",
          outline: "flex border-2 border-gray-100 rounded-lg text-gray-700",
        },
        red: {
          fill: "flex bg-red-100 rounded-lg text-red-700",
          outline: "flex border-2 border-red-100 rounded-lg text-red-700",
        },
        yellow: {
          fill: "flex bg-yellow-100 rounded-lg text-yellow-700",
          outline: "flex border-2 border-yellow-100 rounded-lg text-yellow-700",
        },
        green: {
          fill: "flex bg-green-100 rounded-lg text-green-700",
          outline: "flex border-2 border-green-100 rounded-lg text-green-700",
        },
        blue: {
          fill: "flex bg-blue-100 rounded-lg text-blue-700",
          outline: "flex border-2 border-blue-100 rounded-lg text-blue-700",
        },
        indigo: {
          fill: "flex bg-indigo-100 rounded-lg text-indigo-700",
          outline: "flex border-2 border-indigo-100 rounded-lg text-indigo-700",
        },
        purple: {
          fill: "flex bg-purple-100 rounded-lg text-purple-700",
          outline: "flex border-2 border-purple-100 rounded-lg text-purple-700",
        },
        pink: {
          fill: "flex bg-pink-100 rounded-lg text-pink-700",
          outline: "flex border-2 border-pink-100 rounded-lg text-pink-700",
        },
      },
      basic_close: {
        gray: {
          fill: "flex bg-gray-100 rounded-lg text-gray-700",
          outline: "flex border-2 border-gray-100 rounded-lg text-gray-700",
        },
        red: {
          fill: "flex bg-red-100 rounded-lg text-red-700",
          outline: "flex border-2 border-red-100 rounded-lg text-red-700",
        },
        yellow: {
          fill: "flex bg-yellow-100 rounded-lg text-yellow-700",
          outline: "flex border-2 border-yellow-100 rounded-lg text-yellow-700",
        },
        green: {
          fill: "flex bg-green-100 rounded-lg text-green-700",
          outline: "flex border-2 border-green-100 rounded-lg text-green-700",
        },
        blue: {
          fill: "flex bg-blue-100 rounded-lg text-blue-700",
          outline: "flex border-2 border-blue-100 rounded-lg text-blue-700",
        },
        indigo: {
          fill: "flex bg-indigo-100 rounded-lg text-indigo-700",
          outline: "flex border-2 border-indigo-100 rounded-lg text-indigo-700",
        },
        purple: {
          fill: "flex bg-purple-100 rounded-lg text-purple-700",
          outline: "flex border-2 border-purple-100 rounded-lg text-purple-700",
        },
        pink: {
          fill: "flex bg-pink-100 rounded-lg text-pink-700",
          outline: "flex border-2 border-pink-100 rounded-lg text-pink-700",
        },
      },
    };

    const sizeArr = {
      xs: "p-4 mb-4 text-sm",
      sm: "p-4 mb-4 text-sm",
      base: "p-4 mb-4 text-sm",
      lg: "p-4 mb-4 text-sm",
      xl: "p-4 mb-4 text-sm",
      "2xl": "p-4 mb-4 text-sm",
    };

    const getClass = computed(() => {
      return (
        colorArr[props.model][props.color][props.type] +
        " " +
        sizeArr[props.size]
      );
    });

    const setShow = () => {
      aShow.value = false;
    };

    return {
      aShow,
      getClass,
      setShow,
    };
  },
};
</script>