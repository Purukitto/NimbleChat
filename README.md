# Nimble Chat <img src="https://cdn-icons-png.flaticon.com/512/9231/9231625.png" alt="hydrogen animated logo" height="50px" align="right" />

<div align="center"> <img src="https://i.imgur.com/EszdxIs.gif" alt="Home Screen" style="max-height:300px"> </div>

</br></br>
👋 Meet NBX Weather, your friendly chatbot for all things weather-related. It is here to help you stay up-to-date with the latest weather forecasts, air quality information, and more! 🌞🌫️

### Features

-   Provide current weather conditions for any city in the world
-   Give you the forecast for the next few days for a specific city
-   Provide information about air quality in different cities
-   Answer questions about weather-related topics like climate change, weather patterns, and more

I'm constantly learning and improving, so if there's something specific you'd like to know or a feature you'd like to see, feel free to let me know and I'll do my best to help! 😊

### How To Use

-   Go to [NBX Weather](https://jazzy-pavlova-932105.netlify.app/) and click on "Login with Github" to sign in
-   Type in your request in the chat box and press enter
-   If you want to know the weather in a specific city, type in "What is the weather in {city name}?"
-   If you want to know the forecast for a specific city, type in "What is the forecast for {city name}?"
-   If you want to know the air quality in a specific city, type in "What is the air quality in {city name}?"
-   If you want to know the above information for your current location, type in "What is the weather/forecast/air quality here?"

#### Examples

-   `What is the weather in Delhi?`

    <img src="https://i.ibb.co/5B534dp/Screenshot-2023-09-09-at-7-40-55-PM.png" alt="Delhi Weather" style="max-width:400px">

-   `What is the forecast for New Delhi?`

    <img src="https://i.ibb.co/vV7Fd39/Screenshot-2023-09-09-at-7-41-10-PM.png" alt="New Delhi Forecast" style="max-width:400px">

-   `What is the air quality in Noida?`

    <img src="https://i.ibb.co/hMMfF75/Screenshot-2023-09-09-at-7-41-19-PM.png" alt="Noida AQI" style="max-width:400px">

-   `What is the weather here?`

    <img src="https://i.ibb.co/dpK6YXk/Screenshot-2023-09-09-at-7-41-29-PM.png" alt="Current weather" style="max-width:400px">

-   `What is the air quality here?`

    <img src="https://i.ibb.co/nR8CYK3/Screenshot-2023-09-09-at-7-41-42-PM.png" alt="Current AQI" style="max-width:400px">

### How It Works

-   User input is processed using a combination of regular expressions and fuzzy string matching to determine the user's intent and a location
-   If it is a weather realted request and location is a valid city, the bot will use the OpenWeather API to retrieve weather data for that city
-   If the intent is not weather-related, the request is sent to NBox API to retrieve a response (llama2 model)
-   The response is then sent to the database to be stored and used for future requests

### Important Notes

-   The project is built using React and is hosted on [Netlify](https://jazzy-pavlova-932105.netlify.app/).
-   The project is using [Tailwind CSS](https://tailwindcss.com/) for styling.
-   The project is using the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data.
-   The project is using the [NBox API](https://nbox.ai/) to generate responses to user requests.
-   The project is using the [Supabase](https://supabase.io/) for persistent storage and authentication.
-   The project is a client-side only application. This means that all requests are made from the browser and no data is stored on the server.
-   The project is using [Redux Toolkit](https://redux-toolkit.js.org/) for state management.
-   The project is using [React Router](https://reactrouter.com/) for routing.
-   The project is using a self-hosted CORS proxy to make requests to the NBox API. This is because the API does not have CORS enabled. This is not ideal, but it is the only way to make requests to the API from the browser. The proxy is hosted on Heroku.

### Self Hosting Instructions

-   Clone the repository to your local machine using `git clone https://github.com/Purukitto/NimbleChat`
-   Run `yarn` command to install all dependencies
-   Create a `.env` file in the root directory and add the following environment variables:

```js
VITE_CORSPROXY_URL; // URL of the CORS proxy
VITE_NBX_KEY; // NBox API key
VITE_OPENWEATHERMAP_KEY; // OpenWeather API key
VITE_SUPABASE_KEY; // Supabase API key
VITE_SUPABASE_URL; // Supabase API URL
```

-   Run `yarn dev` to start the development server
-   Run `yarn build` to build the project
-   Run `yarn serve` to serve the project

### License

This project is licensed under the GLP 3.0 License - see the [LICENSE](LICENSE) file for details.
