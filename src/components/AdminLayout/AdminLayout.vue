<template>
    <v-app class="pa-6">
        <Header />
        <AdminSidebar />
        <v-main class="content">
            <router-view />
            <Footer />
        </v-main>
    </v-app>
</template>

<script>
    import Header from '@/components/Header/Header';
    import AdminSidebar from '@/components/Sidebars/AdminSidebar';
    import Footer from "@/components/Footer/Footer";
    import './AdminLayout.scss';

    export default {
        name: 'Layout',
        components: {Footer, Header, AdminSidebar },
    };
</script>

<style src="./AdminLayout.scss" lang="scss" />
