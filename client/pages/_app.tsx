import { wrapper } from "@/store";
import { AppProps } from "next/app";
import { FC } from "react";

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
    <Component {...pageProps} />
);

export default wrapper.withRedux(WrappedApp);
