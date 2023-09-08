# Nimble Chat <img src="https://cdn-icons-png.flaticon.com/512/9231/9231625.png" alt="hydrogen animated logo" height="50px" align="right" />

<div align="center"> <img src="https://i.imgur.com/EszdxIs.gif" alt="Home Screen" height="300px"> </div>

</br></br>
👋 Meet NBX Weather, your friendly chatbot for all things weather-related. It is here to help you stay up-to-date with the latest weather forecasts, air quality information, and more! 🌞🌫️

### Features

* Provide current weather conditions for any city in the world
* Give you the forecast for the next few days for a specific city
* Provide information about air quality in different cities
* Answer questions about weather-related topics like climate change, weather patterns, and more

I'm constantly learning and improving, so if there's something specific you'd like to know or a feature you'd like to see, feel free to let me know and I'll do my best to help! 😊

### How It Works

* User input is processed using a combination of regular expressions and fuzzy string matching to determine the user's intent and a location
* If it is a weather realted request and location is a valid city, the bot will use the OpenWeather API to retrieve weather data for that city
* If the intent is not weather-related, the request is sent to NBox API to retrieve a response (llama2 model)
* The response is then sent to the database to be stored and used for future requests