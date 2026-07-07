<template>
  <header class="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 shadow-xl">
    <div
      class="max-w-7xl mx-auto px-5 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-5"
    >
      <!-- Logo -->
      <div class="text-center md:text-left">
        <h1 class="text-3xl lg:text-4xl font-bold text-white">User Manager</h1>
      </div>

      <!-- Menu -->
      <nav class="flex flex-wrap justify-center gap-3">
        <router-link
          to="/"
          class="px-5 py-2 bg-white text-blue-700 rounded-xl font-semibold shadow hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          📋 Daftar User
        </router-link>

        <router-link
          to="/add"
          class="px-5 py-2 bg-green-500 text-white rounded-xl font-semibold shadow hover:bg-green-600 hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          ➕ Tambah User
        </router-link>
      </nav>
    </div>
  </header>
</template>
