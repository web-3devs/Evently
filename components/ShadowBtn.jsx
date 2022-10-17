import { Button } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'

export default function ShadowBtn({title,w,hoverBG,animate}) {
  const router = useRouter();
  return (
    <Button
    my={4}
    w={w ? w:"full"}
    colorScheme="white"
    color={"black"}
    border="1px"
    boxShadow="6px 6px 0px black"
    onClick={()=>{
      router.push('/EventDetail')
    }
      
    }
    rounded={"sm"}
    size="md"
    cursor="pointer"
    _hover={{
      bg:hoverBG?hoverBG :"purple.600",
      boxShadow:animate?"0px 0px 0px black":"6px 6px 0px black",
    }}
  >
    {title}
  </Button>
  )
}
