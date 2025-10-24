<template>
  <div class="container py-4">
    <h2>Weather (One Call 3.0)</h2>

    <div class="d-flex gap-2 mb-3">
      <input v-model="city" type="text" class="form-control" placeholder='e.g. "Clayton, AU"' />
      <button class="btn btn-primary" @click="searchByCity">Search</button>
    </div>

    <button class="btn btn-outline-secondary btn-sm mb-3" @click="fetchCurrentLocationWeather">
      Use My Current Location
    </button>

    <main>
      <div v-if="weather">
        <h3>{{ placeLabel }}</h3>
        <div class="d-flex align-items-center gap-3">
          <img :src="iconUrl" alt="Weather Icon" />
          <p class="fs-4 mb-0">{{ Math.round(weather.current.temp) }} °C</p>
        </div>
        <span class="text-muted">{{ weather.current.weather[0].description }}</span>
      </div>
      <p v-else class="text-muted">No data yet. Try location or search a city.</p>
      <p v-if="error" class="text-danger mt-2">{{ error }}</p>
    </main>
  </div>
</template>

<script>
import axios from "axios"
const KEY = import.meta.env.VITE_OWM_KEY

export default {
  data() {
    return { city: "", weather: null, placeLabel: "", error: "" }
  },
  computed: {
    iconUrl() {
      return this.weather
        ? `https://openweathermap.org/img/wn/${this.weather.current.weather[0].icon}@2x.png`
        : ""
    }
  },
  mounted() {
    this.fetchCurrentLocationWeather()
  },
  methods: {
    async oneCall(lat, lon, label) {
      try {
        this.error = ""
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`
        const { data } = await axios.get(url)
        this.weather = data
        this.placeLabel = label || `lat ${lat}, lon ${lon}`
      } catch (e) {
        this.weather = null
        this.error = e?.response?.data?.message || e.message || String(e)
      }
    },
    async fetchCurrentLocationWeather() {
      if (!navigator.geolocation) { this.error = "Geolocation not supported."; return }
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => this.oneCall(coords.latitude, coords.longitude, "My Location"),
        err => { this.error = err.message || "Unable to get location." }
      )
    },
    async searchByCity() {
      if (!this.city.trim()) return
      try {
        this.error = ""
        const geo = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(this.city.trim())}&limit=1&appid=${KEY}`
        const { data } = await axios.get(geo)
        if (!data?.length) { this.error = "City not found."; return }
        const { lat, lon, name, country, state } = data[0]
        const label = [name, state, country].filter(Boolean).join(", ")
        await this.oneCall(lat, lon, label)
      } catch (e) {
        this.error = e?.response?.data?.message || e.message || String(e)
      }
    }
  }
}
</script>
