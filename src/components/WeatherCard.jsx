import dayjs from "dayjs";
import dayName from "../helper/dayName";
import { MapPinIcon } from "@heroicons/react/24/solid";

export default function WeatherCard({ weatherData }) {
	const cardType = weatherData.type;
	const prettyDate = dayjs();

	return cardType === "weather" ? (
		<div className="flex flex-wrap">
			<div className="flex flex-col min-w-fit h-64 justify-between bg-slate-950 p-5 rounded-lg mt-3">
				<div>
					<div className=" font-bold">
						{dayName(prettyDate.day())}
					</div>
					<div className=" text-sm">
						{prettyDate.format("DD/MM/YY")}
					</div>
					<div className="flex flex-row items-baseline">
						<MapPinIcon className="h-4 w-4 text-slate-400 mt-3 mr-1" />{" "}
						{weatherData.name}, {weatherData.sys.country}
					</div>
				</div>
				<div>
					<img
						src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
						alt="weather icon"
						className=" h-14 w-14"
					/>
					<h2 className=" text-2xl font-semibold">
						{`${(weatherData.main.temp - 273.15).toFixed(2)}`}°C
					</h2>
					{weatherData.weather[0].description}
				</div>
			</div>
			<div className="flex text-sm min-w-fit flex-col space-y-1 h-64 bg-slate-900 py-8 px-6 rounded-lg mt-3">
				<div className="flex">
					<h4 className="font-semibold">Humidity</h4> :{" "}
					{weatherData.main.humidity}%
				</div>
				<div className="flex">
					<h4 className="font-semibold">Visibility</h4> :{" "}
					{weatherData.visibility}m
				</div>
				<div className="flex">
					<h4 className="font-semibold">Wind</h4> :{" "}
					{/* {weatherData.wind.deg} */}
					<span
						className={`px-1 rotate-[${weatherData.wind.deg}deg]`}
					>
						↑
					</span>
					{weatherData.wind.speed}m/s
				</div>
				<div className="flex">
					<h4 className="font-semibold">Cloudiness</h4> :{" "}
					{weatherData.clouds.all}%
				</div>
				{weatherData.rain && (
					<div className="flex">
						<h4 className="font-semibold">Rain (last hour)</h4> :{" "}
						{weatherData.rain["1h"]}mm
					</div>
				)}
				{weatherData.snow && (
					<div className="flex">
						<h4 className="font-semibold">Rain (last hour)</h4> :{" "}
						{weatherData.snow["1h"]}mm
					</div>
				)}
				<div className="flex">
					<h4 className="font-semibold">Sunrise</h4> :{" "}
					{dayjs.unix(weatherData.sys.sunrise).format("HH:mm A")}
				</div>
				<div className="flex">
					<h4 className="font-semibold">Sunset</h4> :{" "}
					{dayjs.unix(weatherData.sys.sunset).format("HH:mm A")}
				</div>
			</div>
		</div>
	) : (
		<div className="flex flex-col bg-slate-950 p-5 rounded-lg mt-3">
			<div className=" font-bold">{dayName(prettyDate.day())}</div>
			<div className=" text-sm">{prettyDate.format("DD/MM/YY")}</div>
			<div className="flex flex-row items-baseline">
				<MapPinIcon className="h-4 w-4 text-slate-400 mt-3 mr-1" />{" "}
				{weatherData.city.name}, {weatherData.city.country}
			</div>
			<div className="flex mt-8 flex-wrap	">
				{weatherData.list.slice(0, 10).map((item, ind) => (
					<div
						key={ind}
						className="bg-slate-800 p-2 m-1 w-32 h-36 rounded"
					>
						<h2 className="text-sm text-slate-300">
							{dayjs(item.dt_txt).format("DD/MM HH:mmA")}
						</h2>
						<img
							src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
							alt="weather icon"
							className=" h-14 w-14"
						/>
						<p className="text-sm">{item.weather[0].description}</p>
						<h2 className=" text-xl font-semibold">
							{`${(item.main.temp - 273.15).toFixed(2)}`}°C
						</h2>
					</div>
				))}
			</div>
		</div>
	);
}
