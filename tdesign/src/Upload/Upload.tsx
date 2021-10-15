import { useCallback, useMemo, CSSProperties } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Box, Typography } from "@material-ui/core";
import type { BoxProps } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import { Button, LinkButton } from "../Button";
import UploadCloudIcon from "./UploadCloudIcon";
// import { upload } from "./uploadHelper";

interface IUploadProps extends BoxProps {
  uploadHandler?: () => {};
  maxSizeMB?: number;
  maxFiles?: number;
  accept?: string;
}

const Upload = ({
  sx = {},
  maxSizeMB = 100,
  maxFiles = 8,
  accept,
  ...rest
}: IUploadProps) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept,
    maxFiles,
  });
  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const style: CSSProperties = useMemo(
    () => ({
      width: "100%",
      background:
        "linear-gradient(0deg, rgba(42, 129, 246, 0.02), rgba(42, 129, 246, 0.02)), #FFFFFF",
      borderWidth: "1px",
      borderStyle: "dashed",
      borderColor: "#C0C3CC",
      borderRadius: "4px",
      ...(isDragActive
        ? {
            borderColor: "#2A81F6",
            boxShadow: "inset 0px 0px 80px rgba(42, 129, 246, 0.1)",
          }
        : {}),
      ...(isDragAccept ? { borderColor: "green" } : {}),
      ...(isDragReject ? { borderColor: "red" } : {}),
    }),
    [isDragActive, isDragAccept, isDragReject]
  );

  return (
    <Box
      sx={{
        ".dropzone": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginY: "1rem",
          padding: "1rem",
        },
      }}
      {...rest}
    >
      <Typography variant="title1">Upload</Typography>
      <br />
      <Typography variant="body">
        You can select multiple CSVs to upload. Each CSV will correspond to its
        own table within the repository.
      </Typography>
      <br />
      <div className="dropzone" {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <UploadCloudIcon isDragActive={isDragActive} />
        <Typography variant="subtitle2">
          Drag and drop up to {maxFiles} files
          <br />
          or <LinkButton>browse to choose a file</LinkButton>
        </Typography>
      </div>
      <ul>{files}</ul>{" "}
      <Button
        fullWidth
        endIcon={
          <ArrowForward
            sx={{ position: "absolute", right: "15px", top: "10px" }}
          />
        }
        disabled={!acceptedFiles?.length}
        sx={{ height: "40px" }}
        onClick={() => {
          // TODO: pass blob or blobs into upload(blog)
          // upload(binaryStr, "https://httpbin.org/put").catch((err) =>
          //   console.error(err)
          // );
          // TODO: call uploadHandler() (consider if we need to)
        }}
      >
        {!acceptedFiles?.length
          ? "Add files to continue"
          : `Continue with ${acceptedFiles?.length} file${
              acceptedFiles?.length > 1 ? "s" : ""
            }`}
      </Button>
      {isDragAccept && <div>will be accepted</div>}
      {isDragReject && <div>will be rejected</div>}
    </Box>
  );
};
export default Upload;
