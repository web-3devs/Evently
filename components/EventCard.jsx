import { Box, Text, Button, Img, Flex, Heading } from '@chakra-ui/react'
import { CalendarIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import convertDate from '../utils/formatDate'
import Link from 'next/link'

export default function EventCard({ id, name, desc, image, date, posted }) {
	const router = useRouter()

	return (
		<Box
			w={['unset', 'xs']}
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
				objectFit={'contain'}
				mb={2}
				roundedTop='lg'
				src={image ? image : 'BootcampWeb3Devs.png'}
				alt={''}
				borderBottom={'1px'}
			/>
			<Box
				px={4}
				py={2}
				minH={52}
			>
				{date ? (
					<Flex
						mb={2}
						alignItems='center'
					>
						<CalendarIcon />
						<Text
							fontSize={'sm'}
							fontWeight='semibold'
							ml={2}
						>
							{convertDate(date)}
						</Text>
					</Flex>
				) : null}
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
					noOfLines={2}
					textAlign='justify'
				>
					{desc}
				</Text>
				<Link href={`/event/${encodeURIComponent(id)}`}>
					<Button
						colorScheme='purple'
						mt={4}
						color={'white'}
						border='1px black'
						boxShadow='6px 6px 0px black'
						rounded={'sm'}
						size='md'
						w='full'
						cursor='pointer'
						_hover={{
							boxShadow: '0px 0px 0px black',
						}}
					>
						View More
					</Button>
				</Link>
			</Box>
		</Box>
	)
}
