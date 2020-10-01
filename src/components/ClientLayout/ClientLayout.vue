<template>
  <v-app class="pa-6">
    <Header />
    <ClientSidebar />
    <v-main class="content">
      <router-view />
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Header from '@/components/Header/Header';
import ClientSidebar from '@/components/Sidebars/ClientSideBar';
import Footer from "@/components/Footer/Footer";
import './ClientLayout.scss';

export default {
  name: 'Layout',
  components: {Footer, Header, ClientSidebar},
};
</script>

<style src="./ClientLayout.scss" lang="scss" />
