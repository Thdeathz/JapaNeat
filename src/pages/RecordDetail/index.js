import { Box, Button, Stack, TextareaAutosize } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { VideoCard } from '~/components'
import { Loading } from '~/components/Layout'
import { useGetVideosQuery } from '../VideoDetail/videosSlice'
import { selectRecordById, useAddFeedbackMutation, useGetRecordsQuery } from './recordsSlice'
import SendIcon from '@mui/icons-material/Send'
import CircularProgress from '@mui/material/CircularProgress'
import { addDocument } from '~/firebase/services'

export default function RecordDetail() {
  const { recordId } = useParams()
  const navigate = useNavigate()
  const { isLoading: videosLoading } = useGetVideosQuery()
  const { isLoading: recordsLoading } = useGetRecordsQuery()
  const record = useSelector(state => selectRecordById(state, Number(recordId)))
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const [comment, setComment] = useState('')
  const [bonusPoint, setBonusPoint] = useState(0)

  const [addFeedback, { isLoading }] = useAddFeedbackMutation()

  const handleSendFeedback = async e => {
    e.preventDefault()
    try {
      await addFeedback({
        record_detail_id: record.id,
        comment: comment,
        bonus_point: Number(bonusPoint)
      }).unwrap()
      await addDocument({
        collectionName: 'notifications',
        data: {
          offerId: record.offer.id,
          answerId: record.answer.id,
          recordId: record.id,
          message: `${record.teacher.name} had given feedback for your record !!!`
        }
      })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {videosLoading || recordsLoading ? (
        <Loading />
      ) : (
        <Box className="flex flex-col justify-center desktop:w-[90vw] py-2 gap-4">
          <Box className="h-[75vh] flex justify-center bg-slate-900">
            <video className="hover:cursor-pointer w-full h-full" controls>
              <source src={record.record.url} type="video/mp4" />
            </video>
          </Box>
          <Stack direction="row" spacing={4} justifyContent="center">
            <Box flex={8} color="secondary">
              <Box className="flex justify-between items-center">
                <h1 className="font-bold text-default text-4xl">
                  Record kaiwa of {record.offer.name} and {record.answer.name}
                </h1>
                <h1 className="text-xl">01/01/2000</h1>
              </Box>
              {record.feedback ? (
                <p className="mt-2 text-default text-base">Feedback: {record.feedback.comment}</p>
              ) : (
                record.teacher.id == Number(currentUser.id) && (
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <h3 className="font-semibold text-default text-xl py-2">Feedback :</h3>
                      <textarea
                        className="w-full h-[150px] p-2 text-base border border-slate-800"
                        placeholder="Enter your comment"
                        onChange={e => setComment(e.target.value)}
                      />
                    </Box>
                    <Box className="flex flex-row justify-between items-center">
                      <Box className="flex justify-start items-start gap-2">
                        <h3 className="font-semibold text-default text-xl">Bonus point: </h3>
                        <input
                          className="p-2 text-base border border-slate-800"
                          placeholder={0}
                          min={0}
                          type="number"
                          onChange={e => setBonusPoint(e.target.value)}
                        />
                      </Box>
                      <Button
                        variant="contained"
                        endIcon={
                          isLoading ? (
                            <CircularProgress size={15} color="secondary" />
                          ) : (
                            <SendIcon />
                          )
                        }
                        onClick={e => handleSendFeedback(e)}
                      >
                        Send feedback
                      </Button>
                    </Box>
                  </Box>
                )
              )}
            </Box>
            <Box className="flex flex-col items-center gap-4" flex={3}>
              <VideoCard videoId={record.videoId} />
            </Box>
          </Stack>
        </Box>
      )}
    </>
  )
}
