<template>
  <div class="container py-4">
    <h2>GetAllBookAPI (JSON)</h2>
    <p class="text-muted">Auto fetch on load, showing raw JSON from Cloud Function</p>
    <pre class="bg-light p-3 rounded">{{ pretty }}</pre>
    <p v-if="error" class="text-danger mt-2">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "GetAllBookAPI",
  data(){ return { payload:null, error:"" } },
  computed:{
    pretty(){ return this.payload ? JSON.stringify(this.payload, null, 2) : "(no data yet)" }
  },
  async mounted(){
    try{
      const GET_ALL_URL = "https://australia-southeast1-week7-hinda.cloudfunctions.net/getAllBooks" 
      const { data } = await axios.get(GET_ALL_URL)
      this.payload = data
    }catch(e){
      this.error = e?.response?.data?.error || e.message || String(e)
    }
  }
}
</script>

