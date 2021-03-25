import React from "react";
import PropTypes from "prop-types";
declare global {
    interface Window {
        paypal: any;
    }
}
export interface PayPalButtonProps {
    amount?: number | string;
    currency?: number | string;
    shippingPreference?: "NO_SHIPPING" | "GET_FROM_FILE" | "SET_PROVIDED_ADDRESS";
    onSuccess?: Function;
    catchError?: Function;
    onError?: Function;
    createOrder?: Function;
    createSubscription?: Function;
    onApprove?: Function;
    style?: object;
    options?: PaypalOptions;
    onButtonReady?: Function;
}
export interface PayPalButtonState {
    isSdkReady: boolean;
}
export interface PaypalOptions {
    clientId?: string;
    merchantId?: string;
    currency?: number | string;
    intent?: string;
    commit?: boolean | string;
    vault?: boolean | string;
    component?: string;
    disableFunding?: string;
    disableCard?: string;
    integrationDate?: string;
    locale?: string;
    buyerCountry?: string;
    debug?: boolean | string;
}
declare class PayPalButton extends React.Component<PayPalButtonProps, PayPalButtonState> {
    static propTypes: {
        amount: PropTypes.Requireable<string | number>;
        currency: PropTypes.Requireable<string | number>;
        shippingPreference: PropTypes.Requireable<string>;
        onSuccess: PropTypes.Requireable<(...args: any[]) => any>;
        catchError: PropTypes.Requireable<(...args: any[]) => any>;
        onError: PropTypes.Requireable<(...args: any[]) => any>;
        createOrder: PropTypes.Requireable<(...args: any[]) => any>;
        createSubscription: PropTypes.Requireable<(...args: any[]) => any>;
        onApprove: PropTypes.Requireable<(...args: any[]) => any>;
        style: PropTypes.Requireable<object>;
        options: PropTypes.Requireable<PropTypes.InferProps<{
            clientId: PropTypes.Requireable<string>;
            merchantId: PropTypes.Requireable<string>;
            currency: PropTypes.Requireable<string | number>;
            intent: PropTypes.Requireable<string>;
            commit: PropTypes.Requireable<string | boolean>;
            vault: PropTypes.Requireable<string | boolean>;
            component: PropTypes.Requireable<string>;
            disableFunding: PropTypes.Requireable<string>;
            disableCard: PropTypes.Requireable<string>;
            integrationDate: PropTypes.Requireable<string>;
            locale: PropTypes.Requireable<string>;
            buyerCountry: PropTypes.Requireable<string>;
            debug: PropTypes.Requireable<string | boolean>;
        }>>;
        onButtonReady: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: {
        style: {};
        options: {
            clientId: string;
            currency: string;
        };
        shippingPreference: string;
    };
    constructor(props: PayPalButtonProps);
    componentDidMount(): void;
    createOrder(data: any, actions: any): any;
    onApprove(data: any, actions: any): any;
    render(): JSX.Element;
    private addPaypalSdk;
}
export { PayPalButton };
