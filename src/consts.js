export const PROFILE_PLACEHOLDER_IMAGE =
  "https://res.cloudinary.com/baygram/image/upload/v1740199037/profile_placeholder.jpg";
export const COVER_PLACEHOLDER_IMAGE =
  "https://res.cloudinary.com/baygram/image/upload/v1740199211/cover_image_placeholder.jpg";

export const AMOUNT_PATTERNS = {
  PATTERN: /^(0(?!\.00)|[1-9]\d{0,6})(?:\.\d{1,2})?$/,
  PARSER: /\$\s?|(,*)/g,
  FORMATTER: /\B(?=(\d{3})+(?!\d))/g,
};
export const LOCAL_STORAGE = {
  TOKEN: "auth_token",
};

export const MESSAGES = {
  LOGIN: {
    ERROR: {
      EMAIL:
        "The email address you entered doesn't match our records. Please double-check your spelling or create an account if you don't already have one.",
      PASSWORD:
        "The password you entered is incorrect. Please try again or reset your password if you've forgotten it.",
    },
  },
};
