// ** Next Imports
import Link from "next/link";

// ** MUI Components
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";

// ** Icon Imports
import Icon from "../../src/@core/components/icon";

import themeConfig from "configs/themeConfig";
import BlankLayout from "@core/layouts/BlankLayout";
import { useSettings } from "@core/hooks/useSettings";
// import forgetBackground from "../../public/images/pages/forgetPassword-background.png";
// import BoyWithPhone from "../../public/images/pages/boy-with-phone.png";
import loginImage from "../../public/images/pages/boy-with-phone.png"
import Image from "next/image";

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

const ForgotPassword = () => {
  // ** Hooks
  const theme = useTheme();
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down("lg"));

  // ** Var
  const { skin } = settings;

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
            // position:"relative",
          }}
        >
          {/* <ForgotPasswordIllustration
            width={700}
            // alt='forgot-password-illustration'
            src={`../../public/images/pages/girl-unlock-password-${theme.palette.mode}.png`}
          /> */}
          <Image
            src={loginImage}
            alt="forgot-password-illustration"
            placeholder="blur"
            width={700}
            style={{ height: "auto", maxWidth: "100%",}}
          />
          {/* <Image src={BoyWithPhone}   alt="forgot-password-illustration" placeholder='blur' height={"100%"} width={700} style={{position:"absolute"}}/> */}
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
              {themeConfig.templateName}!
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            Forgot Password? 🔒
          </Typography>
          <Typography sx={{ mb: 6, color: "text.secondary" }}>
            Enter your email and we&prime;ll send you instructions to reset your
            password
          </Typography>
          <form
            noValidate
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField
              autoFocus
              type="email"
              label="Email"
              sx={{ display: "flex", mb: 6 }}
            />
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ mb: 4 }}
            >
              Send reset link
            </Button>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link passHref href="/login">
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
