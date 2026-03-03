export const IMAGE_BASE_URL =
  (
    process.env.NEXT_PUBLIC_R2_BASE_URL ??
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL ??
    'https://pub-81e8ad22dc1f4213a0c54798e94af7b1.r2.dev'
  ).replace(/\/+$/, '');