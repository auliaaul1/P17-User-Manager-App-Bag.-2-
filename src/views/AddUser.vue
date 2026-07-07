<template>
  <Layout>
    <div class="max-w-2xl mx-auto">
      <!-- Card -->
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-blue-500 p-6">
          <h2 class="text-3xl font-bold text-white">Tambah User</h2>

          <p class="text-blue-100 mt-2">Lengkapi data pengguna di bawah ini.</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="submitUser" class="p-8 space-y-6">
          <!-- Nama -->
          <div>
            <label class="block mb-2 font-semibold text-gray-700"> Nama Lengkap </label>

            <input
              v-model="form.name"
              type="text"
              placeholder="Masukkan nama lengkap"
              required
              class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <!-- Email -->

          <div>
            <label class="block mb-2 font-semibold text-gray-700"> Email </label>

            <input
              v-model="form.email"
              type="email"
              placeholder="contoh@email.com"
              required
              class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <!-- Avatar -->

          <div>
            <label class="block mb-2 font-semibold text-gray-700"> Avatar URL </label>

            <input
              v-model="form.avatar"
              type="text"
              placeholder="https://..."
              class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <!-- Preview -->

          <div v-if="form.avatar" class="flex justify-center">
            <img
              :src="form.avatar"
              class="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow-lg"
            />
          </div>

          <!-- Button -->

          <div class="flex flex-col sm:flex-row gap-4 justify-end">
            <router-link
              to="/"
              class="w-full sm:w-auto text-center px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
            >
              Batal
            </router-link>

            <button
              type="submit"
              class="w-full sm:w-auto px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition duration-300"
            >
              💾 Simpan User
            </button>
          </div>
        </form>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref } from 'vue'
import Layout from '../components/Layout.vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const form = ref({
  name: '',
  email: '',
  avatar: '',
})

const router = useRouter()

const submitUser = async () => {
  try {
    const response = await fetch('https://6a432dfa6dba791499aa469d.mockapi.io/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.value),
    })

    if (!response.ok) {
      throw new Error('Gagal menyimpan data')
    }

    await Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Data user berhasil disimpan.',
      confirmButtonColor: '#2563eb',
      confirmButtonText: 'OK',
    })

    router.push('/')
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal!',
      text: 'Terjadi kesalahan saat menyimpan data.',
      confirmButtonColor: '#dc2626',
    })
  }
}
</script>
