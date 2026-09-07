import axios from 'axios';

const ensureFileUri = uri => {
  if (!uri) {
    return uri;
  }
  return uri.startsWith('file://') || uri.startsWith('http')
    ? uri
    : `file://${uri}`;
};

export const uploadFileToS3 = async ({uploadUrl, fileUri, contentType}) => {
  const fileResponse = await fetch(ensureFileUri(fileUri));
  const blob = await fileResponse.blob();

  await axios.put(uploadUrl, blob, {
    headers: {'Content-Type': contentType},
  });
};
