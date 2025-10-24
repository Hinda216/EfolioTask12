/* eslint-disable no-console */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();


exports.countBooks = functions
    .region("australia-southeast1")
    .https.onRequest((req, res) => {
      cors(req, res, async () => {
        try {
          const snap = await admin.firestore().collection("books").get();
          res.status(200).json({count: snap.size});
        } catch (e) {
          console.error("Error counting books:", e);
          res.status(500).json({error: e.message});
        }
      });
    });

exports.capitalizeBook = functions
    .region("australia-southeast1")
    .firestore.document("books/{bookId}")
    .onCreate(async (snap) => {
      const data = snap.data() || {};
      const updates = {};

      if (typeof data.name === "string") {
        updates.name = data.name.toUpperCase();
      }

      if (Object.keys(updates).length > 0) {
        await snap.ref.update(updates);
      }
      return null;
    });

exports.getAllBooks = functions
    .region("australia-southeast1")
    .https.onRequest((req, res) => {
      cors(req, res, async () => {
        try {
          const col = admin.firestore().collection("books");
          const snap = await col.orderBy("isbn", "asc").get();

          const books = snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }));

          res.status(200).json({count: books.length, books});
        } catch (e) {
          console.error("getAllBooks error:", e);
          res.status(500).json({error: e.message});
        }
      });
    });
