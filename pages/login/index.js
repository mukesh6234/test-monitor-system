// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from '../../src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
// import { useAuth } from '../src/hooks/useAuth'
// import useBgColor from 'src/@core/hooks/useBgColor'
// import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
// import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useAuth } from 'hooks/useAuth'
import { useSettings } from '@core/hooks/useSettings'
import themeConfig from 'configs/themeConfig'
import BlankLayout from '@core/layouts/BlankLayout'
import loginImage from "../../public/images/pages/girl.png"
import Image from 'next/image'

// ** Styled Components
// const LoginIllustration = styled('img')({
//   height: 'auto',
//   maxWidth: '100%'
// })

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('lg')]: {
    maxWidth: 480
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 635
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(12)
  }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: '',
  email: ''
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('lg'))

  // ** Var
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    const { email, password } = data
    auth.login({ email, password }, () => {
      setError('email', {
        type: 'manual',
        message: 'Email or Password is invalid'
      })
    })
  }

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ p: 12, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* <LoginIllustration
            width={700}
            alt='login-illustration'
            src={`../images/pages/girl-with-laptop-${theme.palette.mode}.png`}
          /> */}
          <Image src={loginImage} alt='login-illustration' placeholder='blur' height={"100%"} width={700}/>
        </Box>
      ) : null}
      <RightWrapper
        sx={{ ...(skin === 'bordered' && !hidden && { borderLeft: `1px solid ${theme.palette.divider}` }) }}
      >
        <Box sx={{ mx: 'auto', maxWidth: 400 }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center' }}>
           
            <Typography
              variant='h5'
              sx={{
                ml: 2,
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: '-0.45px',
                textTransform: 'lowercase',
                fontSize: '1.75rem !important'
              }}
            >
              {themeConfig.templateName}!
            </Typography>
          </Box>
       
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>
            Please sign-in to your account and start the adventure
          </Typography>
         
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    label='Email'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder='Enter your email address'
                  />
                )}
              />
              {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                Password
              </InputLabel>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OutlinedInput
                    value={value}
                    onBlur={onBlur}
                    label='Password'
                    onChange={onChange}
                    id='auth-login-v2-password'
                    error={Boolean(errors.password)}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Icon fontSize={20} icon={showPassword ? 'bx:show' : 'bx:hide'} />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {errors.password && (
                <FormHelperText sx={{ color: 'error.main' }} id=''>
                  {errors.password.message}
                </FormHelperText>
              )}
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel
                label='Remember Me'
                control={<Checkbox />}
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem', color: 'text.secondary' } }}
              />
              <Link passHref href='/forgot-password'>
                <LinkStyled>Forgot Password?</LinkStyled>
              </Link>
            </Box>
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
              Sign in
            </Button>
           
           
          </form>
        </Box>
      </RightWrapper>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
