import { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '~/firebase/config'

const useFirestore = (collectionName, documentId, condition) => {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    let collectionRef
    if (documentId) {
      collectionRef = doc(db, collectionName, String(documentId))
    } else {
      collectionRef = collection(db, collectionName)
      if (condition) {
        if (!condition.compareValue || !condition.compareValue.length) {
          // reset documents data
          setDocuments([])
          return
        }
        collectionRef = query(
          collectionRef,
          where(condition.fieldName, condition.operator, condition.compareValue)
        )
      } else {
        collectionRef = query(collectionRef, orderBy('createdAt', 'asc'))
      }
    }

    const unsubscribe = onSnapshot(collectionRef, snapshot => {
      let res
      if (documentId) {
        res = snapshot.data()
      } else {
        res = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      }
      // console.log('=====> ref', res)
      setDocuments(res)
    })

    return unsubscribe
  }, [collectionName, documentId, condition])
  return documents
}

export default useFirestore
