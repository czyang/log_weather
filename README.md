# Log Weather

## Setup
You need a openweathermap API Key to make the proper request.
Create a file named `.env` in project root folder. And open this line:
```bash
OPEN_WEATHER_MAP_API_KEY=__YOUR_OPEN_WEATHER_MAP_API_KEY__
```

## Usage
```bash
npm install

# Run with parameter: "New York, 10005, Tokyo, São Paulo, Pluto"
npm run demo

# Or with custom parameters
npm start "New York, 10005, Tokyo, São Paulo, Pluto"
```