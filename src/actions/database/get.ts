"use server";

import { GET } from "@/database/client";
import { logger } from "@/lib/logger";
import { GetRequest } from "@/types/actions/database/get";
import { tableNameEnum } from "@/types/database/base";
import { Notes } from "@/types/database/notes";

export async function get(input: GetRequest): Promise<Notes[]> { // TODO: Update return type 
    try {
        logger.info(`Server action get invoked on table: ${input.tableName}`);
        const data = await GET(input.tableName, input.filterConditions);
        switch (input.tableName) {
            case tableNameEnum.Values.notes:
                return data as Notes[];
            default:
                logger.error(`Invalid table name: ${input.tableName}`);
                return [];
        }
    } catch (error) {
        console.error("Error in get server action: ", error);
        throw error;
    }
}
