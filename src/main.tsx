import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/primereact.css'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.tsx'
import { persistor, store } from './store/store.ts'
import './styles/demo/Demos.scss'
import './styles/layout/layout.scss'
import './styles/style/style.scss'
import 'primereact/resources/themes/soho-light/theme.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <PrimeReactProvider >
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </PrimeReactProvider>
)
