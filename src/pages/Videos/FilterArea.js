import { Box, ButtonBase } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  filterVideosByCategory,
  getCurrentCategoryState,
  useGetCategoriesQuery
} from '../VideoDetail/videosSlice'

function FilterArea() {
  const dispatch = useDispatch()

  const currentCategory = useSelector(getCurrentCategoryState)
  const { data: categories, isLoading } = useGetCategoriesQuery()

  return (
    <Box className="bg-[white] h-[4rem] w-full py-4 px-2 sticky top-0 overflow-y-scroll z-50 no-scroll-bar">
      {!isLoading && (
        <Box
          className="flex gap-2"
          component={motion.div}
          initial={{ opacity: 0, x: '80vw' }}
          animate={{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 30 } }}
        >
          <ButtonBase
            sx={{
              p: '0.25rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: currentCategory === 'All' ? '#3da9fc' : 'rgba(0, 0, 0, 0.2)',
              color: currentCategory === 'All' ? 'white' : 'black',
              '&:hover': {
                backgroundColor: currentCategory === 'All' ? '#3da9fc' : 'rgba(0, 0, 0, 0.1)'
              }
            }}
            onClick={() => dispatch(filterVideosByCategory('All'))}
          >
            All
          </ButtonBase>

          {categories?.data.map((category, index) => (
            <ButtonBase
              key={`filter-${index}`}
              sx={{
                p: '0.25rem 1rem',
                borderRadius: '0.5rem',
                backgroundColor:
                  currentCategory === category.category_name ? '#3da9fc' : 'rgba(0, 0, 0, 0.2)',
                color: currentCategory === category.category_name ? 'white' : 'black',
                '&:hover': {
                  backgroundColor:
                    currentCategory === category.category_name ? '#3da9fc' : 'rgba(0, 0, 0, 0.1)'
                }
              }}
              onClick={() => dispatch(filterVideosByCategory(category.category_name))}
            >
              {category.category_name}
            </ButtonBase>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default React.memo(FilterArea)
