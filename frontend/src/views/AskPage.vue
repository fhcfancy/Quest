<template>
  <div class="min-h-screen bg-cosmic-dark">
    <Navigation />
    <LanguageSwitch />
    
    <div class="container mx-auto px-6 pt-32 pb-16 max-w-4xl">
      <h1 class="text-4xl font-light mb-12 text-center">{{ $t('ask.title') }}</h1>
      
      <!-- Tabs -->
      <div class="flex gap-4 mb-8 justify-center">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="currentTab = tab"
          class="px-6 py-3 rounded-lg border transition-all duration-300"
          :class="currentTab === tab 
            ? 'bg-cosmic-accent border-cosmic-accent' 
            : 'bg-cosmic-purple/30 border-cosmic-accent/30 hover:border-cosmic-accent'"
        >
          {{ $t(`ask.tabs.${tab}`) }}
        </button>
      </div>
      
      <!-- Form -->
      <div class="card">
        <form @submit.prevent="submitQuestion" class="space-y-6">
          <!-- Title (optional for image/video) -->
          <div>
            <label class="block text-sm font-medium mb-2">{{ $t('ask.form.title') }}</label>
            <input
              v-model="form.title"
              type="text"
              :placeholder="$t('ask.form.titlePlaceholder')"
              class="w-full px-4 py-3 rounded-lg bg-cosmic-purple/30 border border-cosmic-accent/30 focus:border-cosmic-accent outline-none transition-all duration-300"
            />
          </div>
          
          <!-- Content -->
          <div>
            <label class="block text-sm font-medium mb-2">{{ $t('ask.form.content') }}</label>
            <textarea
              v-model="form.content"
              rows="6"
              :placeholder="$t('ask.form.contentPlaceholder')"
              class="w-full px-4 py-3 rounded-lg bg-cosmic-purple/30 border border-cosmic-accent/30 focus:border-cosmic-accent outline-none transition-all duration-300 resize-none"
              required
            ></textarea>
          </div>
          
          <!-- Media Upload (for image/video tabs) -->
          <div v-if="currentTab !== 'text'">
            <label class="block text-sm font-medium mb-2">
              {{ currentTab === 'image' ? $t('ask.form.uploadImage') : $t('ask.form.uploadVideo') }}
            </label>
            <div 
              class="border-2 border-dashed border-cosmic-accent/30 rounded-lg p-8 text-center cursor-pointer hover:border-cosmic-accent transition-all duration-300"
              @click="triggerFileUpload"
              @dragover.prevent
              @drop.prevent="handleDrop"
            >
              <input 
                ref="fileInput"
                type="file"
                :accept="currentTab === 'image' ? 'image/*' : 'video/*'"
                @change="handleFileChange"
                class="hidden"
              />
              
              <div v-if="!uploadedFile">
                <div class="text-4xl mb-2">{{ currentTab === 'image' ? '🖼️' : '🎥' }}</div>
                <p>{{ currentTab === 'image' ? $t('ask.form.imagePlaceholder') : $t('ask.form.videoPlaceholder') }}</p>
              </div>
              
              <div v-else class="space-y-2">
                <div class="text-2xl">✅</div>
                <p class="text-sm">{{ uploadedFile.name }}</p>
                <button
                  type="button"
                  @click.stop="removeFile"
                  class="text-xs text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
            
            <div v-if="uploading" class="mt-2 text-sm text-cosmic-accent">
              Uploading...
            </div>
          </div>
          
          <!-- Category -->
          <div>
            <label class="block text-sm font-medium mb-2">{{ $t('ask.form.category') }}</label>
            <select
              v-model="form.category"
              class="w-full px-4 py-3 rounded-lg bg-cosmic-purple/30 border border-cosmic-accent/30 focus:border-cosmic-accent outline-none transition-all duration-300"
              required
            >
              <option value="">{{ $t('ask.form.categoryPlaceholder') }}</option>
              <option value="philosophy">{{ $t('browse.filters.philosophy') }}</option>
              <option value="science">{{ $t('browse.filters.science') }}</option>
              <option value="life">{{ $t('browse.filters.life') }}</option>
              <option value="existence">{{ $t('browse.filters.existence') }}</option>
              <option value="custom">{{ $t('browse.filters.custom') }}</option>
            </select>
          </div>
          
          <!-- Custom Category (if custom is selected) -->
          <div v-if="form.category === 'custom'">
            <label class="block text-sm font-medium mb-2">{{ $t('ask.form.customCategory') }}</label>
            <input
              v-model="form.customCategory"
              type="text"
              :placeholder="$t('ask.form.customCategoryPlaceholder')"
              class="w-full px-4 py-3 rounded-lg bg-cosmic-purple/30 border border-cosmic-accent/30 focus:border-cosmic-accent outline-none transition-all duration-300"
              required
            />
          </div>
          
          <!-- Submit Buttons -->
          <div class="flex gap-4 justify-end">
            <button
              type="button"
              @click="resetForm"
              class="btn-secondary"
            >
              {{ $t('ask.form.cancel') }}
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ submitting ? $t('common.loading') : $t('ask.form.submit') }}
            </button>
          </div>
        </form>
      </div>
      
      <!-- Success Message -->
      <div 
        v-if="showSuccess"
        class="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-float"
      >
        {{ $t('ask.success') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navigation from '../components/Navigation.vue'
import LanguageSwitch from '../components/LanguageSwitch.vue'
import { questionsAPI, uploadAPI } from '../api'

const router = useRouter()

const tabs = ['text', 'image', 'video']
const currentTab = ref('text')

const form = ref({
  title: '',
  content: '',
  category: '',
  customCategory: '',
  type: 'text',
  mediaUrl: ''
})

const fileInput = ref(null)
const uploadedFile = ref(null)
const uploading = ref(false)
const submitting = ref(false)
const showSuccess = ref(false)

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (file) {
    uploadedFile.value = file
    await uploadFile(file)
  }
}

const handleDrop = async (event) => {
  const file = event.dataTransfer.files[0]
  if (file) {
    uploadedFile.value = file
    await uploadFile(file)
  }
}

const uploadFile = async (file) => {
  uploading.value = true
  try {
    const response = await uploadAPI.upload(file)
    form.value.mediaUrl = response.data.url
  } catch (error) {
    console.error('Upload failed:', error)
    alert($t('ask.error'))
  } finally {
    uploading.value = false
  }
}

const removeFile = () => {
  uploadedFile.value = null
  form.value.mediaUrl = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const submitQuestion = async () => {
  submitting.value = true
  try {
    const questionData = {
      ...form.value,
      type: currentTab.value,
      category: form.value.category === 'custom' ? form.value.customCategory : form.value.category
    }
    
    await questionsAPI.create(questionData)
    
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
      router.push('/browse')
    }, 2000)
  } catch (error) {
    console.error('Failed to submit question:', error)
    alert($t('ask.error'))
  } finally {
    submitting.value = false
  }
}

const resetForm = () => {
  form.value = {
    title: '',
    content: '',
    category: '',
    customCategory: '',
    type: 'text',
    mediaUrl: ''
  }
  uploadedFile.value = null
  currentTab.value = 'text'
}
</script>

