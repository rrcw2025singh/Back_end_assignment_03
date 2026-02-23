import { db } from "../../../config/firebaseConfig";
import { v4 as uuidv4 } from "uuid";

export const createDocument = async (collection: string, data: any) => {
  const id = uuidv4();

  const newDoc = {
    ...data,
    id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await db.collection(collection).doc(id).set(newDoc);
  return newDoc;
};

export const getDocuments = async (collection: string) => {
  const snapshot = await db.collection(collection).get();

  return snapshot.docs.map((doc: FirebaseFirestore.QueryDocumentSnapshot) => doc.data());
};

export const getDocumentById = async (collection: string, id: string) => {
  const docRef = await db.collection(collection).doc(id).get();
  if (!docRef.exists) return null;
  return docRef.data();
};

export const updateDocument = async (collection: string, id: string, data: any) => {
  const updatedDoc = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  await db.collection(collection).doc(id).set(updatedDoc, { merge: true });
  return updatedDoc;
};

export const deleteDocument = async (collection: string, id: string) => {
  await db.collection(collection).doc(id).delete();
};