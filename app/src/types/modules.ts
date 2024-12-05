export interface Modules {
    method: "all" | "get" | "put" | "patch" | "delete",
    route: string,
    controller: any,
    action: string
}