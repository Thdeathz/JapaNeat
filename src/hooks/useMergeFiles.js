import React from 'react'
import axios from 'axios'

function useMergeFiles() {
  const apiUrl = 'http://127.0.0.1:8000/api/merge-audio'

  // Read the audio file and convert it to a base64-encoded data URL
  const handleMergeFiles = async (videoUrl, audioUrl) => {
    // const reader = new FileReader()
    // reader.readAsDataURL(audioFile)
    // reader.onloadend = () => {
    //   const audioDataUrl = reader.result

    //   const data = {
    //     input: [{ url: videoUrl }, { url: audioDataUrl }],
    //     outputs: [
    //       {
    //         format: 'mp4',
    //         video_codec: 'h264',
    //         audio_codec: 'aac'
    //       }
    //     ]
    //   }

    //   const headers = {
    //     'Zencoder-Api-Key': 'e1cd8c5857bf950654dfc2d6eeb3657c',
    //     'Content-Type': 'application/json'
    //   }

    //   axios
    //     .post(apiUrl, data, { headers })
    //     .then(response => {
    //       console.log(response)
    //       const jobId = response.data.id
    //       return jobId
    //     })
    //     .catch(error => {
    //       console.error(error)
    //     })
    // }

    const data = [{ audio_url: videoUrl }, { video_url: audioUrl }]

    axios
      .post(apiUrl, data)
      .then(response => {
        console.log(response)
        const jobId = response.data.id
        return jobId
      })
      .catch(error => {
        console.error(error)
      })
  }

  return { handleMergeFiles }
}

export default useMergeFiles
