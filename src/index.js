import React from 'react'
import ReactDOM from 'react-dom'
import 'font-awesome/css/font-awesome.css'
import './index.css'
import WeatherPage from './pages/WeatherPage'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<WeatherPage />, document.getElementById('root'));
registerServiceWorker();