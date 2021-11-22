import { useMemo, CSSProperties } from "react";
import { Dropzone } from "@splitgraph/react-dropzone-uploader-wrapper";
import type {
  IFileWithMeta,
  IUploadParams,
  ILayoutProps,
  IInputProps,
  ISubmitButtonProps,
  IDropzoneProps,
} from "@splitgraph/react-dropzone-uploader-wrapper";
import prettyBytes from "pretty-bytes";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import type { BoxProps } from "@material-ui/core";
import {
  ArrowForward,
  CheckCircleOutline,
  WarningAmber,
  Close,
  FileUpload,
} from "@material-ui/icons";
import { Button, LinkButton } from "../Button";
import UploadCloudIcon from "./UploadCloudIcon";

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
  message?: string;
  small?: boolean;
  handleChangeStatus?: IDropzoneProps["onChangeStatus"];
}

const Upload = ({
  maxSizeBytes = 100_000_000,
  maxFiles = 8,
  accept,
  getUploadParams,
  handleSubmit,
  message,
  small,
  handleChangeStatus,
}: IUploadProps) => {
  const Layout = ({
    input,
    submitButton,
    dropzoneProps,
    files,
  }: ILayoutProps) => {
    return (
      <div {...dropzoneProps}>
        <Typography variant="title1">Upload</Typography>
        <br />
        {!!message && <Typography variant="body">{message}</Typography>}
        <br />
        {input}
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

  const Input = ({
    getFilesFromEvent,
    accept,
    multiple,
    disabled,
    onFiles,
    extra: { active, reject },
  }: IInputProps) => {
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
        {!small && <UploadCloudIcon active={active} />}
        <Typography variant="subtitle2">
          Drag and drop up to {`${maxFiles} file${maxFiles > 1 ? "s" : ""}`}
          <br />
          <LinkButton onClick={() => document.getElementById("upload").click()}>
            Browse to choose files
          </LinkButton>
        </Typography>
        {!!maxSizeBytes && (
          <Typography
            variant="smallHighlightedB"
            sx={{ color: ({ palette }) => palette.grays.gray24.main }}
          >
            (Up to {prettyBytes(maxSizeBytes)})
          </Typography>
        )}
        <input
          id="upload"
          style={{
            position: "fixed",
            top: "-50em",
          }}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={async (e) => {
            const target = e.target;
            const chosenFiles = await getFilesFromEvent(e);
            onFiles(chosenFiles);
            target.value = null;
          }}
        />
      </div>
    );
  };

  const SubmitButton = ({ files, onSubmit }: ISubmitButtonProps) => {
    const currentlyUploading = files.some(({ meta }) => {
      return meta.status === "uploading";
    });
    const allSucceeded = files.every(({ meta }) => {
      return meta.status === "done";
    });
    const fileSizeError = files.some(({ meta }) => {
      return meta.status === "error_file_size";
    });
    return (
      <Button
        type="submit"
        fullWidth
        endIcon={
          <ArrowForward
            sx={{ position: "absolute", right: "15px", top: "10px" }}
          />
        }
        disabled={fileSizeError || !files?.length || currentlyUploading}
        sx={{ height: "40px" }}
        onClick={() => {
          if (allSucceeded) {
            files.forEach((f) => {
              f.remove();
            });
          } else {
            onSubmit(files);
          }
        }}
      >
        {!files?.length
          ? "Add files to continue"
          : allSucceeded
          ? "OK"
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
  return (
    <Grid container spacing={2}>
      {files?.map((f) => (
        <Grid key={f.meta.name} item xs={12} md={6}>
          <FileRow {...f} />
        </Grid>
      ))}
    </Grid>
  );
};

const FileRow = ({
  meta: { name, size, percent, status },
  remove,
  restart,
}) => {
  const getPercent = (percent, status) => {
    if (percent < 100) {
      return (
        <Typography variant="small">
          {percent === 0 ? "0%" : `${percent?.toFixed(2)}%`}
        </Typography>
      );
    } else if (percent === 100 && status === "done") {
      return (
        <CheckCircleOutline sx={{ color: "#43766C", marginRight: ".5rem" }} />
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: ".5rem",
          borderRadius: "4px",
          width: "100%",
          backgroundColor: ({ palette }) => {
            if (status === "done") {
              return palette.surfaces.success.main;
            } else if (
              status === "exception_upload" ||
              status === "error_upload"
            ) {
              return palette.surfaces.error.main;
            } else {
              return undefined;
            }
          },
          ".left": {
            display: "flex",
          },
          ".right": {
            display: "flex",
          },
        }}
      >
        <div className={"left"}>
          {status === "error_upload" ||
          status === "exception_upload" ||
          status === "error_file_size" ? (
            <WarningAmber
              sx={{ color: ({ palette }) => palette.errorBackground.main }}
            />
          ) : (
            getPercent(percent, status)
          )}
          &nbsp;
          <Typography variant="smallHighlightedSB">{name}</Typography>&nbsp;
          <Typography variant="small">{prettyBytes(size)}</Typography>
        </div>
        <div className={"right"}>
          {/* <IconButton aria-label="remove file" onClick={restart}>
            <FileUpload />
          </IconButton> */}
          <IconButton aria-label="remove file" onClick={remove}>
            <Close />
          </IconButton>
        </div>
      </Box>
      {status === "uploading" && (
        <LinearProgress variant="determinate" value={percent} />
      )}
      {(status === "exception_upload" || status === "error_upload") && (
        <>
          <Typography
            variant="smallHighlightedB"
            sx={{ color: ({ palette }) => palette.errorBackground.main }}
          >
            Could not complete upload. Retry? &nbsp;
          </Typography>
          <IconButton aria-label="remove file" onClick={restart}>
            <FileUpload />
          </IconButton>
        </>
      )}
      {status === "error_file_size" && (
        <Typography
          variant="smallHighlightedB"
          sx={{ color: ({ palette }) => palette.errorBackground.main }}
        >
          Please check filesize
        </Typography>
      )}
    </div>
  );
};