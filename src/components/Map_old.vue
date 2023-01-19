<template>
<yandex-map @map-was-initialized="initializeMap" :coords="center" :zoom="10">
	<!-- <ymap-marker marker-id="marker" :coords="markerCoord"/> -->
</yandex-map>
</template>

<script>
import { toRaw } from 'vue'
import { mapState, mapActions } from 'vuex'

export default {
	name: 'Map',
	data: () => ({
		map: null,
		ymapsApi: null
	}),
	computed: {
		...mapState([
			'center',
			'mkad'
		])
	},
	methods: {
		async initializeMap(instance) {
			this.map = instance
			this.ymapsApi = window.ymaps
			const polygon = new this.ymapsApi.Polygon(this.mkad)
			console.log('this.map.geoObjects', this.map.geoObjects)
			await new Promise((resolve) => setTimeout((resolve), 1000))

			// Создаем многоугольник, используя класс GeoObject.
			var myGeoObject = new this.ymapsApi.GeoObject({
				// Описываем геометрию геообъекта.
				geometry: {
					// Тип геометрии - "Многоугольник".
					type: "Polygon",
					// Указываем координаты вершин многоугольника.
					coordinates: [
						// Координаты вершин внешнего контура.
						[
							[55.75, 37.80],
							[55.80, 37.90],
							[55.75, 38.00],
							[55.70, 38.00],
							[55.70, 37.80]
						],
						// Координаты вершин внутреннего контура.
						[
							[55.75, 37.82],
							[55.75, 37.98],
							[55.65, 37.90]
						]
					],
					// Задаем правило заливки внутренних контуров по алгоритму "nonZero".
					fillRule: "nonZero"
				},
				// Описываем свойства геообъекта.
				properties: {
					// Содержимое балуна.
					balloonContent: "Многоугольник"
				}
			}, {
				// Описываем опции геообъекта.
				// Цвет заливки.
				fillColor: '#00FF00',
				// Цвет обводки.
				strokeColor: '#0000FF',
				// Общая прозрачность (как для заливки, так и для обводки).
				opacity: 0.5,
				// Ширина обводки.
				strokeWidth: 5,
				// Стиль обводки.
				strokeStyle: 'shortdash'
			});

			// Добавляем многоугольник на карту.
			toRaw(this.map).geoObjects.add(myGeoObject)

			// this.map.geoObjects.add(polygon)
			// this.ymaps.geoQuery(poligon).addToMap(this.map)
		}
	}
}
</script>

<style lang="less">
.ymap-container {
	height: 100%;
}
</style>
