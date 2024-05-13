/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ClientAppTopbar from "./ClientAppTopbar";
import ClientAppFooter from "./ClientAppFooter";


export default function ClientAppLayout(props: any) {


    return (
        <React.Fragment>

            <ClientAppTopbar />
            <div className="layout-main">{props.children}</div>
            <ClientAppFooter />


        </React.Fragment>
    );
}
