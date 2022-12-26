// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

// ** Layout Import
import BlankLayout from '../src/@core/layouts/BlankLayout'
import errorImage from "../public/images/pages/page-misc-error.png";
import Image from "next/image";

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))


const Error404 = () => {
  // ** Hooks

  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant='h4' sx={{ mb: 2 }}>
            Page Not Found :(
          </Typography>
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>
            Oops! 😖 The requested URL was not found on this server.
          </Typography>
          <Link passHref href='/'>
            <Button component='a' variant='contained'>
              Back to Home
            </Button>
          </Link>
        </BoxWrapper>
        <Image
          width="450"
          style={{ maxWidth: "100%", marginTop: 12 }}
          alt="error-illustration"
          src={errorImage}
        />
      </Box>
    </Box>
  )
}
Error404.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Error404
