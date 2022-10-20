import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import { storage } from '~/firebase/config'

const uploadFile = async file => {
  const fileRef = ref(storage, `records/${file.name + v4()}`)
  const res = await uploadBytes(fileRef, file)
  const path = res.metadata.fullPath

  // Get file url
  const imageRef = ref(storage, path)
  const url = await getDownloadURL(imageRef)
  return url
}

export default uploadFile
