import Document, {Head, Html, Main, NextScript} from "next/document";

class MyDocument extends Document{
    render(): JSX.Element {
        return(
             <Html lang="en">
        <Head>
            <meta name='description' content="E-commerce site made for demo purpose"/>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" />
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" />
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