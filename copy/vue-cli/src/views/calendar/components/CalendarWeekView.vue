<template>
  <div class="calendar-week-view">
    <!-- Time header -->
    <div class="grid grid-cols-8 mb-2">
      <div class="py-2 text-sm text-gray-500 text-right pr-2">Time</div>
      <div v-for="(day, index) in weekDays" :key="index" class="py-2 text-center">
        <div :class="['text-sm font-semibold', isToday(day.date) ? 'text-primary' : 'text-gray-700']">
          {{ day.name }}
        </div>
        <div :class="['rounded-full w-7 h-7 mx-auto flex items-center justify-center', isToday(day.date) ? 'bg-primary text-white' : 'text-gray-600']">
          {{ day.number }}
        </div>
      </div>
    </div>

    <!-- Weekly grid -->
    <div class="grid grid-cols-8 border-t border-gray-200">
      <!-- Time slots -->
      <div class="border-r border-gray-200">
        <div v-for="hour in hours" :key="hour" class="h-16 border-b border-gray-200 pr-2 text-right text-xs text-gray-500 relative">
          <span class="absolute -top-2 right-2">{{ hour }}:00</span>
        </div>
      </div>
      
      <!-- Day columns -->
      <div v-for="(day, dayIndex) in weekDays" :key="dayIndex" class="border-r border-gray-200 relative">
        <div v-for="hour in hours" :key="hour" class="h-16 border-b border-gray-200"></div>
        
        <!-- Events for this day -->
        <div class="absolute inset-0 p-1 pointer-events-none">
          <div v-for="event in getEventsForDay(day.date)" :key="event.id" 
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

const weekDays = computed(() => {
  const days = [];
  const date = new Date(props.currentDate);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Set to the start of the week (Sunday)
  const currentDay = date.getDay();
  date.setDate(date.getDate() - currentDay);
  
  // Generate 7 days of the week
  for (let i = 0; i < 7; i++) {
    const weekDate = new Date(date);
    weekDate.setDate(date.getDate() + i);
    
    days.push({
      date: weekDate,
      name: dayNames[i],
      number: weekDate.getDate()
    });
  }
  
  return days;
});

const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

const getEventsForDay = (date) => {
  if (!props.events || !props.events.length) return [];
  
  return props.events.filter(event => {
    const eventDate = new Date(event.start);
    return eventDate.getDate() === date.getDate() && eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear();
  });
};

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