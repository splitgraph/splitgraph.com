// WIP - proof of concept

export const upload = async (
  myBlob: ArrayBuffer,
  url: string,
  updateProgress?: (number) => {}
) => {
  // const blob = new Blob([new Uint8Array(10 * 1024 * 1024)]); // dummy
  const blob = new Blob([myBlob]);
  const totalBytes = blob.size;
  let bytesUploaded = 0;

  const blobReader = blob.stream().getReader();
  const progressTrackingStream = new ReadableStream({
    async pull(controller) {
      const result = await blobReader.read();
      if (result.done) {
        console.log("completed stream");
        controller.close();
        return;
      }
      controller.enqueue(result.value);
      bytesUploaded += result.value.byteLength;

      if (typeof updateProgress === "function") {
        updateProgress(bytesUploaded / totalBytes);
      } else {
        console.log("upload progress:", bytesUploaded / totalBytes);
      }
    },
  });
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/octet-stream",
    },
    body: progressTrackingStream,
  });
  console.log("success:", response.ok);
  return response;
};

// upload().catch(console.error);
