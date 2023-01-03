// ** React Imports
import { Fragment } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import uploadDark from "../../../public/images/pages/upload-dark.png";
import uploadLight from "../../../public/images/pages/upload-light.png";
import Image from "next/image";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Icon from "@core/components/icon";
import List from "@mui/material/List";

// ** Third Party Imports
import { useDropzone } from "react-dropzone";

const FileUploader = ({
  setTestStatus,
  testIndex,
  testStatus,
}) => {

  // ** Hook
  const theme = useTheme();


  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    onDrop: (acceptedFiles) => {
      const newValue = [...testStatus];
      newValue[testIndex] = {
        ...testStatus[testIndex],
        file: acceptedFiles.map((file) => Object.assign(file)),
      };
      setTestStatus(newValue);
    },
  });

  const handleLinkClick = (event) => {
    event.preventDefault();
  };

  const renderFilePreview = (file) => {
    if (file[0].type.startsWith("image")) {
      return (
        <img
          width={38}
          height={38}
          alt={file[0].name}
          src={URL.createObjectURL(file[0])}
        />
      );
    } else {
      return <Icon icon="bx:file" />;
    }
  };

  const handleRemoveFile = (file) => {
    const filtered = testStatus.findIndex((val) => val.file[0] !== file.name);
    const newValue = [...testStatus];
    newValue[filtered] = {
      ...testStatus[filtered],
      file: [],
    };
    setTestStatus(newValue);
  };

  const fileList = testStatus.map((value, index) => (
    <ListItem key={index}>
      <div
        className="file-details"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div
          className="file-preview"
          style={{ display: "flex", alignItems: "center" }}
        >
          {value.file.length > 0 && renderFilePreview(value.file)}{" "}
          <Typography sx={{ ml: 5 }} className="file-name">
            {value.file.length > 0 && value.file[0].name}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(value.file)}>
        <Icon icon="bxs-trash-alt" fontSize={20} />
      </IconButton>
    </ListItem>
  ));
  return (
    <Fragment>
      <Box
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            padding: " 1rem",
            borderRadius: "6px",
            border: "2px dashed rgba(93, 89, 98, 0.22)",
          }}
        >
          <Image
            alt="Upload img"
            src={theme.palette.mode == "light" ? uploadLight : uploadDark}
            height={100}
          />
          <Typography color="textSecondary">
            Drop files here or click{" "}
            <Link href="/" onClick={handleLinkClick}>
              browse
            </Link>{" "}
            through your machine
          </Typography>
        </Box>
      </Box>
      {testStatus[testIndex].file.length ? (
        <Fragment>
          <List>
            {" "}
            <ListItem>
              <div
                className="file-details"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div
                  className="file-preview"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {testStatus[testIndex].file.length > 0 &&
                    renderFilePreview(testStatus[testIndex].file)}{" "}
                  <Typography sx={{ ml: 5 }} className="file-name">
                    {testStatus[testIndex].file.length > 0 &&
                      testStatus[testIndex].file[0].name}
                  </Typography>
                </div>
              </div>
              <IconButton
                onClick={() => handleRemoveFile(testStatus[testIndex].file)}
              >
                <Icon icon="bxs-trash-alt" fontSize={20} />
              </IconButton>
            </ListItem>
          </List>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default FileUploader;
