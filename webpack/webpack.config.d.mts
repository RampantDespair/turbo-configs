export const modeSchema: z.ZodDefault<z.ZodOptional<z.ZodEnum<["development", "production", "none"]>>>;
export function createBaseConfig(env: any, argv: any): import("webpack").Configuration;
export default createBaseConfig;
import z from "zod";
//# sourceMappingURL=webpack.config.d.mts.map