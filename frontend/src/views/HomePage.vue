<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Language Switch -->
    <LanguageSwitch />
    
    <!-- Cosmic Background -->
    <div class="cosmic-background">
      <canvas ref="starsCanvas" class="absolute inset-0 w-full h-full"></canvas>
    </div>
    
    <!-- Main Content -->
    <div class="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
      <!-- Main Title -->
      <h1 class="main-title">
        {{ $t('home.title') }}
      </h1>
      
      <!-- Floating Questions -->
      <div class="floating-questions absolute inset-0 pointer-events-none">
        <div 
          v-for="(question, index) in floatingQuestions" 
          :key="index"
          class="floating-question"
          :style="question.style"
        >
          {{ $t(question.text) }}
        </div>
      </div>
      
      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-6 z-20 cta-buttons">
        <router-link to="/browse" class="cosmic-button primary">
          <span class="button-content">{{ $t('home.cta.browse') }}</span>
        </router-link>
        <router-link to="/ask" class="cosmic-button secondary">
          <span class="button-content">{{ $t('home.cta.ask') }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import LanguageSwitch from '../components/LanguageSwitch.vue'

const starsCanvas = ref(null)
let animationId = null

const floatingQuestions = [
  { text: 'home.floatingQuestions.q1', style: { top: '15%', left: '10%', animationDelay: '0s' } },
  { text: 'home.floatingQuestions.q2', style: { top: '25%', right: '15%', animationDelay: '1s' } },
  { text: 'home.floatingQuestions.q3', style: { top: '60%', left: '20%', animationDelay: '2s' } },
  { text: 'home.floatingQuestions.q4', style: { top: '40%', right: '10%', animationDelay: '3s' } },
  { text: 'home.floatingQuestions.q5', style: { top: '70%', right: '25%', animationDelay: '1.5s' } },
  { text: 'home.floatingQuestions.q6', style: { top: '50%', left: '8%', animationDelay: '2.5s' } },
  { text: 'home.floatingQuestions.q7', style: { top: '80%', left: '40%', animationDelay: '0.5s' } },
  { text: 'home.floatingQuestions.q8', style: { top: '30%', left: '50%', animationDelay: '3.5s' } }
]

onMounted(() => {
  initStars()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})

const initStars = () => {
  const canvas = starsCanvas.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  const stars = []
  const starCount = 200
  
  // Create stars
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.02
    })
  }
  
  // Animation loop
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    stars.forEach(star => {
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
      ctx.fill()
      
      // Twinkle effect
      star.opacity += star.twinkleSpeed
      if (star.opacity > 1 || star.opacity < 0.3) {
        star.twinkleSpeed = -star.twinkleSpeed
      }
    })
    
    animationId = requestAnimationFrame(animate)
  }
  
  animate()
  
  // Handle resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}
</script>

<style scoped>
.cosmic-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    #0a0e27 0%,
    #1a1333 50%,
    #0f2847 100%
  );
}

.main-title {
  font-size: clamp(1.5rem, 5vw, 4rem);
  font-weight: 400;
  text-align: center;
  max-width: 1100px;
  margin-bottom: 4rem;
  line-height: 1.8;
  letter-spacing: 0.08em;
  
  /* 优美的字体 - 中文飘洒手写体，英文意大利体 */
  font-family: 'Ma Shan Zheng', 'ZCOOL XiaoWei', 'STKaiti', 'KaiTi', 
               'Playfair Display', 'Crimson Text', 'Georgia', 'serif';
  font-style: italic;
  
  /* 渐变文字效果 - 更加柔和优雅 */
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #f0f4ff 20%,
    #e0e7ff 40%,
    #c7d2fe 60%,
    #a5b4fc 80%,
    #9ca3f0 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  
  /* 增强发光效果 - 更有书法韵味 */
  filter: drop-shadow(0 0 35px rgba(129, 140, 248, 0.4))
          drop-shadow(0 0 70px rgba(129, 140, 248, 0.25))
          drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
  
  /* 动画 - 更加飘逸 */
  animation: titleGlow 10s ease-in-out infinite, 
             titleFloat 7s ease-in-out infinite,
             fadeIn 2s ease-out;
}

@keyframes titleGlow {
  0%, 100% {
    background-position: 0% 50%;
    filter: drop-shadow(0 0 35px rgba(129, 140, 248, 0.4))
            drop-shadow(0 0 70px rgba(129, 140, 248, 0.25))
            drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
  }
  50% {
    background-position: 100% 50%;
    filter: drop-shadow(0 0 45px rgba(167, 139, 250, 0.5))
            drop-shadow(0 0 90px rgba(167, 139, 250, 0.35))
            drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
  }
}

@keyframes titleFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-18px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.floating-question {
  position: absolute;
  padding: 1rem 1.5rem;
  background: rgba(74, 95, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(74, 95, 255, 0.2);
  border-radius: 12px;
  font-size: 0.9rem;
  animation: float 6s ease-in-out infinite;
  max-width: 250px;
  opacity: 0.7;
  transition: opacity 0.3s, transform 0.3s;
}

.floating-question:hover {
  opacity: 1;
  transform: scale(1.05);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* CTA 按钮样式 */
.cta-buttons {
  animation: fadeIn 1.5s ease-out 0.5s both;
}

.cosmic-button {
  position: relative;
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  border-radius: 12px;
  text-decoration: none;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  letter-spacing: 0.02em;
}

.cosmic-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.cosmic-button:hover::before {
  transform: translateX(100%);
}

.cosmic-button.primary {
  background: linear-gradient(135deg, #4a5fff 0%, #7c3aed 100%);
  color: white;
  box-shadow: 0 10px 30px rgba(74, 95, 255, 0.3),
              0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

.cosmic-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(74, 95, 255, 0.4),
              0 0 0 1px rgba(255, 255, 255, 0.2) inset,
              0 0 30px rgba(74, 95, 255, 0.5);
}

.cosmic-button.primary:active {
  transform: translateY(-1px);
}

.cosmic-button.secondary {
  background: rgba(74, 95, 255, 0.1);
  color: #a5b4fc;
  border: 2px solid rgba(74, 95, 255, 0.4);
  box-shadow: 0 10px 30px rgba(74, 95, 255, 0.1),
              0 0 0 1px rgba(255, 255, 255, 0.05) inset;
}

.cosmic-button.secondary:hover {
  background: rgba(74, 95, 255, 0.2);
  border-color: rgba(74, 95, 255, 0.6);
  color: #c7d2fe;
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(74, 95, 255, 0.2),
              0 0 0 1px rgba(255, 255, 255, 0.1) inset,
              0 0 30px rgba(74, 95, 255, 0.3);
}

.cosmic-button.secondary:active {
  transform: translateY(-1px);
}

.button-content {
  position: relative;
  z-index: 1;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .main-title {
    font-size: clamp(1.25rem, 6vw, 2rem);
    margin-bottom: 3rem;
    line-height: 1.5;
  }
  
  .cosmic-button {
    padding: 0.875rem 2rem;
    font-size: 1rem;
  }
}
</style>

