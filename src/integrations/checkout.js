/* @flow */

import { config } from '../config';
import { FUNDING, PAYMENT_TYPE } from '../constants';

export function determineParameterFromToken(token : string) : string {
    return (token && token.indexOf('BA-') === 0) ? 'ba_token' : 'token';
}

export function getPaymentType(payment : string) : string {
    if (payment.indexOf('BA-') === 0) {
        return PAYMENT_TYPE.BA_TOKEN;
    } else if (payment.indexOf('PAY-') === 0 || payment.indexOf('PAYID-') === 0) {
        return PAYMENT_TYPE.PAY_ID;
    } else if (payment.indexOf('EC-') === 0) {
        return PAYMENT_TYPE.EC_TOKEN;
    }

    return PAYMENT_TYPE.EC_TOKEN;
}

export function determineUrl(env : string, fundingSource : ?string, payment : string) : string {

    let paymentType = getPaymentType(payment);

    if (paymentType === PAYMENT_TYPE.BA_TOKEN) {
        return config.billingUrls[env];
    }

    if (fundingSource === FUNDING.CARD || fundingSource === FUNDING.ELV) {
        return config.guestUrls[env];
    }

    if (fundingSource === FUNDING.IDEAL) {
        return config.altpayUrls[env];
    }

    if (fundingSource === FUNDING.BAIDU) {
        return config.checkoutUrls[env];
    }


    return config.checkoutUrls[env];
}
