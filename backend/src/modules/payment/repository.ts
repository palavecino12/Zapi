import prisma from "../../config/prisma";

//Traer productos por ids
export const getProductsByIds = async (ids: number[]) => {

    return await prisma.product.findMany({
        where: {
            id: {
                in: ids
            }
        }
    });

};