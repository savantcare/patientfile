// The module.exports is a special object which is included in every JS file in the Node. js application by default
module.exports = {
  // API urls
  RECOMMENDATION_API_URL: "http://localhost:8000/recommendations",
  DIAGNOSIS_API_URL: "http://localhost:8000/diagnosis",
  REMINDER_API_URL: "http://localhost:8000/reminders",
  GOAL_API_URL: "http://localhost:8000/goals",
  SETTING_API_URL: "http://localhost:8000/settings",
  LOGIN_API_URL: "http://localhost:8000/auth/login",
  ROLE_API_URL: "http://localhost:8000/user-roles",
  SOCKET_API_URL: "http://localhost:8000",
  USER_API_URL: "http://localhost:8000/users",
  COMPONENT_API_URL: "http://localhost:8000/components",
  SOCIALHISTORY_API_URL: "http://localhost:8000/social-histories",
  FAMILY_HISTORY_API_URL: "http://localhost:8000/family-histories",
  APPOINTMENT_API_URL: "http://localhost:8000/appointments",
  SCREENING_API_URL: "http://localhost:8000/screening",
  BODY_MEASUREMENT_API_URL: "http://localhost:8000/body-measurements",

  STATE_AT_SELECTED_TIME_COMPONENTS: [
  ],

  // Tab constant values.
  ADD_RECOMMENDATION: 1,
  CHANGE_RECOMMENDATION: 2,
  MULTIPLE_CHANGE_RECOMMENDATION: 3,
  ADD_REMINDER: 4,
  CHANGE_REMINDER: 5,
  MULTIPLE_CHANGE_REMINDER: 6,
  SOCIAL_HISTORY: 7,
  ADD_DIAGNOSIS: 8,
  MULTIPLE_CHANGE_ASSESSMENT: 9,
  ADD_SERVICE_STATEMENTS: 10,
  MULTIPLE_CHANGE_SERVICE_STATEMENTS: 11,
  ADD_GOAL: 12,
  RATE_GOAL: 13,
  MULTIPLE_RATE_GOAL: 14,
  ADD_SCREEN: 15,
  TAKE_A_SCREEN: 16,
  CHANGE_DIAGNOSIS: 17,
  RECOMMENDATION_DISCONTINUE_HISTORY: 18
}