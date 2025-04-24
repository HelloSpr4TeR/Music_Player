import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create(AppModule);

        app.enableCors({
            origin: ['https://my-frontend.onrender.com'], // или '*', но лучше точный домен
            methods: ['GET', 'POST', 'DELETE'],
        });

        await app.listen(PORT, '0.0.0.0', () => console.log(`server started on PORT ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
