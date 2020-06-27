<template>
  <el-row type="flex" justify="center">
    <el-col :span="6">
      <span v-if="isLoggedIn">
        You are already logged in. Click
        <router-link to="/?patient_id=bfe041fa-073b-4223-8c69-0540ee678ff8">here</router-link>to search to open a patient file
      </span>
      <el-card class="box-card" shadow="hover" style="width: 500px;" v-else>
        <div slot="header" class="clearfix">
          <span>Login to PatientFile</span>
        </div>
        <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px">
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">Submit</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { LOGIN_API_URL } from "@/const/others.js";
export default {
  data() {
    return {
      form: {
        password: "",
        email: ""
      },
      rules: {
        password: [{ required: true, trigger: "blur" }],
        email: [{ required: true, trigger: "blur" }]
      }
    };
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      try {
        const response = await fetch(LOGIN_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          body: JSON.stringify(this.form)
        });
        if (response.ok) {
          const json = await response.json();
          console.log(json);
          const { access_token, roleUUID, userUUID } = json;
          localStorage.setItem("token", access_token);
          this.$store.dispatch("getRoleDetails", roleUUID);
          // this.$store.commit("setUserRole", role);
          this.$router.push(
            "/?patient_id=bfe041fa-073b-4223-8c69-0540ee678ff8"
          );
          this.$store.commit("setUserId", userUUID);
        } else {
          this.$bvToast.toast("Authentication failed", {
            title: "Error",
            variant: "danger",
            solid: true,
            toaster: "b-toaster-top-center"
          });
        }
      } catch (ex) {
        console.log(ex.message);
      }
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          console.log(this.form);
          try {
            const response = await fetch(LOGIN_API_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=utf-8"
              },
              body: JSON.stringify(this.form)
            });
            if (response.ok) {
              const json = await response.json();
              const { access_token, roleUUID, userUUID } = json;
              localStorage.setItem("token", access_token);
              this.$store.dispatch("getRoleDetails", roleUUID);
              this.$router.push(
                "/?patient_id=bfe041fa-073b-4223-8c69-0540ee678ff8"
              );
              this.$store.commit("setUserId", userUUID);
            } else {
              this.$notify({
                title: "Error",
                message: "Authentication failed"
              });
            }
          } catch (ex) {
            console.log(ex.message);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  computed: {
    isLoggedIn() {
      const token = localStorage.getItem("token");
      if (token != null) {
        return true;
      }
      return false;
    }
  }
};
</script>