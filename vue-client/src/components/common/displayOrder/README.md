Used to decide the display order of the components

The following tables will be maintained on the client side by vuex-orm

allComponents
-- componentUUID
-- componentName
-- componentTag

userRoles
-- roleUUID
-- componentsAllowedToAccess
-- displayOrderInMultiStateSide
-- displayOrderInCurrentStateSide

in patient-file.vue the query will be:

user.roleUUID == userRoles.roleUUID
displayOrderInMultiStateSide
displayOrderInCurrentStateSide

then for loop of displayOrderInMultiStateSide
patientFile.vue:133
<component
          v-for="(component, index) in cfGetMultiStateDisplayAreaCts"
          :key="`multi-state-display-area-component-${index}`"
          :is="component.value"
          v-bind="{typeOfStateDisplayArea: 'multiStateDisplayArea'}"
        ></component>

and for loop of displayOrderInCurrentStateSide
patientFile.vue:143
<component
              v-for="(component, index) in cfGetCurrentStateDisplayAreaCts"
              :key="`current-state-display-area-component-${index}`"
              :is="component.value"
            ></component>
