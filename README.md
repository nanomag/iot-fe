## Task

Your task is to create a front-end UI displaying various Internet of Things (IoT) sensors based on data provided through a Web Socket endpoint.

The UI should be showing the sensors with their current state and the end-user should be able to connect and disconnect the sensors. There should also be a possibility to toggle whether to see all sensors or only the connected sensors.

Layout, colors, fonts and other styling is up to you to make sure the UI is as appealing and useable as possible.

## Web Socket Server

You are provided with a tiny backend server exposing Web Socket endpoint on <http://localhost:3000>.

From the `/server` directory in your terminal or IDE run the following command:

```bash
npm install && npm start
```

### API

On the client connection event, the API will stream back to the current state of the application in the format:

```typescript
{
  id: string;
  name: string;
  connected: boolean;
  unit: string;
  value: string;
}
```

The Web Socket endpoint accepts the following messages, where `id` is the sensor identifier:

```typescript
// Connect Sensor
{
  command: "connect";
  id: string;
}

// Disconnect Sensor
{
  command: "disconnect";
  id: string;
}
```

## Questions

- What aspect of this exercise did you find most interesting?

Creating the WebSocket client and handling all the events in the right way.

- What did you find most cumbersome to do?

It wasn't complicated, but it took something to figure out how to add or update an existing sensor correctly after triggering the connect and disconnect actions.

- How can we further improve the user experience?

Preserve the last value after disconnecting the sensor. Create categories based on the type of sensor. Store the data to avoid losing data. Show an indicator per sensor to know if is a bad, normal, or good value.
