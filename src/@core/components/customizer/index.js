// ** React Imports
import { useState } from "react";

// ** Third Party Components
import PerfectScrollbar from "react-perfect-scrollbar";

// ** MUI Imports
import Radio from "@mui/material/Radio";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiDrawer from "@mui/material/Drawer";

// ** Icon Imports
import Icon from "../icon";

// ** Hook Import
import { useSettings } from "../../hooks/useSettings";

const Toggler = styled(Box)(({ theme }) => ({
  right: 0,
  top: "50%",
  display: "flex",
  cursor: "pointer",
  position: "fixed",
  padding: theme.spacing(2),
  zIndex: theme.zIndex.modal,
  transform: "translateY(-50%)",
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  borderTopLeftRadius: theme.shape.borderRadius,
  borderBottomLeftRadius: theme.shape.borderRadius,
}));

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: 400,
  zIndex: theme.zIndex.modal,
  "& .MuiFormControlLabel-root": {
    marginRight: "0.6875rem",
  },
  "& .MuiDrawer-paper": {
    border: 0,
    width: 400,
    zIndex: theme.zIndex.modal,
    boxShadow: theme.shadows[9],
  },
}));

const CustomizerSpacing = styled("div")(({ theme }) => ({
  padding: theme.spacing(5, 6),
}));

const ColorBox = styled(Box)(({ theme }) => ({
  width: 45,
  height: 45,
  cursor: "pointer",
  margin: theme.spacing(2.5, 1.75, 1.75),
  borderRadius: theme.shape.borderRadius,
  transition:
    "margin .25s ease-in-out, width .25s ease-in-out, height .25s ease-in-out, box-shadow .25s ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
}));

const Customizer = () => {
  // ** State
  const [open, setOpen] = useState(false);

  // ** Hook
  const { settings, saveSettings } = useSettings();

  // ** Vars
  const { mode, appBarBlur, themeColor } = settings;

  const handleChange = (field, value) => {
    saveSettings({ ...settings, [field]: value });
  };

  return (
    <div className="customizer">
      <Toggler className="customizer-toggler" onClick={() => setOpen(true)}>
        <Icon icon="bx:cog" fontSize={20} />
      </Toggler>
      <Drawer open={open} hideBackdrop anchor="right" variant="persistent">
        <Box
          className="customizer-header"
          sx={{
            position: "relative",
            p: (theme) => theme.spacing(3.5, 5),
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, textTransform: "uppercase" }}
          >
            Theme Customizer
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Customize & Preview in Real Time
          </Typography>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              right: 20,
              top: "50%",
              position: "absolute",
              color: "text.secondary",
              transform: "translateY(-50%)",
            }}
          >
            <Icon icon="bx:x" fontSize={20} />
          </IconButton>
        </Box>
        <PerfectScrollbar options={{ wheelPropagation: false }}>
          <CustomizerSpacing className="customizer-body">
            <Typography
              component="p"
              variant="caption"
              sx={{ mb: 5, color: "text.disabled", textTransform: "uppercase" }}
            >
              Theming
            </Typography>

            <Box sx={{ mb: 5 }}>
              <Typography>Mode</Typography>
              <RadioGroup
                row
                value={mode}
                onChange={(e) => handleChange("mode", e.target.value)}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: ".875rem",
                    color: "text.secondary",
                  },
                }}
              >
                <FormControlLabel
                  value="light"
                  label="Light"
                  control={<Radio />}
                />
                <FormControlLabel
                  value="dark"
                  label="Dark"
                  control={<Radio />}
                />

                <FormControlLabel
                  value="semi-dark"
                  label="Semi Dark"
                  control={<Radio />}
                />
              </RadioGroup>
            </Box>

            <div>
              <Typography>Primary Color</Typography>
              <Box sx={{ display: "flex" }}>
                <ColorBox
                  onClick={() => handleChange("themeColor", "primary")}
                  sx={{
                    backgroundColor: "#696CFF",
                    ...(themeColor === "primary"
                      ? {
                          width: 53,
                          height: 53,
                          m: (theme) => theme.spacing(1.5, 0.75, 0),
                        }
                      : {}),
                  }}
                />
                <ColorBox
                  onClick={() => handleChange("themeColor", "secondary")}
                  sx={{
                    backgroundColor: "secondary.main",
                    ...(themeColor === "secondary"
                      ? {
                          width: 53,
                          height: 53,
                          m: (theme) => theme.spacing(1.5, 0.75, 0),
                        }
                      : {}),
                  }}
                />
                <ColorBox
                  onClick={() => handleChange("themeColor", "success")}
                  sx={{
                    backgroundColor: "success.main",
                    ...(themeColor === "success"
                      ? {
                          width: 53,
                          height: 53,
                          m: (theme) => theme.spacing(1.5, 0.75, 0),
                        }
                      : {}),
                  }}
                />
                <ColorBox
                  onClick={() => handleChange("themeColor", "error")}
                  sx={{
                    backgroundColor: "error.main",
                    ...(themeColor === "error"
                      ? {
                          width: 53,
                          height: 53,
                          m: (theme) => theme.spacing(1.5, 0.75, 0),
                        }
                      : {}),
                  }}
                />
                <ColorBox
                  onClick={() => handleChange("themeColor", "warning")}
                  sx={{
                    backgroundColor: "warning.main",
                    ...(themeColor === "warning"
                      ? {
                          width: 53,
                          height: 53,
                          m: (theme) => theme.spacing(1.5, 0.75, 0),
                        }
                      : {}),
                  }}
                />
                <ColorBox
                  onClick={() => handleChange("themeColor", "info")}
                  sx={{
                    backgroundColor: "info.main",
                    ...(themeColor === "info"
                      ? {
                          width: 53,
                          height: 53,
                          m: (theme) => theme.spacing(1.5, 0.75, 0),
                        }
                      : {}),
                  }}
                />
              </Box>
            </div>
          </CustomizerSpacing>

          <Divider sx={{ m: "0 !important" }} />

          <CustomizerSpacing className="customizer-body">
            <Typography
              component="p"
              variant="caption"
              sx={{ mb: 5, color: "text.disabled", textTransform: "uppercase" }}
            >
              Layout
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>AppBar Blur</Typography>
              <Switch
                name="appBarBlur"
                checked={appBarBlur}
                onChange={(e) => handleChange("appBarBlur", e.target.checked)}
              />
            </Box>
          </CustomizerSpacing>

          <Divider sx={{ m: "0 !important" }} />
        </PerfectScrollbar>
      </Drawer>
    </div>
  );
};

export default Customizer;
