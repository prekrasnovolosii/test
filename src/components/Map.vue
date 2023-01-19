<template>
<yandex-map @map-was-initialized="initializeMap" @click.self="setPoint" :coords="center" :zoom="10">
	<ymap-marker v-if="point" marker-id="marker" :coords="point" />
</yandex-map>
</template>

<script>
import { markRaw } from 'vue'
import { mapState, mapActions } from 'vuex'

export default {
	name: 'Map',
	data: () => ({
		map: null,
		ymapsApi: null,
		polygon: null,
		routs: {
			air: null,
			road: null
		}
	}),
	computed: {
		...mapState([
			'center',
			'mkad',
			'point'
		])
	},
	methods: {
		...mapActions([
			'SET_POINT'
		]),
		initializeMap(instance) {
			this.map = markRaw(instance)
			this.ymapsApi = window.ymaps
			this.polygon = markRaw(new this.ymapsApi.Polygon({
				'type': 'Polygon',
				'coordinates': this.mkad
			}))
			this.map.geoObjects.add(this.polygon)
		},
		async setPoint(event) {
			const startPoint = new this.ymapsApi.Placemark(event.get('coords'))
			const coordinates = {
				start: event.get('coords'),
				end: this.polygon.geometry.getClosest(startPoint.geometry.getCoordinates()).position
			}
			this.SET_POINT({ coordinates: coordinates.start })

			if (this.routs.road) {
				this.routs.road.removeFromMap(this.map)
			}
			const roadPath = await this.ymapsApi.route([coordinates.start, coordinates.end])
			this.routs.road = markRaw(this.ymapsApi.geoQuery(roadPath.getPaths()).setOptions({
				strokeColor: 'ff1493',
				strokeWidth: 3
			}).addToMap(this.map))

			if (this.routs.air) {
				this.routs.air.removeFromMap(this.map)
			}
			const airPath = [{
				type: 'LineString',
				coordinates: [coordinates.start, coordinates.end]
			}]
			this.routs.air = markRaw(this.ymapsApi.geoQuery(airPath).setOptions({
				strokeColor: '999',
				strokeStyle: 'shortdash',
				strokeWidth: 3,
			}).addToMap(this.map))
		}
	}
}
</script>

<style lang="less">
.ymap-container {
	height: 100%;
}
</style>
