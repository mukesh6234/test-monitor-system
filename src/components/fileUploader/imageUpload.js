// ** React Imports
import { Fragment, useState, useEffect } from "react";

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

// Styled component for the upload image inside the dropzone area

// Styled component for the heading inside the dropzone area

const FileUploader = ({ onChange }) => {
  // ** State
  const [files, setFiles] = useState([]);

  // ** Hook
  const theme = useTheme();

  useEffect(() => {
    onChange(files);
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
    },
  });

  const handleLinkClick = (event) => {
    event.preventDefault();
  };

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return (
        <img
          width={38}
          height={38}
          alt={file.name}
          src={URL.createObjectURL(file)}
        />
      );
    } else {
      return <Icon icon="bx:file" />;
    }
  };

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };
  
  const fileList = files.map((file) => (
    <ListItem key={file.name}>
      <div
        className="file-details"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div
          className="file-preview"
          style={{ display: "flex", alignItems: "center" }}
        >
          {renderFilePreview(file)}{" "}
          <Typography sx={{ ml: 5 }} className="file-name">
            {file.name}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon="bxs-trash-alt" fontSize={20} />
      </IconButton>
    </ListItem>
  ));

  return (
    <Box
      {...getRootProps({ className: "dropzone" })}
      //   sx={acceptedFiles.length ? { height: 450 } : {}}
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
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            // textAlign: ["center", "center", "inherit"],
          }}
        > */}
        {/* <HeadingTypography variant="h5">
            Drop files here or click to upload.
          </HeadingTypography> */}
        <Typography color="textSecondary">
          Drop files here or click{" "}
          <Link href="/" onClick={handleLinkClick}>
            browse
          </Link>{" "}
          thorough your machine
        </Typography>
        {/* </Box> */}
      </Box>
      {/* {files.length ? img : null} */}
      {files.length ? (
        <Fragment>
          <List>{fileList}</List>
        </Fragment>
      ) : null}
    </Box>
  );
};

export default FileUploader;
