/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export const wrapRootElement = ({ element }) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey='6LdVPM0ZAAAAAMVvO6UH_3mxqq9ZlYc-VVfaQQ7g'>
      {element}
    </GoogleReCaptchaProvider>
  )
}