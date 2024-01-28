function Server() {
    fetch("/api/saludo")
  .then((response) => response.json())
  .then((data) => console.log(data));
}

export default Server;