import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const start = async () => {
    try {
        const PORT = process.env.PORT || 8080;
        const app = await NestFactory.create(AppModule);

        app.enableCors({
            origin: ['https://music-player-pi-murex.vercel.app', 'http://localhost:3000'],
            methods: ['GET', 'POST', 'DELETE'],
        });

        await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
