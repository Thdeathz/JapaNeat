import { Box, Button, Stack, TextareaAutosize, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { FlexBetween, Loading, VideoCard } from '~/components'
import { useGetVideosQuery } from '../VideoDetail/videosSlice'
import { selectRecordById, useAddFeedbackMutation, useGetRecordsQuery } from './recordsSlice'
import SendIcon from '@mui/icons-material/Send'
import CircularProgress from '@mui/material/CircularProgress'
import { addDocument } from '~/firebase/services'
import { AccountCircle } from '@mui/icons-material'

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
          message: `You have new feedback 🎊🎊🎊`
        }
      })
      navigate('/videos')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {videosLoading || recordsLoading ? (
        <Loading />
      ) : (
        <Box className="flex flex-col justify-center py-4 px-2 gap-4">
          <Box className="h-[90vh] flex justify-center bg-slate-900">
            <video className="hover:cursor-pointer w-full h-full" controls>
              <source src={record.record.url} type="video/mp4" />
            </video>
          </Box>
          <FlexBetween gap="4rem" sx={{ width: '100%', alignItems: 'flex-start' }}>
            <Box className="basis-3/4" color="secondary">
              <Box className="flex justify-between items-center">
                <Typography variant="h4" sx={{ fontWeight: '700' }}>
                  Record kaiwa of {record.offer.name} and {record.answer.name}
                </Typography>
                <h1 className="text-xl">01/01/2000</h1>
              </Box>
              {record.feedback ? (
                <FlexBetween gap="0.5rem" sx={{ alignItems: 'flex-end' }}>
                  <AccountCircle sx={{ fontSize: '2.25rem' }} />
                  <Box className="bg-[#e3f6f5] grow py-4 px-2 rounded-md">
                    <Typography variant="h7" sx={{ textOverflow: 'break-word' }}>
                      {record.feedback.comment}
                    </Typography>
                  </Box>
                </FlexBetween>
              ) : (
                record.teacher.id == Number(currentUser.id) && (
                  <Box className="bg-[#e3f6f5] flex flex-col gap-4 py-4 px-2 rounded-md">
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
            <Box className="basis-1/4 flex flex-col items-center gap-4">
              <VideoCard videoId={record.videoId} />
            </Box>
          </FlexBetween>
        </Box>
      )}
    </>
  )
}
