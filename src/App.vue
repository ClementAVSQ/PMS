<template>
  <RouterView/>

</template>
<style>
:root {
  /* Couleurs */
  --primary-color: #1f5a92;
  --secondary-color: #f6c82c;
  --third-color: #7cb3e2;

  --size-small: clamp(12px, calc(10px + 0.5vw), 16px);
  --size-normal: clamp(16px, calc(14px + 0.8vw), 22px);
  --size-medium: clamp(18px, calc(18px + 1.2vw), 28px);
  --size-large: clamp(20px, calc(24px + 1.8vw), 44px);
  --size-xlarge: clamp(36px, calc(32px + 2.4vw), 56px);

  --spacing-xs: clamp(4px, calc(2px + 0.3vw), 8px);
  --spacing-sm: clamp(8px, calc(6px + 0.5vw), 12px);
  --spacing-md: clamp(12px, calc(10px + 0.8vw), 18px);
  --spacing-lg: clamp(18px, calc(16px + 1.2vw), 28px);
  --spacing-xl: clamp(28px, calc(24px + 1.8vw), 44px);

  --width-container: clamp(300px, 95vw, 1400px);
  --width-card: clamp(150px, calc(80vw / 4), 280px);
}

.card:hover,  button:hover{
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
  transition: all 0.3s ease-in-out;
}

</style>
<script>
import { RouterView } from 'vue-router';
</script>