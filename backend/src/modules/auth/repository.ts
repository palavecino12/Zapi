
import prisma from "../../config/prisma";

//Buscamos a un usuario por su username
export const findUserByUsername = async (username: string) => {
    return await prisma.user.findUnique({
        where: { username }
    });
};

