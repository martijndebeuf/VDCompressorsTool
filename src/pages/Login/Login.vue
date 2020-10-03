<template>
  <v-app>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="7" class="main-part d-none d-md-none d-lg-flex">
          <div class="d-flex">
            <v-img src="@/assets/VDCompLogo.png" contain></v-img>
          </div>
        </v-col>
        <v-col cols="12" lg="5" class="login-part d-flex align-center justify-center">
          <v-row no-gutters>
            <v-col cols="12" class="login-part d-flex align-center justify-center flex-column">
              <div class="login-wrapper">
                <v-tabs grow>
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab :href="`#tab-login`">
                    LOGIN
                  </v-tab>
                  <v-tab :href="`#tab-newUser`">
                    Registreren
                  </v-tab>

                  <v-tab-item :value="'tab-login'" >
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">
                          <v-col>
                            <p class="login-slogan display-1 text-center font-weight-medium my-10">Welcome Back!</p>
                          </v-col>
                          <v-form>
                            <v-col>
                              <v-text-field
                                  v-model="email"
                                  :rules="emailRules"
                                  value="email"
                                  label="Email Adres"
                                  required
                              ></v-text-field>
                              <v-text-field
                                  v-model="password"
                                  :rules="passRules"
                                  type="password"
                                  label="Wachtwoord"
                                  hint="At least 6 characters"
                                  required
                              ></v-text-field>

                            </v-col>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                  class="text-capitalize"
                                  large
                                  :disabled="password.length === 0 || email.length === 0"
                                  color="primary"
                                  @click="login"
                              >
                                Login</v-btn>
                              <v-btn large text class="text-capitalize primary--text">Wachtwoord vergeten</v-btn>
                            </v-col>
                          </v-form>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>

                  <v-tab-item :value="'tab-newUser'" >
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">

                          <v-col>
                            <p class="login-slogan display-2 text-center font-weight-medium mt-5">Welkom!</p>
                            <p class="login-slogan display-1 text-center font-weight-medium mb-0">Account Creëren</p>
                          </v-col>

                          <v-form>
                            <v-layout column wrap>
                              <v-text-field
                                  v-model="createCompany"
                                  label="Bedrijfsnaam"
                                  required
                              ></v-text-field>
                              <v-text-field
                                  v-model="createEmail"
                                  :rules="emailRules"
                                  label="E-mailadres"
                                  required
                              ></v-text-field>
                              <v-text-field
                                  v-model="createPassword"
                                  :rules="passRules"
                                  type="password"
                                  label="Wachtwoord"
                                  hint="At least 6 characters"
                                  required
                              ></v-text-field>
                              <v-text-field
                                  v-model="passwordCheck"
                                  :rules="passRules"
                                  type="password"
                                  label="Herhaal wachtwoord"
                                  required
                              ></v-text-field>
                              <div v-if="createPassword !== passwordCheck" class="red--text">Password's don't match!</div>
                            </v-layout>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                  large
                                  block
                                  :disabled="createCompany.length === 0 || createEmail.length === 0 || createPassword === 0 || createPassword !== passwordCheck"
                                  color="primary"
                                  @click="register"
                              >
                                Account registreren</v-btn>
                            </v-col>
                          </v-form>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>

                </v-tabs>
              </div>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-footer>
                <div class="primary--text">© VD Compressors. All rights reserved.</div>
              </v-footer>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      menu: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      createCompany: '',
      createEmail: '',
      createPassword: '',
      password: '',
      passwordCheck: '',
      passRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Min 6 characters'
      ]
    }
  },
  methods: {
    login(){
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('loginUser', user)
    },
    register(e) {
      e.preventDefault()
      const newUser = {
        company: this.createCompany,
        email: this.createEmail,
        password: this.createPassword,
        isAdmin: false
      }
      this.$store.dispatch('registerUser', newUser)
    }
  },
  created() {
    if (window.localStorage.getItem('authenticated') === 'true') {
      if(this.$store.state.user.isAdmin) {
        this.$router.push('/admin/dashboard');
      } else {
        this.$router.push('/client/dashboard');
      }
    }
  }
}




</script>

<style src="./Login.scss" lang="scss"/>
