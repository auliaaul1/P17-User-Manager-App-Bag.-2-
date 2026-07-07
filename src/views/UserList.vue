<template>
  <Layout>
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
      <div>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-800">Dashboard User</h2>
        <p class="text-gray-500 mt-2">Kelola seluruh data pengguna dengan mudah.</p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4">
        <div
          class="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl px-6 py-4 shadow-lg"
        >
          <p class="text-sm opacity-90">Total User</p>
          <h2 class="text-2xl font-bold">
            {{ users.length }}
          </h2>
        </div>
      </div>
    </div>

    <div
      v-if="loading"
      class="bg-white rounded-2xl shadow-lg p-10 text-center text-blue-600 text-lg"
    >
      Memuat data...
    </div>

    <div v-else class="bg-white rounded-3xl shadow-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
            <tr>
              <th class="px-6 py-4 text-center">No</th>
              <th class="px-6 py-4 text-center">Avatar</th>
              <th class="px-6 py-4 text-left">Nama</th>
              <th class="px-6 py-4 text-left">Email</th>
              <th class="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(user, index) in users"
              :key="user.id"
              class="border-b hover:bg-blue-50 transition duration-300"
            >
              <td class="text-center font-semibold text-gray-600">
                {{ index + 1 }}
              </td>

              <td class="py-4">
                <img
                  :src="user.avatar"
                  class="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                />
              </td>

              <td class="font-semibold text-slate-700">
                {{ user.name }}
              </td>

              <td class="text-gray-500">
                {{ user.email }}
              </td>

              <td class="text-center px-6 py-4">
                <div class="flex justify-center gap-3">
                  <button
                    @click="editUser(user)"
                    class="p-2 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-xl transition duration-200 shadow-sm"
                    title="Edit User"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>

                  <button
                    @click="deleteUser(user.id)"
                    class="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition duration-200 shadow-sm"
                    title="Hapus User"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="isEditing"
      class="fixed inset-0 z-50 bg-slate-900 bg-opacity-50 flex justify-center items-center p-4"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all">
        <h3 class="text-xl font-bold text-slate-800 mb-4">Edit Data Pengguna</h3>

        <div class="space-y-4">
          <div
            class="flex flex-col items-center gap-3 bg-slate-50 p-3 rounded-xl border border-dashed border-gray-300"
          >
            <img
              :src="selectedUser.avatar || 'https://placehold.co/150'"
              class="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
              alt="Preview Avatar"
            />
            <div class="w-full">
              <label class="block text-xs font-medium text-gray-500 mb-1"
                >Link Foto / Avatar URL</label
              >
              <input
                v-model="selectedUser.avatar"
                type="text"
                class="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-2 text-sm w-full rounded-lg bg-white"
                placeholder="https://example.com/foto.jpg"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
            <input
              v-model="selectedUser.name"
              type="text"
              class="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-3 w-full rounded-xl"
              placeholder="Nama Lengkap"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="selectedUser.email"
              type="email"
              class="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-3 w-full rounded-xl"
              placeholder="Alamat Email"
            />
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button
            @click="cancelEdit"
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium transition"
          >
            Batal
          </button>
          <button
            @click="updateUser"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium shadow transition"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Layout from '../components/Layout.vue'
import Swal from 'sweetalert2'

const users = ref([])
const loading = ref(true)

const isEditing = ref(false)
const selectedUser = ref({ id: null, name: '', email: '', avatar: '' })

const apiUrl = 'https://6a432dfa6dba791499aa469d.mockapi.io/users'

const fetchUsers = async () => {
  loading.value = true
  try {
    const res = await fetch(apiUrl)
    users.value = await res.json()
  } catch (error) {
    console.error('Gagal mengambil data:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})

const editUser = (user) => {
  selectedUser.value = { ...user }
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
}

const updateUser = async () => {
  if (!selectedUser.value.name || !selectedUser.value.email) {
    Swal.fire('Peringatan', 'Nama dan Email tidak boleh kosong!', 'warning')
    return
  }

  try {
    const res = await fetch(`${apiUrl}/${selectedUser.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedUser.value),
    })

    if (res.ok) {
      const index = users.value.findIndex((u) => u.id === selectedUser.value.id)
      if (index !== -1) {
        users.value[index] = selectedUser.value
      }

      isEditing.value = false
      Swal.fire({
        title: 'Berhasil!',
        text: 'Data pengguna berhasil diperbarui.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      })
    }
  } catch (error) {
    Swal.fire('Error', 'Gagal memperbarui data ke server.', 'error')
  }
}

const deleteUser = async (id) => {
  Swal.fire({
    title: 'Apakah Anda yakin?',
    text: 'Data yang dihapus tidak dapat dikembalikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await fetch(`${apiUrl}/${id}`, {
          method: 'DELETE',
        })

        if (res.ok) {
          users.value = users.value.filter((user) => user.id !== id)

          Swal.fire('Dihapus!', 'Data pengguna telah berhasil dihapus.', 'success')
        }
      } catch (error) {
        Swal.fire('Error', 'Gagal menghapus data dari server.', 'error')
      }
    }
  })
}
</script>
