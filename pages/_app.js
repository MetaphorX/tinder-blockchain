import '../styles/globals.css'
import {TinderProvider} from '../context/TinderContext'
import {MoralisProvider} from 'react-moralis'

function MyApp({ Component, pageProps }) {
  return(
<MoralisProvider
      serverUrl='https://zvnwqagrlkv7.usemoralis.com:2053/server'
      appId='tnetMmadhsLyIrobntJ4ET3kh69PlxGOoaYX4NKk'
    >
      <TinderProvider>
        <Component {...pageProps} />
      </TinderProvider>
    </MoralisProvider>
)}

export default MyApp



// serverUrl='https://zvnwqagrlkv7.usemoralis.com:2053/server'
    
// appId='tnetMmadhsLyIrobntJ4ET3kh69PlxGOoaYX4NKk'