async function checkFileExists(bucketName: string, filePath: string) {
  // const {data, error} = await
}

const getProfilePicURL = (ownerId: string, imageId: string): string =>
  `profile-pic/${ownerId}/${imageId}.png`
