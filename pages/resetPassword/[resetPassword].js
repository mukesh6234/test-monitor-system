// ** Next Imports
import Link from "next/link";

// ** MUI Components
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import Icon from "../../src/@core/components/icon";
import toast from "react-hot-toast";
import themeConfig from "configs/themeConfig";
import BlankLayout from "@core/layouts/BlankLayout";
import { useSettings } from "@core/hooks/useSettings";
import resetPasswordImage from "../../public/images/pages/boy-with-laptop.png";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormControl } from "@mui/material";
import { newPassword } from "../api/authentication";
import TextInput from "@core/components/input/textInput";
import { useRouter } from "next/router";
import katoIcon from "../../public/images/pages/kato-icon.png";

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
  password: yup.string().required(),
});

const defaultValues = {
  password: "",
};

const RestPassword = () => {
  // ** Hooks
  const theme = useTheme();
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down("lg"));

  const router = useRouter();

  const { resetPassword } = router.query;

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
    newPassword(resetPassword, data)
      .then(({ message }) => {
        toast.success(message);
        router.push(`/login`);
      })
      .catch((err) => {
        setError("password", {
          type: "manual",
          message: err[1] ? err[1]?.data : err.message,
        });
        if (err[1]) {
          toast.error(err[1] ? err[1]?.data[0] : "Something not right");
        } else {
          toast.error(err.message);
        }
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
            src={resetPasswordImage}
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
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    label={"New Password"}
                    fullWidth
                    placeholder={"Enter your New Password"}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    errors={Boolean(errors.password)}
                    helperText={errors.password && errors.password.message}
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
              Reset Password
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
RestPassword.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
RestPassword.guestGuard = true;

export default RestPassword;
