<template>
    <div>
        <h1>Book with ISBN > 1000</h1>
        <ul>
            <li v-for="book in books" :key="book.id">
                {{ book.name }} - ISBN: {{ book.isbn }}
                <button @click="updateBook(book)" style="margin-left:8px">Update</button>
                <button @click="deleteBook(book)" style="margin-left:6px">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script >
import { ref, onMounted, onUnmounted } from 'vue'; 
import db from '../firebase/init.js'
import { collection, query, where, orderBy, limit, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore'

export default {
    setup () {
        const books = ref([]);
        let unsub = null

        onMounted(() => {
            const q = query(
                collection(db, 'books'),
                where('isbn', '>=', 1000),
                orderBy('isbn', 'asc'),
                limit(20)
            )
            // 🔥 实时订阅：任何 add/update/delete 都会自动回调
            unsub = onSnapshot(q, (snap) => {
                books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
                console.log('SNAPSHOT count =', books.value.length)
            })
        })

        onUnmounted(() => { if (unsub) unsub() })

        const updateBook = async (b) => {
            const newName = prompt('New name:', b.name)
            if (newName == null || newName.trim() === '') return
            await updateDoc(doc(db, 'books', b.id), { name: newName.trim() })
            console.log('UPDATE ok', b.id)
        }

        const deleteBook = async (b) => {
            await deleteDoc(doc(db, 'books', b.id))
            console.log('DELETE ok', b.id)
        }

        return { books, updateBook, deleteBook }
    }
}
</script>