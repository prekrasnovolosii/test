<template>
<div class="home">
	<Map />
</div>
</template>

<script>
import Map from '@/components/Map.vue'

export default {
	name: 'Home',
	components: {
		Map
	}
}
</script>
<style lang="less">
.home {
	height: 100%;
}
</style>
