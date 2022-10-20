import { Box, Skeleton, SkeletonText } from '@chakra-ui/react'
import React from 'react'

function EventSkleton() {
	return (
		<Box mx={['unset', 4]}>
			<Skeleton
				minH={'72'}
				minW={'72'}
				rounded='lg'
				mt={10}
				border='1px'
			></Skeleton>
			<SkeletonText
				mt='4'
				noOfLines={4}
				spacing='4'
			/>
			<Skeleton
				my={4}
				h={8}
				w={'24'}
				border={'1px'}
			/>
		</Box>
	)
}

export default EventSkleton
