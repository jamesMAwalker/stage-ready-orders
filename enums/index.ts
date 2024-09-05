/**
 * * ENUMS *
 * This file contains all the enums used in the application.
 * 
 * The enums are used to define the possible values for a variable.
 * They are also used to define the possible values for a function parameter.
 */

export const ELoginErrors: Record<string, IError> = {
  NOT_A_SHOPIFY_CUSTOMER: {
    code: "NOT_A_SHOPIFY_CUSTOMER",
    title: "Not a Shopify Customer",
    message: "Your email is not associated with a Shopify account. Please try a different email or sign up at Shopify with this email.",
    link: "https://shopify.com/59073003681/identity/lookup?destination_uuid=48778b34-118c-483e-93e5-1359d683f620&redirect_uri=https%3A%2F%2Fshopify.com%2F59073003681%2Faccount%2Fcallback&rid=2d8c38a7-a0a4-48b4-9580-8ead39e7937c&ui_locales=en&verify=1725327029-Rjsm4QabepEMBVjrwmMxKflrPtkfSoRrNF%2F2hJw85DU%3D",
    buttonText: "Create a Shopify Account"
  },
  NOT_A_STAGE_READY_CUSTOMER: {
    code: "NOT_A_STAGE_READY_CUSTOMER",
    title: "Not a Stage Ready Customer",
    message: "Your account has not been approved for the Stage Ready Program. Visit the link below to apply for access.",
    link: "https://standingocosmetics.com/pages/stage-ready-teams",
    buttonText: "Stage Ready Application"
  },
};

export const ELoginStatus: Record<string, ILoginStatus> = {
  VALID_LOGIN: {
    code: "VALID_LOGIN",
    title: "This email is associated with a Shopify account and is part of the Stage Ready Program.",
    message: "Account is Stage Ready! Continue to sign up.",
    link: "",
    buttonText: "Sign Up"
  },
  EXISTING_CLERK_ACCOUNT: {
    code: "EXISTING_CLERK_ACCOUNT",
    title: "This email already has an account.",
    message: "This email already has an account. Please sign in to continue.",
    link: `/sign-in`,
    buttonText: "Sign In"
  },
  NOT_A_SHOPIFY_CUSTOMER: {
    code: "NOT_A_SHOPIFY_CUSTOMER",
    title: "Not a Shopify Customer",
    message: "Your email is not associated with a Shopify account. Please try a different email or sign up at Shopify with this email.",
    link: "https://shopify.com/59073003681/identity/lookup?destination_uuid=48778b34-118c-483e-93e5-1359d683f620&redirect_uri=https%3A%2F%2Fshopify.com%2F59073003681%2Faccount%2Fcallback&rid=a7156ac7-7c97-46a7-8462-d0418fbb493b&ui_locales=en&verify=1725505102-0bTqiOLrNAeP2Viv%2FiCoB8s5lbHUSHGHsEpDCFlqGMY%3D",
    buttonText: "Create a Shopify Account"
  },
  NOT_A_STAGE_READY_CUSTOMER: {
    code: "NOT_A_STAGE_READY_CUSTOMER",
    title: "Not a Stage Ready Customer",
    message: "Your account has not been approved for the Stage Ready Program. Visit the link below to apply for access.",
    link: "https://api.collabs.shopify.com/creator/signup/community_application/D6APXfVLVP4?origin=THEME_EXTENSION",
    buttonText: "Stage Ready Application"
  },
};