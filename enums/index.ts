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
    link: "https://accounts.shopify.com/signup?rid=50883a7c-de52-4436-9565-e2cd14987c79",
    buttonText: "Stage Ready Application"
  },
};