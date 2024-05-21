/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ClientAppFooter from "./ClientAppFooter";
import ClientAppTopbar from "./ClientAppTopbar";


export default function ClientAppLayout(props: any) {


    return (
        <React.Fragment >
            <div className="flex flex-column min-h-screen ">
                <ClientAppTopbar />
                <main style={{ height: 'calc(100vh -10rem)' }} className="flex-1 " >
                    {props.children}
                </main>
                <ClientAppFooter />
            </div>
        </React.Fragment>
    );
}
