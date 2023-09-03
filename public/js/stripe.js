/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51NkBEPEKgKtpIhKBpAFESvySH8y1abeeuNbaMYkb8DVKu5O1IFnRZjH9reVRtc8PxiEDhMlAVjjdioUFWSPwvPbJ00OlShKSP6',
  {
    apiVersion: '2020-08-27' // Update the API version
  }
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios.get(
      // Use axios.get instead of axios
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
