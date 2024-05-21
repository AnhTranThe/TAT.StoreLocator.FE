import { Image } from "primereact/image";
import { MenuProvider } from "../../pages/context/menucontext";

export default function ClientAppMenu() {


    return (
        <>
            <section className="flex justify-content-center align-items-center w-full align-items-start py-6">
                <Image src="https://admin.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10400?size=xxlarge" alt="Image" width="50" />



            </section>
            <MenuProvider>
                <ul className="layout-menu">

                </ul>
            </MenuProvider>

        </>

    );
}
