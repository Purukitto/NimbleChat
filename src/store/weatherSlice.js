import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weatherApi = createApi({
	reducerPath: "weatherApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.openweathermap.org/",
	}),
	endpoints: (builder) => ({
		getLonLatByName: builder.query({
			query: (name) =>
				`geo/1.0/direct?q=${name}&limit=1&appid=${
					import.meta.env.VITE_OPENWEATHERMAP_KEY
				}`,
		}),
		getWeatherByLonLat: builder.query({
			query: ({ lat, lon }) =>
				`data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
					import.meta.env.VITE_OPENWEATHERMAP_KEY
				}`,
		}),
		getForecastByLonLat: builder.query({
			query: ({ lat, lon }) =>
				`data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
					import.meta.env.VITE_OPENWEATHERMAP_KEY
				}`,
		}),
	}),
});

export const {
	useGetLonLatByNameQuery,
	useGetWeatherByLonLatQuery,
	useGetForecastByLonLatQuery,
} = weatherApi;
