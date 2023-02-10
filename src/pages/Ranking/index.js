import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { FlexBetween, Loading } from '~/components'
import { selectAllRanking, useGetRankingQuery } from './RankingSlice'

function Ranking() {
  const { isLoading } = useGetRankingQuery()
  const rankList = useSelector(state => selectAllRanking(state))

  return (
    <Box
      className="min-h-screen py-4 flex justify-center items-start
        bg-gradient-to-r from-[#3EADCF] to-[#ABE9CD]"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Box className="w-3/5 h-full pt-5">
          <FlexBetween gap="2rem">
            <FlexBetween
              flexDirection="column"
              gap="0.75rem"
              className="basis-1/3 bg-white py-6 rounded-md relative top-8"
              sx={{ boxShadow: '0 2px 5px 0 rgb(0, 0, 0, 0.15)' }}
            >
              <Typography variant="h6" sx={{ fontWeight: '500' }}>
                {rankList[1].name}
              </Typography>
              <Typography
                variant="h6"
                className="bg-[#eef7f6] rounded-[30px] text-[#51d2de] py-1 px-8"
                sx={{ fontWeight: '700' }}
              >
                {rankList[1].total_point}
              </Typography>

              <Box className="bg-[#cad3d8] text-[#929ca1] p-2 font-bold top-[80%] right-[-0.5rem] absolute rounded-[50%]">
                2nd
              </Box>
            </FlexBetween>

            <FlexBetween
              flexDirection="column"
              gap="0.75rem"
              className="basis-1/3 bg-white py-6 rounded-md relative"
              sx={{ boxShadow: '0 2px 5px 0 rgb(0, 0, 0, 0.15)' }}
            >
              <Typography variant="h6" sx={{ fontWeight: '500' }}>
                {rankList[0].name}
              </Typography>
              <Typography
                variant="h6"
                className="bg-[#eef7f6] rounded-[30px] text-[#51d2de] py-1 px-8"
                sx={{ fontWeight: '700' }}
              >
                {rankList[0].total_point}
              </Typography>

              <Box className="bg-[#ffe49b] text-[#e0ae69] p-2 font-bold top-[80%] right-[-0.5rem] absolute rounded-[50%]">
                1st
              </Box>
            </FlexBetween>

            <FlexBetween
              flexDirection="column"
              gap="0.75rem"
              className="basis-1/3 bg-white py-6 rounded-md relative top-8"
              sx={{ boxShadow: '0 2px 5px 0 rgb(0, 0, 0, 0.15)' }}
            >
              <Typography variant="h6" sx={{ fontWeight: '500' }}>
                {rankList[2].name}
              </Typography>
              <Typography
                variant="h6"
                className="bg-[#eef7f6] rounded-[30px] text-[#51d2de] py-1 px-8"
                sx={{ fontWeight: '700' }}
              >
                {rankList[2].total_point}
              </Typography>

              <Box className="bg-[#e2b290] text-[#db884c] p-2 font-bold top-[80%] right-[-0.5rem] absolute rounded-[50%]">
                3rd
              </Box>
            </FlexBetween>
          </FlexBetween>

          <Box className="bg-[white] mt-14 flex flex-col rounded-md">
            {rankList.slice(3).map((item, index) => (
              <Box key={`rank-list-${index}`}>
                <FlexBetween className="p-4">
                  <Box className="flex items-center gap-8">
                    <Typography variant="h7" className="font-semibold">
                      {index + 4}
                    </Typography>
                    <Typography variant="h7" className="font-semibold">
                      {item.name}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h6"
                    className="bg-[#eef7f6] rounded-[30px] text-[#51d2de] py-1 px-8"
                    sx={{ fontWeight: '700' }}
                  >
                    {item.total_point}
                  </Typography>
                </FlexBetween>

                <Divider sx={{ width: '100%' }} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Ranking
