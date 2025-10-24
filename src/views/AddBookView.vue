<template>
  <div class="container py-4">
    <!-- 统计数量（9.1） -->
    <div class="mb-3">
      <button class="btn btn-outline-secondary btn-sm" @click="loadCount">Get Book Count</button>
      <span v-if="count !== null" class="ms-2">Total books: {{ count }}</span>
      <span v-if="countErr" class="ms-2 text-danger">{{ countErr }}</span>
    </div>

    <h1>Add Book</h1>
    <form @submit.prevent="addBook" class="row g-3">
      <div class="col-md-3">
        <label class="form-label">ISBN (number)</label>
        <input v-model="isbn" type="number" class="form-control" required />
      </div>
      <div class="col-md-5">
        <label class="form-label">Name</label>
        <input v-model="name" type="text" class="form-control" required />
      </div>
      <div class="col-md-4 d-flex align-items-end">
        <button class="btn btn-primary">Add Book</button>
      </div>
    </form>

    <p class="mt-2">{{ message }}</p>

    <!-- 你的列表（建议用 onSnapshot 的 BookList） -->
    <BookList />
  </div>
</template>

<script>
import { ref } from "vue";
import db from "@/firebase/init";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import BookList from "@/components/BookList.vue";

export default {
  components: { BookList },
  setup () {
    const isbn = ref("");
    const name = ref("");
    const message = ref("");

    // 👇 把这个换成“部署成功后 CLI 打印的真实 URL”
    const COUNT_URL = "https://australia-southeast1-week7-hinda.cloudfunctions.net/countBooks";
    const count = ref(null);
    const countErr = ref("");

    const loadCount = async () => {
      try {
        const r = await fetch(COUNT_URL);
        const j = await r.json();
        count.value = j.count;
        countErr.value = "";
        console.log("countBooks:", j);
      } catch (e) {
        count.value = null;
        countErr.value = String(e);
        console.error("Error fetching count:", e);
      }
    };

    const addBook = async () => {
      try {
        const n = Number(isbn.value);
        if (!Number.isFinite(n)) {
          alert("ISBN must be a valid number");
          return;
        }
        // 9.2：这里刻意以“小写”入库，触发器会自动改成大写
        const rawName = name.value.trim().toLowerCase();
        await addDoc(collection(db, "books"), {
          isbn: n,
          name: rawName,
          createdAt: serverTimestamp()
        });
        message.value = "✅ Book added (Functions will capitalize name)";
        isbn.value = "";
        name.value = "";
        // 可选：刷新一下数量
        // await loadCount();
      } catch (err) {
        console.error("Error adding book:", err);
        message.value = "❌ " + (err.code || err.message);
      }
    };

    return { isbn, name, message, addBook, count, countErr, loadCount };
  }
};
</script>
