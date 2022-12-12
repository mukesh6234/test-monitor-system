// ** Next Imports
import Link from "next/link";

// ** MUI Components
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";

// ** Icon Imports
import Icon from "../../src/@core/components/icon";
import toast from "react-hot-toast";
import themeConfig from "configs/themeConfig";
import BlankLayout from "@core/layouts/BlankLayout";
import { useSettings } from "@core/hooks/useSettings";
import forgetPasswordImage from "../../public/images/pages/girl-unlock-password.png";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { forgotPassword } from "../api/authentication";
import { FormControl } from "@mui/material";
import { useRouter } from "next/router";
import TextInput from "@core/components/input/textInput";
import katoIcon from "../../public/images/pages/kato-icon.png";


// Styled Components
const ForgotPasswordIllustration = styled("img")({
  height: "auto",
  maxWidth: "100%",
});

const RightWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up("lg")]: {
    maxWidth: 480,
  },
  [theme.breakpoints.up("xl")]: {
    maxWidth: 635,
  },
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(12),
  },
}));

const LinkStyled = styled("a")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  justifyContent: "center",
  color: theme.palette.primary.main,
}));

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const defaultValues = {
  email: "",
};

const ForgotPassword = () => {
  // ** Hooks
  const theme = useTheme();
  const { settings } = useSettings();

  const hidden = useMediaQuery(theme.breakpoints.down("lg"));

  const router = useRouter();

  const { skin } = settings;

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { email } = data;
    let otpEmail = { user_name: email };
    forgotPassword(otpEmail)
      .then(({ message, data }) => {
        toast.success(message);
        router.push(`/verifyOTP/${data}`);
      })
      .catch((err) => {
        setError("email", {
          type: "manual",
          message: err[1] ? err[1]?.data : err.message,
        });
      });
  };

  return (
    <Box className="content-right">
      {!hidden ? (
        <Box
          sx={{
            p: 12,
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={forgetPasswordImage}
            alt="forgot-password-illustration"
            width={700}
            style={{ height: "auto", maxWidth: "100%" }}
          />
        </Box>
      ) : null}
      <RightWrapper
        sx={{
          ...(skin === "bordered" &&
            !hidden && { borderLeft: `1px solid ${theme.palette.divider}` }),
        }}
      >
        <Box sx={{ mx: "auto", maxWidth: 400 }}>
          <Box sx={{ mb: 8, display: "flex", alignItems: "center" }}>
            <Image src={katoIcon} height={32} alt="kato-logo" />
            <Typography
              variant="h5"
              sx={{
                ml: 2,
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: "-0.45px",
                textTransform: "lowercase",
                fontSize: "1.75rem !important",
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            Forgot Password? 🔒
          </Typography>
          <Typography sx={{ mb: 6, color: "text.secondary" }}>
            Enter your email and we&prime;ll send you instructions to reset your
            password
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    label={"Email"}
                    fullWidth
                    autoFocus={true}
                    placeholder={"Enter your email address"}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    errors={Boolean(errors.email)}
                    helperText={errors.email && errors.email.message}
                  />
                )}
              />
            </FormControl>
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ mb: 4 }}
            >
              Send OTP
            </Button>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link passHref href="/login" style={{ textDecoration: "none" }}>
                <LinkStyled>
                  <Icon icon="bx:chevron-left" />
                  <span>Back to login</span>
                </LinkStyled>
              </Link>
            </Typography>
          </form>
        </Box>
      </RightWrapper>
    </Box>
  );
};
ForgotPassword.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
ForgotPassword.guestGuard = true;

export default ForgotPassword;
