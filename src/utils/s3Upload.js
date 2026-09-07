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

  // axios.put serializa el Blob de React Native con JSON.stringify (manda su
  // representación interna { _data: { blobId, size, ... } } en vez de los bytes
  // reales), corrompiendo el archivo subido a S3. fetch maneja el Blob de forma
  // nativa vía el módulo de Blob de RN, así que hay que usarlo para este PUT.
  const uploadResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {'Content-Type': contentType},
    body: blob,
  });

  if (!uploadResponse.ok) {
    throw new Error(
      `No se pudo subir el archivo a S3 (status ${uploadResponse.status})`,
    );
  }
};
