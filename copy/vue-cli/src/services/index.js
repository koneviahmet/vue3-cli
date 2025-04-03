const currentService = import.meta.env.VITE_BACKEND; //json, pocketbase

const services = {
    json: {
        UsersServices: import("./json-services/UsersServices"),
        TasksServices: import("./json-services/TasksServices"),
        KanbanServices: import("./json-services/KanbanServices"),
        SiteSettingsServices: import("./json-services/SiteSettingsServices"),
        CalendarServices: import("./json-services/CalendarServices"),
        GlobalServices: import("./json-services/GlobalServices"),
    },
    pocketbase: {
        UsersServices: import("./pocketbase/UsersServices"),
        GlobalServices: import("./pocketbase/GlobalServices"),
    }
};

const selectedServices = services[currentService];
export { selectedServices as default };
