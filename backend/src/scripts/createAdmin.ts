
import "dotenv/config";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

import bcrypt from "bcryptjs";
import prisma from "../config/prisma";

// Permite solicitar una contraseña sin mostrarla en la terminal.
const askHidden = (question: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!stdin.isTTY) {
            reject(new Error("Se necesita una terminal interactiva."));
            return;
        }

        let password = "";

        stdout.write(question);
        stdin.setRawMode(true);
        stdin.resume();

        const onData = (data: Buffer) => {
            const key = data.toString();

            if (key === "\u0003") {
                cleanup();
                reject(new Error("Operación cancelada."));
                return;
            }

            if (key === "\r" || key === "\n") {
                cleanup();
                stdout.write("\n");
                resolve(password);
                return;
            }

            if (key === "\u007f" || key === "\b") {
                password = password.slice(0, -1);
                stdout.write("\b \b");
                return;
            }

            if (key >= " " && key <= "~") {
                password += key;
                stdout.write("*");
            }
        };

        const cleanup = () => {
            stdin.removeListener("data", onData);
            stdin.setRawMode(false);
            stdin.pause();
        };

        stdin.on("data", onData);
    });
};

const createAdmin = async () => {
    const rl = readline.createInterface({ input: stdin, output: stdout });

    try {
        const username = (await rl.question("Nombre de usuario: ")).trim();
        rl.close();

        const password = await askHidden("Contraseña: ");

        if (!username || !password) {
            throw new Error("El usuario y la contraseña son obligatorios.");
        }

        if (password.length < 8) {
            throw new Error("La contraseña debe tener al menos 8 caracteres.");
        }

        const existingUser = await prisma.user.findUnique({
            where: { username }
        });

        if (existingUser) {
            throw new Error("Ya existe un usuario con ese nombre.");
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                username,
                passwordHash,
                role: "ADMIN"
            }
        });

        console.log("\nAdministrador creado correctamente.");
        console.log(`ID: ${user.id}`);
        console.log(`Usuario: ${user.username}`);
        console.log(`Rol: ${user.role}`);

    } finally {
        rl.close();
        await prisma.$disconnect();
    }
};

createAdmin().catch((error) => {
    console.error("\nError al crear el administrador:", error.message);
    process.exitCode = 1;
});
