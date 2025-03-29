<template>
  <div class="calendar-day-view">
    <!-- Day header -->
    <div class="flex justify-center items-center mb-4">
      <div :class="['text-center', isToday(currentDate) ? 'text-primary' : 'text-gray-800']">
        <div class="text-sm font-medium">
          {{ formatDayName(currentDate) }}
        </div>
        <div :class="['rounded-full w-10 h-10 mx-auto flex items-center justify-center text-lg font-semibold', isToday(currentDate) ? 'bg-primary text-white' : '']">
          {{ formatDayNumber(currentDate) }}
        </div>
      </div>
    </div>

    <!-- Day grid -->
    <div class="grid grid-cols-1 border-t border-gray-200">
      <div v-for="hour in hours" :key="hour" class="flex border-b border-gray-200">
        <div class="w-16 py-2 pr-2 text-right text-xs text-gray-500">
          {{ hour }}:00
        </div>
        <div class="flex-1 h-16 relative"></div>
      </div>
      
      <!-- Events -->
      <div class="absolute inset-x-0 mt-16 pt-2 pointer-events-none" style="margin-left: 64px;">
        <div v-for="event in dayEvents" :key="event.id" 
          :style="{
            backgroundColor: event.color + '20',
            borderLeft: `3px solid ${event.color}`,
            top: `${getEventPosition(event)}px`,
            height: '30px'
          }" 
          class="absolute w-[95%] mx-auto left-0 right-0 text-xs p-1 mb-1 truncate rounded shadow-sm pointer-events-auto cursor-pointer"
          @click="$emit('event-click', event)">
          {{ event.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentDate: { type: Date, required: true },
  events: { type: Array, default: () => [] }
});

defineEmits(['event-click']);

const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8am to 7pm

const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

const formatDayName = (date) => {
  const options = { weekday: 'long' };
  return date.toLocaleDateString(undefined, options);
};

const formatDayNumber = (date) => {
  return date.getDate();
};

const dayEvents = computed(() => {
  if (!props.events || !props.events.length) return [];
  
  return props.events.filter(event => {
    const eventDate = new Date(event.start);
    return (
      eventDate.getDate() === props.currentDate.getDate() &&
      eventDate.getMonth() === props.currentDate.getMonth() &&
      eventDate.getFullYear() === props.currentDate.getFullYear()
    );
  });
});

const getEventPosition = (event) => {
  const eventDate = new Date(event.start);
  const eventHour = eventDate.getHours();
  const eventMinute = eventDate.getMinutes();
  
  // Calculate position based on hours (each hour block is 64px)
  const hourOffset = (eventHour - 8) * 64;
  const minuteOffset = (eventMinute / 60) * 64;
  
  return hourOffset + minuteOffset;
};
</script> 