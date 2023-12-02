export const validateFile = (fileList: FileList) => {
  const MAX_SIZE = 1024 * 1024;
  const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

  if (!fileList || fileList.length === 0) {
    return false;
  }

  const file = fileList[0];
  const isSizeValid = file.size <= MAX_SIZE;
  const isTypeValid = ALLOWED_TYPES.includes(file.type);

  return isSizeValid && isTypeValid;
};
