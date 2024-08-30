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
    message: "Your email is not associated with a Shopify account. Please try a different email or sign up at Shopify with this email."
  },
  NOT_A_STAGE_READY_CUSTOMER: {
    code: "NOT_A_STAGE_READY_CUSTOMER",
    title: "Not a Stage Ready Customer",
    message: "Your account has not been approved for the Stage Ready Program. Visit the link below to apply for access.",
    link: "https://standingocosmetics.com/pages/stage-ready-teams"
  },
};