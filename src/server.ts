import { app } from "./app";
import { env } from "./env";

const PORT = env.PORT ?? 3333;

app.listen(PORT, () => {
  console.log(`Servidor HTTP iniciado na porta ${PORT} 🚀`);
});
