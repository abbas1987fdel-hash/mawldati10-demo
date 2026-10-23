import {createRoot} from 'react-dom/client';
import App from './App';
import {DemoProvider} from './cloud';
import './index.css';
document.documentElement.dataset.theme='dark';
document.documentElement.style.colorScheme='dark';
createRoot(document.getElementById('root')!).render(<DemoProvider><App/></DemoProvider>);
