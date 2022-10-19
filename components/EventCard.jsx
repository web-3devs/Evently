import { Box, Text, Button, Img, Flex, Heading } from '@chakra-ui/react'
import { CalendarIcon } from '@chakra-ui/icons'
import ShadowBtn from './ShadowBtn'
import { useRouter } from 'next/router'

export default function EventCard({ index, name, desc, image, date, posted }) {
  const router = useRouter()
  
	return (
		<Box
			maxW='xs'
			bg='white'
			rounded='lg'
			mt={10}
			mx={['unset', 4]}
			border='1px'
			boxShadow='6px 6px 0px black'
		>
			<Img
				h={48}
				w='full'
				fit='cover'
				mb={2}
				roundedTop='lg'
				src={'vercel.svg'}
				alt={''}
				borderBottom={'1px'}
			/>
			<Box p={4}>
				<Flex
					mb={2}
					alignItems='center'
				>
					<CalendarIcon />
					<Text
						fontSize={'md'}
						fontWeight='semibold'
						ml={2}
					>
						22 June 2022
					</Text>
				</Flex>
				<Heading
					color='gray.800'
					fontWeight='bold'
					fontSize='2xl'
				>
					{name}
				</Heading>
				<Text
					fontSize='sm'
					color='gray.600'
					noOfLines={3}
					textAlign='justify'
				>
					{desc}
				</Text>
				<Button
					colorScheme='white'
					color={'black'}
					border='1px'
					boxShadow='6px 6px 0px black'
					rounded={'sm'}
					size='md'
					cursor='pointer'
					onClick={() => {
						router.push(`/event/${index}`)
					}}
				>
					View More
				</Button>
			</Box>
		</Box>
	)
}
