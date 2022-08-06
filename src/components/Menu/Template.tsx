import MenuPrincipal from "./MenuPrincipal";

export default function Template(Props) {
    return (
        <>
            <MenuPrincipal {...Props} />            
            
            <main>               
                {Props.children}                  
            </main>
        </>
    )
}