<template>
  <div class="min-h-screen flex flex-col bg-slate-100">
    <!-- Header -->
    <Header />

    <!-- Content -->
    <main class="flex-1 w-full">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>
