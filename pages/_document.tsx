import Document, {Head, Html, Main, NextScript} from "next/document";

class MyDocument extends Document{
    render(): JSX.Element {
        return(
             <Html lang="en">
        <Head>
            <meta name='description' content="E-commerce site made for demo purpose"/>
            
            <body>
                <Main />
                <NextScript />    
            </body> 
        </Head>
    </Html>
        )
    }
}

export default MyDocument