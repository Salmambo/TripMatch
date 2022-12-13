import "dotenv/config";
import app from "./app";

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => console.log(`server started on ${port}`));
