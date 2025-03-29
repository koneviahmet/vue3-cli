<template>
  <div class="calendar-month-view">
    <!-- Days of week header -->
    <div class="grid grid-cols-7 mb-2">
      <div
        v-for="day in daysOfWeek"
        :key="day"
        class="py-2 text-center text-sm font-semibold text-gray-700"
      >
        {{ day }}
      </div>
    </div>

    <!-- Calendar grid -->
    <div class="grid grid-cols-7 gap-1">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        :class="[
          'calendar-day min-h-[100px] p-1 border rounded-md',
          day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
          isToday(day.date) ? 'border-primary' : 'border-gray-200',
          'cursor-pointer hover:border-primary hover:shadow-sm transition-all'
        ]"
        @click="$emit('date-click', day.date)"
      >
        <div class="flex justify-between items-center mb-1">
          <span
            :class="[
              'text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center',
              isToday(day.date) ? 'bg-primary text-white' : 'text-gray-700'
            ]"
          >
            {{ day.dayNumber }}
          </span>
          <span v-if="getEventsForDay(day.date).length" class="text-xs bg-gray-100 text-gray-700 px-1 rounded">
            {{ getEventsForDay(day.date).length }}
          </span>
        </div>
        
        <!-- Events for this day -->
        <div class="overflow-y-auto max-h-[70px] space-y-1">
          <div
            v-for="event in getEventsForDay(day.date).slice(0, 3)"
            :key="event.id"
            :style="{ backgroundColor: event.color + '20', borderLeft: `3px solid ${event.color}` }"
            class="text-xs p-1 rounded truncate cursor-pointer hover:shadow-sm"
            @click.stop="$emit('event-click', event)"
          >
            {{ event.title }}
          </div>
          
          <!-- Show indicator if there are more events -->
          <div 
            v-if="getEventsForDay(day.date).length > 3"
            class="text-xs text-gray-500 text-center"
          >
            +{{ getEventsForDay(day.date).length - 3 }} more
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentDate: {
    type: Date,
    required: true
  },
  events: {
    type: Array,
    default: () => []
  }
});

defineEmits(['event-click', 'date-click']);

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const calendarDays = computed(() => {
  const days = [];
  const date = new Date(props.currentDate.getFullYear(), props.currentDate.getMonth(), 1);
  
  // Get the first day of the month
  const firstDayOfMonth = date.getDay();
  
  // Get the last day of the month
  const lastDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  
  // Add days from previous month
  const daysFromPrevMonth = firstDayOfMonth;
  const prevMonth = new Date(date);
  prevMonth.setDate(0); // Last day of previous month
  let prevMonthLastDay = prevMonth.getDate();
  
  for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
    const dayDate = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonthLastDay - i);
    days.push({
      date: dayDate,
      dayNumber: prevMonthLastDay - i,
      isCurrentMonth: false
    });
  }
  
  // Add days from current month
  for (let i = 1; i <= lastDayOfMonth; i++) {
    const dayDate = new Date(date.getFullYear(), date.getMonth(), i);
    days.push({
      date: dayDate,
      dayNumber: i,
      isCurrentMonth: true
    });
  }
  
  // Add days from next month (to fill the 6 rows = 42 cells)
  const daysNeeded = 42 - days.length;
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  
  for (let i = 1; i <= daysNeeded; i++) {
    const dayDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i);
    days.push({
      date: dayDate,
      dayNumber: i,
      isCurrentMonth: false
    });
  }
  
  return days;
});

const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const getEventsForDay = (date) => {
  if (!props.events || !props.events.length) return [];
  
  return props.events.filter(event => {
    const eventDate = new Date(event.start);
    return (
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    );
  });
};
</script> 