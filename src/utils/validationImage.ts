export const validateFileType = (fileList: FileList) => {
  const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
  if (!fileList || fileList.length === 0) {
    return false;
  }
  const file = fileList[0];
  return ALLOWED_TYPES.includes(file.type);
};

export const validateFileSize = (fileList: FileList) => {
  const MAX_SIZE = 1024 * 1024;
  if (!fileList || fileList.length === 0) {
    return false;
  }
  const file = fileList[0];
  return file.size <= MAX_SIZE;
};

export const fileRequired = (fileList: FileList) => {
  if (!fileList || fileList.length === 0) {
    return false;
  }
  return true;
};
