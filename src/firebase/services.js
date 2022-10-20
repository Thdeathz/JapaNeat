import { db } from './config'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc
} from 'firebase/firestore'

export const addDocument = async document => {
  const collectionRef = collection(db, document.collectionName)
  let res = null
  if (document.id) {
    res = await setDoc(doc(db, String(document.collectionName), String(document.id)), document.data)
  } else {
    res = await addDoc(collectionRef, document.data)
  }
  return res?._key.path.segments[1]
}

export const getDocument = async document => {
  let ref = collection(db, document.collectionName)
  if (document.id) {
    ref = doc(ref, document.id)
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
