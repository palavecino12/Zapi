
import prisma from "../../config/prisma";

//Buscamos a un usuario por su username
export const findUserByUsername = async (username: string) => {
    return await prisma.user.findUnique({
        where: { username }
    });
};

//Buscamos un usuario por su ID
export const findUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            username: true,
            role: true,
            isActive: true
        }
    });
};