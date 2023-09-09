# Nimble Chat <img src="https://cdn-icons-png.flaticon.com/512/9231/9231625.png" alt="hydrogen animated logo" height="50px" align="right" />

<div align="center"> <img src="https://i.imgur.com/EszdxIs.gif" alt="Home Screen" height="300px"> </div>

</br></br>
👋 Meet NBX Weather, your friendly chatbot for all things weather-related. It is here to help you stay up-to-date with the latest weather forecasts, air quality information, and more! 🌞🌫️

### Features

-   Provide current weather conditions for any city in the world
-   Give you the forecast for the next few days for a specific city
-   Provide information about air quality in different cities
-   Answer questions about weather-related topics like climate change, weather patterns, and more

I'm constantly learning and improving, so if there's something specific you'd like to know or a feature you'd like to see, feel free to let me know and I'll do my best to help! 😊

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
-   The project is using a self-hosted CORS proxy to make requests to the NBox API. This is because the API does not have CORS enabled. This is not ideal, but it is the only way to make requests to the API from the browser. The proxy is hosted on Heroku and can be found [here](https://nocors-proxy-d63b3f09ff4c.herokuapp.com/https://chat.nbox.ai/api/chat/completions)
