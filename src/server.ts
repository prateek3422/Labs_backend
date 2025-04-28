import { createServer } from "node:http";
import { app } from "@/api/rest";
import { logger, myEnvironment } from "@/configs";

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const server = createServer(app);


const startServer = () => {
    server.listen(myEnvironment.PORT, () => {
        logger.info(`Server started on port : ${myEnvironment.PORT}`);
    })
}

export { startServer };

