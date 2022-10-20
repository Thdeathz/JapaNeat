import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '~/firebase/config'

const useFirestore = (collectionName, condition) => {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    let collectionRef = collection(db, collectionName)
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
    }

    const unsubscribe = onSnapshot(collectionRef, snapshot => {
      const res = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))

      setDocuments(res)
    })

    return unsubscribe
  }, [collectionName, condition])
  return documents
}

export default useFirestore
