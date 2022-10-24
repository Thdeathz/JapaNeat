import { db } from './config'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'

export const addDocument = async document => {
  const collectionRef = collection(db, document.collectionName)
  let res = null
  if (document.id) {
    res = await setDoc(doc(db, String(document.collectionName), String(document.id)), document.data)
  } else {
    res = await addDoc(collectionRef, document.data)
  }
}

export const getDocument = async (document, condition) => {
  let ref = collection(db, document.collectionName)
  if (document.id) {
    ref = doc(ref, document.id)
  }
  if (condition) {
    ref = query(ref, where(condition.fieldName, condition.operator, condition.compareValue))
  }
  const res = await getDocs(ref)
  if (res) {
    const returnRes = res.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))
    return returnRes
  }
}

export const deleteDocument = async document => {
  const collectionRef = collection(db, document.collectionName)
  let res = null
  if (document.id) {
    res = await deleteDoc(doc(db, String(document.collectionName), String(document.id)))
  } else {
    res = await deleteDoc(collectionRef)
  }
}

export const updateDocument = async document => {
  let collectionRef = collection(db, document.collectionName)
  if (document.id) {
    collectionRef = doc(collectionRef, document.id)
  }
  await updateDoc(collectionRef, document.data)
}
