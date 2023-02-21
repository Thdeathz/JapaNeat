import React from 'react'
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import images from '~/assets/images'
import { Loading, NoData } from '~/components'

function BattleList() {
  const navigate = useNavigate()
  const ref = collection(useFirestore(), 'dual')
  const { status, data: roomData } = useFirestoreCollectionData(ref)

  return (
    <>
      {!roomData ? (
        <Loading />
      ) : (
        <>
          {roomData.length === 0 ? (
            <NoData />
          ) : (
            <Box className="flex flex-col justify-center items-start px-2 pb-4">
              <Grid className="lg:gap-4 gap-2" container>
                {roomData.map((room, index) => (
                  <Grid
                    key={`video-list-${index}`}
                    item
                    className="2xl:w-[260px] xl:w-[23%] md:w-[32%] sm:w-[45%] w-full cursor-pointer relative"
                  >
                    <Card className="w-full">
                      <CardActionArea
                        onClick={() =>
                          navigate(`/dual/${room.offerId}/${room.answerId}/${room.roomId}`)
                        }
                      >
                        <CardMedia
                          component="img"
                          image={images.battleThumbnail}
                          alt="battle thumbnail"
                        />
                        <CardContent>
                          <Box className="flex flex-row justify-between items-center pb-2">
                            <Typography variant="h6" component="p" sx={{ fontWeight: '500' }}>
                              {`${room.offerDisplayName} ⚔️ ${room.answerDisplayName}`}
                            </Typography>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </>
      )}
    </>
  )
}

export default BattleList
