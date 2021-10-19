import { useMemo, CSSProperties } from "react";
// import "react-dropzone-uploader/dist/styles.css";
import Dropzone, {
  IFileWithMeta,
  IUploadParams,
  ILayoutProps,
  IInputProps,
  ISubmitButtonProps,
} from "react-dropzone-uploader";
import filesize from "filesize";
import { Box, Typography, Grid, IconButton } from "@material-ui/core";
import type { BoxProps } from "@material-ui/core";
import {
  ArrowForward,
  CheckCircleOutline,
  Close,
  FileUpload,
} from "@material-ui/icons";
import { Button, LinkButton } from "../Button";
import UploadCloudIcon from "./UploadCloudIcon";

// import { upload } from "./uploadHelper";

interface IUploadProps extends BoxProps {
  maxSizeBytes?: number;
  maxFiles?: number;
  accept?: string;
  getUploadParams?: (
    file: IFileWithMeta
  ) => IUploadParams | Promise<IUploadParams>;
  handleSubmit?: (
    successFiles: IFileWithMeta[],
    allFiles: IFileWithMeta[]
  ) => void;
}

const Upload = ({
  maxSizeBytes = 102400,
  maxFiles = 8,
  accept,
  getUploadParams,
  handleSubmit,
}: IUploadProps) => {
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log("handleChangeStatus()", status, meta, file);
  };

  const Layout = ({
    input,
    submitButton,
    dropzoneProps,
    files,
    extra: { maxFiles },
  }: ILayoutProps) => {
    return (
      <div {...dropzoneProps}>
        <Typography variant="title1">Upload</Typography>
        <br />
        <Typography variant="body">
          You can select multiple CSVs to upload. Each CSV will correspond to
          its own table within the repository.
        </Typography>
        <br />
        {files.length < maxFiles && input}
        <Box sx={{ marginBottom: "1rem" }}>{submitButton}</Box>
        {!!files?.length && (
          <section>
            <Typography variant="smallHighlightedSB" sx={{ fontSize: "14px" }}>
              Files
            </Typography>{" "}
            <Typography
              variant="smallHighlightedSB"
              sx={{ color: ({ palette }) => palette.grays.gray20.main }}
            >
              ({files?.length})
            </Typography>
            <FilesUploadList files={files} />
          </section>
        )}
      </div>
    );
  };

  const Input = ({ accept, extra: { active, reject } }: IInputProps) => {
    const style: CSSProperties = useMemo(
      () => ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1rem",
        marginBottom: "1rem",
        padding: "1rem",
        width: "100%",
        background:
          "linear-gradient(0deg, rgba(42, 129, 246, 0.02), rgba(42, 129, 246, 0.02)), #FFFFFF",
        borderWidth: "1px",
        borderStyle: "dashed",
        borderColor: "#C0C3CC",
        borderRadius: "4px",
        ...(active
          ? {
              borderColor: "#2A81F6",
              boxShadow: "inset 0px 0px 80px rgba(42, 129, 246, 0.1)",
            }
          : {}),
        ...(reject ? { borderColor: "red" } : {}),
      }),
      [active, reject]
    );

    return (
      <div style={style}>
        <UploadCloudIcon active={active} />
        <Typography variant="subtitle2">
          Drag and drop up to {maxFiles} files
          <br />
          or{" "}
          <LinkButton onClick={() => document.getElementById("upload").click()}>
            browse to choose a file
          </LinkButton>
        </Typography>
        <input
          id="upload"
          style={{ display: "none" }}
          type="file"
          accept={accept}
        />
      </div>
    );
  };

  const SubmitButton = ({ files, onSubmit }: ISubmitButtonProps) => {
    return (
      <Button
        fullWidth
        endIcon={
          <ArrowForward
            sx={{ position: "absolute", right: "15px", top: "10px" }}
          />
        }
        disabled={!files?.length}
        sx={{ height: "40px" }}
        onClick={() => {
          onSubmit(files);
        }}
      >
        {!files?.length
          ? "Add files to continue"
          : `Continue with ${files?.length} file${
              files?.length > 1 ? "s" : ""
            }`}
      </Button>
    );
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onSubmit={handleSubmit}
      onChangeStatus={handleChangeStatus}
      autoUpload={false}
      LayoutComponent={Layout}
      InputComponent={Input}
      SubmitButtonComponent={SubmitButton}
      maxFiles={maxFiles}
      maxSizeBytes={maxSizeBytes}
      accept={accept}
      disabled={(files) =>
        files.some((f) =>
          ["preparing", "getting_upload_params", "uploading"].includes(
            f.meta.status
          )
        )
      }
    />
  );
};
export default Upload;

const FilesUploadList = ({ files }: { files: IFileWithMeta[] }) => {
  console.log("FilesUploadList files", files);
  return (
    <Grid
      container
      spacing={2}
      sx={{
        ".fileRow": {},
      }}
    >
      {files?.map((f) => (
        <Grid key={f.meta.name} item xs={12} md={6}>
          <FileRow {...f} />
        </Grid>
      ))}
    </Grid>
  );
};

const FileRow = ({ meta: { name, size, percent }, remove, restart }) => {
  const success = percent === 1;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "13px",
        borderRadius: "4px",
        width: "100%",
        backgroundColor: () => {
          if (success) return "green";
          // if (error) return "red";
          return undefined;
        },
      }}
    >
      <div>
        {!!percent && <Typography variant="small">{percent}</Typography>}
        {percent === 1 && <CheckCircleOutline sx={{ color: "#43766C" }} />}
        <Typography variant="smallHighlightedSB">{name}</Typography>{" "}
        <Typography variant="small">{filesize(size)}</Typography>
      </div>

      <div>
        <IconButton aria-label="remove file" onClick={restart}>
          <FileUpload />
        </IconButton>
        <IconButton aria-label="remove file" onClick={remove}>
          <Close />
        </IconButton>
      </div>
    </Box>
  );
};
